import {useState} from 'react';
import { useRouter } from 'next/router';
import Layout from '~/components/Layout/Layout';
import { api } from '~/utils/api';

export default function OrderPage() {
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { payment_intent: paymentIntentId } = router.query;
  const { data: paymentIntent, isSuccess } = api.stripe.retrivePaymentIntent.useQuery(
    {paymentIntentId},{enabled: !!paymentIntentId}) 

  return (
    <Layout>
      {isSuccess && paymentIntent && paymentIntent.status === 'succeeded' ? (
        <div className='text-white'>
          Succeded
        </div>
      ) : isSuccess && paymentIntent && paymentIntent.status === 'processing' ? (
        <div className='text-white'>
          Processing
        </div>
      ) : isSuccess && paymentIntent && paymentIntent.status === 'requires_payment_method' ? (
        <div className='text-white'>
          Please Try another payment method
        </div>
      ) : (
        <div className='text-white'>
          Error
        </div>
      )}
    </Layout>
  )
}
