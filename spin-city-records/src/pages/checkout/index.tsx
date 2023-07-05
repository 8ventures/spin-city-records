import Layout from "~/components/Layout/Layout";
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from "@stripe/stripe-js";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import CheckoutForm from "~/components/Checkout/checkoutForm";
import Skeleton from "~/components/skeleton";
import CheckoutItems from "~/components/Checkout/checkoutItems";
import type { Listing } from "~/utils/types";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function Checkout() {

  const router = useRouter()
  const listingId = router.query.id;
  const {data, isSuccess: isSession} = api.stripe.checkoutSession.useQuery({listingId}, {enabled: !!listingId})
  
  const clientSecret = data?.clientSecret
  const listing: Listing = data?.listing as Listing

  const appearance = {
    variables: {
      colorPrimary: '#FF5500',
      colorBackground: '#000000',
      colorText: '#ffffff',
    },
  };

  return (
    <Layout>
      <div className="flex flex-col min-h-fit items-center mt-2">
        <div className="flex w-5/6 h-fit space-x-2 justify-center"> 
          {isSession && listing  ? (
            <CheckoutItems listing={listing} />
          ) : (
            <Skeleton className=" w-52 h-96"/>
          )}
          {isSession && clientSecret ? (
            <Elements options={{
              appearance,
              clientSecret
            }} stripe={stripePromise}>
              <CheckoutForm listing={listing} />
            </Elements>
          ) : (
            <Skeleton className=" w-52 h-96 "/>
            )}          
        </div>
      </div>
    </Layout>
  )
}

