import { useEffect, useState } from "react"
import Layout from "~/components/Layout/Layout";
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from "@stripe/stripe-js";
import { api } from "~/utils/api";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function Checkout() {

  const { data: clientSecret, isSuccess } = api.stripe.checkoutSession.useMutation()
  const listingId = router.query.id as string

  const appearance = {
    theme: 'stripe'
  }

  const options = {
    clientSecret,
    appearance
  }

  return (
    <Layout>
      {isSuccess && clientSecret && 
        <Elements options={options} stripe={stripePromise}>
          
        </Elements>
      }
    </Layout>
  )
}