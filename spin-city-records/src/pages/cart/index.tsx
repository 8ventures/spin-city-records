import Layout from "../../components/Layout/Layout";
import type { Listing } from "../..//utils/types";
import { useContext } from "react";
import { CartContext } from "../../components/GlobalContext/CartContext";
import { CurrencyContext } from "../../components/GlobalContext/CurrencyContext";
import convertToGlobalCurrency from "../../utils/currencyConversion";
import { useRouter } from "next/router";
import Skeleton from "../../components/skeleton";
import { serif, sans } from "../../utils/fonts";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
export default function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);
  const { currency } = useContext(CurrencyContext);
  const router = useRouter();

  const { user } = useUser();
  if (!user) {
    toast.warn("Please, log in or sign up to proceed to checkout!", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
  }
  const checkoutItem = (listing: Listing): void => {
    console.log(listing);
    router
      .push({
        pathname: "/checkout",
        query: { id: listing.id },
      })
      .catch((e) => console.log(e));
  };

  return (
    <Layout>
      <div
        className={`flex  flex-col items-center text-white ${sans.className}`}
      >
        <div className=" mt-2 w-5/6 xl:w-2/3">
          <h1
            className={`text-black ${serif.className} mb-2 mt-6 w-5/6 px-4 text-lg sm:text-lg md:text-xl lg:text-xl xl:text-2xl`}
          >
            <span className="bg-white px-4">SHOPPING CART</span>
          </h1>
          {cart.length > 0 ? (
            cart.map((listing) => (
              <>
                <div className="my-8 w-full border-b border-[#A1A1A1]" />
                <div
                  key={listing.id}
                  className=" mb-4 grid h-max w-full grid-cols-2 items-center md:grid-cols-4 lg:grid-cols-5"
                >
                  {listing.album ? (
                    <div className=" m-4 h-fit w-fit">
                      <img
                        src={listing.album.artwork}
                        alt={`Artwork for ${listing.album.name}`}
                        className=" rounded-xl sm:h-40 sm:w-40 md:h-44 md:w-44 lg:h-48  lg:w-48 xl:h-48 xl:w-48 "
                      />
                    </div>
                  ) : (
                    <Skeleton className=" rounded-xl sm:h-40 sm:w-40 md:h-44 md:w-44 lg:h-48  lg:w-48 xl:h-48 xl:w-48 " />
                  )}
                  <div className="col-span-2 hidden flex-col md:flex ">
                    <span className="text-2xl sm:text-left md:text-3xl xl:text-4xl">
                      {listing.album?.name}
                    </span>
                    <span className="text-xl sm:text-left md:text-2xl xl:text-3xl">
                      <span className="text-[#A1A1A1]">by </span>{" "}
                      <a className="cursor-pointer hover:underline">
                        {" "}
                        {listing.album?.artist.name}
                      </a>
                    </span>
                    <span className="text-md sm:text-left md:text-lg xl:text-xl">
                      {listing.album?.year}, {listing.album?.label}
                    </span>
                  </div>
                  <div className="hidden flex-col lg:flex">
                    <div>
                      <strong>Condition:</strong> {listing.condition}
                    </div>
                    <div>
                      <strong>Format:</strong> {listing.format}
                    </div>
                    <div>
                      <strong>Speed:</strong> {listing.speed}
                    </div>
                    <div>
                      <strong>Weight:</strong> {listing.weight}
                    </div>
                  </div>
                  <div className="flex items-center justify-around">
                    <button
                      className="text-white  hover:text-black"
                      onClick={() => removeFromCart(listing)}
                    >
                      <TrashIcon className="h-8 w-8 hover:text-custom-orange" />
                    </button>
                    <button
                      className={`mx-4 flex  flex-col items-center bg-white  p-2 text-black  hover:bg-[#FF5500] hover:text-white sm:my-8 sm:text-left md:text-xl xl:text-2xl ${serif.className}`}
                      onClick={() => checkoutItem(listing)}
                    >
                      <h3 className="px-2 font-semibold">Checkout</h3>
                      <span className="px-2 text-3xl font-black ">
                        {convertToGlobalCurrency(
                          listing.price,
                          listing.currency,
                          currency
                        )}{" "}
                        {currency}
                      </span>
                    </button>
                  </div>
                </div>
              </>
            ))
          ) : (
            <section className="mx-auto flex w-full flex-col items-center justify-center overflow-hidden">
              <div className="mx-auto my-16 text-center align-middle text-xl text-white">
                Your cart is empty,{" "}
                <span
                  className="cursor-pointer text-[#FF5500] underline underline-offset-4"
                  onClick={() => router.push("/").catch((e) => console.log(e))}
                >
                  start exploring!
                </span>
              </div>
            </section>
          )}
        </div>
      </div>
    </Layout>
  );
}
