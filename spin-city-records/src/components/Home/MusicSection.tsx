import { useContext } from "react";
import type { Collection, Album, Listing } from "../../utils/types";
import convertToGlobalCurrency from "../../utils/currencyConversion";
import { CurrencyContext } from "../GlobalContext/CurrencyContext";
import { useRouter } from "next/router";
import { DM_Sans } from "@next/font/google";
import { DM_Serif_Display } from "@next/font/google";

const sans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const serif = DM_Serif_Display({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

interface MusicSectionProps {
  title: string;
  loading: boolean;
  collection: Collection;
}

export default function MusicSection({
  title,
  collection,
  loading,
}: MusicSectionProps) {
  //Router
  const router = useRouter();
  //Global Context
  const { currency } = useContext(CurrencyContext);

  //Logic
  const handleClick = (album: Album) => {
    const normalizedArtist = album.artist.name.replace(/\s+/g, "-");
    const normalizedAlbum = album.name.replace(/\s+/g, "-");
    router
      .push({
        pathname: `/artist/${normalizedArtist}/${normalizedAlbum}`,
        query: { id: album.id },
      })
      .catch((e) => console.log(e));
  };

  function findLowestPriceListing(listings: Listing[], currency: string) {
    let lowestPriceListing: Listing = listings[0]!;
    let lowestPrice = Infinity;

    listings.forEach((listing) => {
      const convertedPrice = convertToGlobalCurrency(
        listing.price,
        listing.currency,
        currency
      );
      if (convertedPrice < lowestPrice) {
        lowestPrice = convertedPrice;
        lowestPriceListing = listing;
      }
    });
    return lowestPriceListing;
  }

  function truncateText(text: string, limit: number) {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return text;
  }

  return (
    <>
      <h2
        className={`text-black ${serif.className} mb-2 mt-2 w-5/6 px-4  text-lg sm:text-lg md:text-xl lg:text-xl xl:text-2xl`}
      >
        <span className="bg-white px-4">{title}</span>
      </h2>
      {loading ? (
        <div className="mb-8  h-36 w-5/6 animate-pulse rounded-xl bg-zinc-800 sm:h-40 md:h-44 lg:h-48 xl:h-64"></div>
      ) : (
        <div className="mx-auto  mb-2 flex w-5/6 max-w-full flex-row space-x-8 overflow-x-hidden overflow-y-hidden rounded-xl hover:overflow-x-visible ">
          {collection.albums.map((album) => (
            <div
              key={album.id}
              className="w-58 mx-8 mt-2 flex  flex-shrink-0 cursor-pointer flex-col flex-wrap items-center justify-center "
              onClick={() => handleClick(album)}
            >
              <img
                src={album.artwork}
                alt={`Artwork for ${album.name}`}
                className="h-36 w-36 rounded-xl object-cover sm:h-40  sm:w-40 md:h-44 md:w-44 lg:h-48  lg:w-48 xl:h-48 xl:w-48 "
              />
              <p
                className={`mt-4 text-center text-white ${sans.className} text-sm sm:text-sm md:text-base xl:text-base`}
              >
                {truncateText(album.artist.name, 5)}
              </p>
              <p
                className={`text-center text-white ${sans.className} text-sm sm:text-sm md:text-base xl:text-base`}
              >
                {truncateText(album.name, 5)}
              </p>

              {album.listings.length > 0 ? (
                <p
                  className={`mb-4 text-center text-white ${sans.className} text-sm sm:text-sm md:text-base  xl:text-base`}
                >
                  Starting at{" "}
                  <span className=" text-[#FF5500]">
                    {convertToGlobalCurrency(
                      findLowestPriceListing(album.listings, currency).price,
                      findLowestPriceListing(album.listings, currency).currency,
                      currency
                    )}{" "}
                    {currency}
                  </span>
                </p>
              ) : (
                <p
                  className={`mb-4 text-center text-[#A1A1A1] ${sans.className} text-sm sm:text-sm md:text-base xl:text-base`}
                >
                  No listings available
                </p>
              )}
              <div className="h-2"></div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
