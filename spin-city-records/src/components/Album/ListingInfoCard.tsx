import { useState, useEffect, useContext } from "react";
import { Album, Listing } from "~/utils/types";
import convertToGlobalCurrency from "../../utils/currencyConversion";
import getSymbolFromCurrency from "currency-symbol-map";
import { CartContext } from "../GlobalContext/CartContext";
import { CurrencyContext } from "../GlobalContext/CurrencyContext";
import RatingStars from "./RatingStars";
import { PlusIcon, MinusIcon, TrashIcon } from "@heroicons/react/24/solid";

interface ListingInfoCardProps {
  album: Album;
  listing: Listing | undefined;
  currentListing: Listing | undefined;
  setCurrentListing: React.Dispatch<React.SetStateAction<Listing | undefined>>;
}

export default function ListingInfoCard({
  album,
  listing,
  currentListing,
  setCurrentListing,
}: ListingInfoCardProps) {
  //Global Context
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const { currency } = useContext(CurrencyContext);

  //State
  const [isInCart, setIsInCart] = useState(false);
  const [isCurrentListing, setIsCurrentListing] = useState(false);

  //Logic

  const handleClickCart = () => {
    if (listing && isInCart) {
      removeFromCart(listing);
      setIsInCart(false);
    }
  };

  const handleClickSelectListing = () => {
    if (listing && listing === currentListing) {
      setCurrentListing(undefined);
    } else {
      setCurrentListing(listing);
    }
  };

  //Effects
  useEffect(() => {
    if (listing) {
      if (cart.some((cartItem) => cartItem.id === listing.id)) {
        setIsInCart(true);
      } else {
        setIsInCart(false);
      }
    }
  }, [cart, listing]);

  useEffect(() => {
    if (listing && currentListing) {
      setIsCurrentListing(listing === currentListing);
    } else {
      setIsCurrentListing(false);
    }
  }, [listing, currentListing]);

  return (
    <>
      {listing && listing.seller && (
        <div className="items border-b-1 m-4 flex  items-center justify-around">
          <div className="mr-2  flex-col items-center text-sm text-[#A1A1A1] sm:text-base">
            Sold by: <div className="text-white">{listing.seller.name}</div>
            {listing.seller.location && (
              <div className="text-white ">{listing.seller.location}</div>
            )}
            <div className="w-18 flex items-center justify-start text-white sm:mt-0 sm:inline-flex">
              {listing.seller.rating ? (
                <RatingStars rating={listing.seller.rating} />
              ) : (
                "(0 reviews)"
              )}
            </div>
          </div>
          <div className="sm:text-md mr-2 flex-col items-center justify-center text-sm text-white">
            <div>{listing.format}</div>
            <div>{listing.weight}</div>
            <div>{listing.speed}</div>
            {listing && listing.edition && (
              <>
                {listing.edition.map((edition, index) => (
                  <span key={index} className="text-white">
                    {index > 0 && ", "} {edition.type}
                  </span>
                ))}
              </>
            )}
          </div>
          <div className="mr-2 flex-col  items-center justify-center text-sm sm:text-lg">
            <div className="text-base font-semibold text-[#FF5500] sm:text-xl ">
              {getSymbolFromCurrency(currency)}{" "}
              {convertToGlobalCurrency(
                listing.price,
                listing.currency,
                currency
              )}
            </div>
            <div className="text-md text-white sm:text-lg ">
              {listing.condition}
            </div>
          </div>
          {isInCart && (
            <button
              onClick={handleClickCart}
              className="mx-2 flex w-6 items-center justify-center rounded-xl text-base font-semibold text-white hover:text-custom-orange lg:w-6"
            >
              <TrashIcon />
            </button>
          )}
          <button
            onClick={handleClickSelectListing}
            className={
              "mx-2 flex w-6 items-center justify-center rounded-xl text-base font-semibold text-custom-orange lg:w-6"
            }
          >
            {isCurrentListing ? <MinusIcon /> : <PlusIcon />}
          </button>
        </div>
      )}
    </>
  );
}
