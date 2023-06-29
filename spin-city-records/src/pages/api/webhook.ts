import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe';
import { buffer } from 'micro';
import type Error from 'next/error';

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET

    try {
      if (!sig || !webhookSecret) return;

      let event = stripe.webhooks.constructEvent(buf, sig, webhookSecret)
      
    } catch (e) {
      console.log(e)
      return res.status(400).send(e)
    }
  }
  console.log(req.body)
  res.status(200);

}''