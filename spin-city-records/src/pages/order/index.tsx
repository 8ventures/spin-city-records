import {useState, useEffect} from 'react';
import {useStripe} from '@stripe/react-stripe-js';
import { useRouter } from 'next/router';
import Layout from '~/components/Layout/Layout';


export default function OrderStatus() {
  const stripe = useStripe();
  const [message, setMessage] = useState('');

  const router = useRouter();
  const clientSecret = router.query.payment_intent_client_secret
  
  const getPaymentIntent = async (clientSecret: string) => {
    const paymentIntentResult = await stripe?.retrievePaymentIntent(clientSecret)
    if ( paymentIntentResult?.paymentIntent) {
      const paymentIntent = paymentIntentResult?.paymentIntent
      switch (paymentIntent.status) {
        case 'succeeded':
          // redirect to order conformation
          setMessage('Success! Payment received.');
          break;
        case 'processing':
          setMessage("Payment processing. We'll update you when payment is received.");
          break;
        case 'requires_payment_method':
          //add redirect button
          setMessage('Payment failed. Please try another payment method.');
          break;

        default:
          setMessage('Something went wrong.');
          break;
      }
    }
  }

  useEffect(() => {
    if (typeof clientSecret === 'string') {
      getPaymentIntent(clientSecret).catch((e) => console.log(e))
    }
  })

  return (
    <Layout>
      {message};
    </Layout>
  )
}
