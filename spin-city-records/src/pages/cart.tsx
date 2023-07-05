import Layout from "~/components/Layout/Layout";
import type { Listing } from "~/utils/types";
import { useContext } from "react";
import { CartContext } from "~/components/GlobalContext/CartContext";
import { CurrencyContext } from "~/components/GlobalContext/CurrencyContext";
import convertToGlobalCurrency from '../utils/currencyConversion'
import getSymbolFromCurrency from "currency-symbol-map";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import Image from "next/image";
import Skeleton from "~/components/skeleton";
import { DM_Serif_Display } from "@next/font/google";


const serif = DM_Serif_Display({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

function Cart() {
  const { cart } = useContext(CartContext);
  const { currency } = useContext(CurrencyContext);
  const router = useRouter()

  const checkoutItem = (listing: Listing): void => {
    console.log(listing)
    router.push({
      pathname: '/checkout',
      query: {id: listing.id}
    }).catch((e)=>(console.log(e)))
  }


  return (
    <Layout>
      <div className="h-screen flex flex-col items-center text-white">
        <div className=" xl:w-2/3 w-5/6 mt-2">
          <h1
            className={`text-black ${serif.className} mb-2 mt-2 w-5/6 px-4  text-lg sm:text-lg md:text-xl lg:text-xl xl:text-2xl`}
          >
            <span className="bg-white px-4">SHOPPING CART</span>
          </h1>
            {cart.length > 0 ? (
              cart.map((listing) => (
                <div
                  key={listing.id}
                  className=" flex items-center justify-between h-max w-full mb-4"
                >
                  {listing.album ? (
                    <div className="h-fit w-fit m-4">
                      <img
                        src={listing.album.artwork}
                        alt={`Artwork for ${listing.album.name}`}
                        className=" rounded-xl sm:h-40 sm:w-40 md:h-44 md:w-44 lg:h-48  lg:w-48 xl:h-48 xl:w-48 "
                      />
                    </div>
                  ) : (
                    <Skeleton className=" rounded-xl sm:h-40 sm:w-40 md:h-44 md:w-44 lg:h-48  lg:w-48 xl:h-48 xl:w-48 " />
                  )}
                  <div className="hidden lg:flex flex-col ">
                    <span className="text-2xl sm:text-left md:text-3xl xl:text-4xl">
                      {listing.album?.name}
                    </span>
                    <span className="text-xl sm:text-left md:text-2xl xl:text-3xl">
                      <span className="text-[#A1A1A1]">by </span>{" "}
                      <a
                        className="cursor-pointer hover:underline"
                        onClick={() => handleClickArtist(album)}
                      >
                        {" "}
                        {listing.album?.artist.name}
                      </a>
                    </span>
                    <span className="text-md sm:text-left md:text-lg xl:text-xl">
                      {listing.album?.year}, {listing.album?.label}
                    </span>
                  </div>
                  <div className="flex flex-col">
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
                  <button 
                    className={`sm:my-8 sm:text-left md:text-xl xl:text-2xl h-1/2 p-2 flex flex-col rounded-xl items-center bg-[#FF5500]`}
                    onClick={() => checkoutItem(listing)}
                  >
                    <h3 className="font-semibold ">Checkout for</h3>
                    <span className="text-2xl font-semibold text-white ">
                      {convertToGlobalCurrency(
                        listing.price,
                        listing.currency,
                        currency
                      )}{" "}
                      {currency}
                    </span>
                  </button>
                </div>
              )
            )) : (
              <div>Your cart is empty.</div>
            )}
          </div>
        </div>
    </Layout>
  );
}

export default Cart;
