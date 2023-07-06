import {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import Layout from '~/components/Layout/Layout';
import { api } from '~/utils/api';
import {toast} from 'react-toastify';
export default function OrderPage() {
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { payment_intent: paymentIntentId } = router.query;
  const { data: paymentIntent, isSuccess } = api.stripe.retrivePaymentIntent.useQuery(
    {paymentIntentId},{enabled: !!paymentIntentId})

    useEffect(() => {
      if (isSuccess && paymentIntent && paymentIntent.status === 'succeeded') {

        const timer = setTimeout(() => {
          router.push('/profile/myOrders').catch((error) => console.error(error));
        }, 3000);

        return () => clearTimeout(timer);
      }
    }, [isSuccess, paymentIntent]);


  return (
    <Layout>
      {isSuccess && paymentIntent && paymentIntent.status === 'succeeded' ? (
        <div className='text-custom-orange flex justify-center font-black text-9xl'>
          Succeeded
        </div>

      ) : isSuccess && paymentIntent && paymentIntent.status === 'processing' ? (
        <div className='text-custom-orange flex justify-center font-black text-9xl'>
          Processing
        </div>
      ) : isSuccess && paymentIntent && paymentIntent.status === 'requires_payment_method' ? (
        <div className='text-custom-orange flex justify-center font-black text-9xl'>
          Please Try another payment method
        </div>
      ) : (
        <div className='text-custom-orange flex justify-center font-black text-9xl'>
          Error
        </div>
      )}
    </Layout>
  )
}
