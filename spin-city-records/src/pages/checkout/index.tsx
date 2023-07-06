import Layout from "~/components/Layout/Layout";
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from "@stripe/stripe-js";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import CheckoutForm from "~/components/Checkout/checkoutForm";
import Skeleton from "~/components/skeleton";
import CheckoutItems from "~/components/Checkout/checkoutItems";
import type { Listing } from "~/utils/types";
import { serif, sans } from "~/utils/fonts";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function Checkout() {

  const router = useRouter()
  const listingId = router.query.id;
  const {data, isSuccess: isSession} = api.stripe.checkoutSession.useQuery({listingId}, {enabled: (typeof listingId === 'string')})
  
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
      <div className={`h-fit flex flex-col items-center text-white ${sans.className}`}>
        <div className=" xl:w-2/3 w-5/6 mt-2">
          <h1
              className={`text-black ${serif.className} mb-2 mt-6 w-5/6 px-4 text-lg sm:text-lg md:text-xl lg:text-xl xl:text-2xl`}
          >
            <span className="bg-white px-4">CHECKOUT</span>
          </h1>
          <div className="flex flex-col items-center mt-6">
            <div className="flex w-5/6 justify-center space-x-10"> 
    
          {isSession && listing  ? (
                <CheckoutItems listing={listing} />
              ) : (
                <Skeleton className=" h-96 w-96 mb-10"/>
              )}
              {isSession && clientSecret ? (
              <Elements 
                options={{
                  appearance,
                  clientSecret
                }} 
                stripe={stripePromise}
              >
                <CheckoutForm listing={listing} />
              </Elements>
              ) : (
                <Skeleton className=" h-96 w-96 mb-10 "/>
              )}          
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

