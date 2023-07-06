import Layout from "~/components/Layout/Layout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import CheckoutForm from "~/components/Checkout/checkoutForm";
import Skeleton from "~/components/skeleton";
import CheckoutItems from "~/components/Checkout/checkoutItems";
import type { Listing } from "~/utils/types";
import { serif, sans } from "~/utils/fonts";
import { useEffect, useRef } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function Checkout() {
  const hasData = useRef(false);
  console.log("Checkout");

  const router = useRouter();
  const listingId = router.query.id;
  const { data, isSuccess: isSession } = api.stripe.checkoutSession.useQuery(
    { listingId, hasData },
    { enabled: typeof listingId === "string" && !hasData.current }
  );

  const clientSecret = data?.clientSecret;
  const listing: Listing = data?.listing as Listing;

  if (clientSecret && isSession) {
    hasData.current = true;
  }
  console.log("Check: ", clientSecret, isSession, hasData.current, listingId);

  useEffect(() => {
    console.log("sideeffect, rendered", hasData.current);
    return () => {
      console.log("cleanup, beforeRender", hasData.current);
    };
  });

  const appearance = {
    variables: {
      colorPrimary: "#FF5500",
      colorBackground: "#000000",
      colorText: "#ffffff",
    },
  };

  return (
    <Layout>
      <div
        className={`flex h-fit flex-col items-center text-white ${sans.className}`}
      >
        <div className=" mt-2 w-5/6 xl:w-2/3">
          <h1
            className={`text-black ${serif.className} mb-2 mt-6 w-5/6 px-4 text-lg sm:text-lg md:text-xl lg:text-xl xl:text-2xl`}
          >
            <span className="bg-white px-4">CHECKOUT</span>
          </h1>
          <div className="mt-6 flex flex-col items-center">
            <div className="flex w-5/6 justify-center space-x-10">
              {isSession && listing ? (
                <CheckoutItems listing={listing} />
              ) : (
                <Skeleton className=" mb-10 h-96 w-96" />
              )}
              {isSession && clientSecret ? (
                <Elements
                  options={{
                    appearance,
                    clientSecret,
                  }}
                  stripe={stripePromise}
                >
                  <CheckoutForm listing={listing} />
                </Elements>
              ) : (
                <Skeleton className=" mb-10 h-96 w-96 " />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
