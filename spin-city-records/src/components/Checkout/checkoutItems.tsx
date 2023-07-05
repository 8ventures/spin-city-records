import type { Listing } from "~/utils/types"
import { CurrencyContext } from "../GlobalContext/CurrencyContext";
import RatingStars from "../Album/RatingStars";
import Skeleton from "../skeleton";
import { useContext } from "react";

type CheckoutItemsProps = {
  listing: Listing,
}

export default function CheckoutItems({listing}: CheckoutItemsProps) {

  const { currency } = useContext(CurrencyContext);
  
  return (
    <>
      {listing && listing.seller && (
        <div className="flex flex-col">
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
            {/* <div className="sm:text-md mr-2 flex-col items-center justify-center text-sm text-white">
              <div>{listing.format}</div>
              <div>{listing.weight}</div>
              <div>{listing.speed}</div>
              {listing.edition.map((edition, index) => (
                <span key={index} className="text-white">
                  {index > 0 && ", "} {edition.type}
                </span>
              ))}
            </div> */}
            <div className="mr-2 flex-col  items-center justify-center text-sm sm:text-lg">
              {/* <div className="text-base font-semibold text-[#FF5500] sm:text-xl ">
                {getSymbolFromCurrency(currency)}{" "}
                {convertToGlobalCurrency(
                  listing.price,
                  listing.currency,
                  currency
                )}
              </div>
              <div className="text-md text-white sm:text-lg ">
                {listing.condition}
              </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}





