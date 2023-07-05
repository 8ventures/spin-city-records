import type { Listing } from "~/utils/types"
import { CurrencyContext } from "../GlobalContext/CurrencyContext";
import RatingStars from "../Album/RatingStars";
import Skeleton from "../skeleton";
import { useContext } from "react";
import { serif, sans} from '../../utils/fonts'

type CheckoutItemsProps = {
  listing: Listing,
}

export default function CheckoutItems({listing}: CheckoutItemsProps) {

  const { currency } = useContext(CurrencyContext);
  
  return (
    <div className={`flex flex-col items-center ${sans.className}`}>
       <div className="hidden md:flex flex-col ">
          <span className="text-2xl sm:text-left md:text-3xl xl:text-4xl">
            {listing.album?.name}
          </span>
          <span className="text-xl sm:text-left md:text-2xl xl:text-3xl">
            <span className="text-[#A1A1A1]">by </span>{" "}
            <a
              className="cursor-pointer hover:underline"
            >
              {" "}
              {listing.album?.artist.name}
            </a>
          </span>
          <span className="text-md sm:text-left md:text-lg xl:text-xl">
            {listing.album?.year}, {listing.album?.label}
          </span>
        </div>
    {listing && listing.seller && (
      <div className="flex items-center">
      {listing.album ? (
        <div className="h-fit w-fit m-4">
          <img
            src={listing.album.artwork}
            alt={`Artwork for ${listing.album.name}`}
            className=" rounded-xl sm:h-40 sm:w-40 md:h-44 md:w-44 lg:h-48  lg:w-48 xl:h-60 xl:w-60 "
          />
        </div>
        ) : (
          <Skeleton className=" rounded-xl sm:h-40 sm:w-40 md:h-44 md:w-44 lg:h-48  lg:w-48 xl:h-48 xl:w-48 " />
        )}
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
      </div>
      )}
    </div>
  );
}