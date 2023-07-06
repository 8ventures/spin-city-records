import { buffer } from 'micro';
import Cors from 'micro-cors';
import type { NextApiRequest, NextApiResponse } from 'next';
import type Stripe from 'stripe';
import { stripe } from '../../utils/getStripe'
import type { RequestHandler } from 'micro';
import { api } from '~/utils/api';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../server/api/root'
import SuperJSON from 'superjson';

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SIGNING_SECRET as string;

export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  allowMethods: ['POST', 'HEAD','GET'],
});

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {

  const client = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: 'http://localhost:3000/api/trpc'
      })
    ],
    transformer: SuperJSON
  });

  console.log('Running webook')
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const signature = req.headers['stripe-signature'];

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        signature!,
        webhookSecret
      )
    } catch (err ) {
      console.log(`Error message: ${(err as Error).message}`);
      res.status(400).send(`Webhook Error: ${(err as Error).message}`)
      return
    }

    console.log('Success:', event.id);

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`PaymentIntent status: ${paymentIntent.status}`);
        const orderId = paymentIntent.metadata?.order_id
        console.log(paymentIntent.metadata)
        if (orderId) {
          console.log('Updating OrderID: ', orderId)
          client.orders.changeStatus.mutate({
            orderId,
            status: 'Awaiting Shipment'
          }).catch((e) => console.log(e))
        }
        break;
      }
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(
          `Payment failed: ${paymentIntent.last_payment_error!.message as string}`
        );
        break;
      }
      case 'charge.succeeded': {
        const charge = event.data.object as Stripe.Charge;
        console.log(`Charge id: ${charge.id}`);
        break;
      }
      default: {
        console.warn(`Unhandled event type: ${event.type}`);
        break;
      }
    }
    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default cors(webhookHandler as RequestHandler);
