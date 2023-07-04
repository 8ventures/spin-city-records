import { useEffect, useState } from "react"
import Layout from "~/components/Layout/Layout";
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from "@stripe/stripe-js";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import CheckoutForm from "~/components/Checkout/checkoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function Checkout() {

  const router = useRouter()
  
  const listingId = router.query.id as string;
  const { data: data, isSuccess: isSuccess } = api.listings.getById.useQuery({
    id: listingId,
  });
  let clientSecret = null;
  let isSession = false;
  if (data && isSuccess) {
    const queryResult = api.stripe.checkoutSession.useQuery([
      {
        id: data.id,
        price: data.price,
        currency: data?.currency,
        stripeProduct: data?.stripeProduct,
        stripePrice: data?.stripePrice,
        stripeId: data?.stripeId,
      },
    ]);
    clientSecret = queryResult.data;
    isSession = queryResult.isSuccess;
  }

  const appearance = {
    theme: "stripe"
  }

  const options = {
    appearance
  }

  return (
    <Layout>
      {isSession && clientSecret && 
        <Elements stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret}/>
        </Elements>
      }
    </Layout>
  )
}