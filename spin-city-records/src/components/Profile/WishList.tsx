import { useUser } from "@clerk/nextjs";
import NextError from "next/error";
import { useState, useEffect, useContext } from "react";
import convertToGlobalCurrency from "../../utils/currencyConversion";
import { useRouter } from "next/router";
import { CurrencyContext } from "../GlobalContext/CurrencyContext";
import { DM_Serif_Display } from "@next/font/google";
import { DM_Sans } from "@next/font/google";

import { api } from "~/utils/api";
import { Collection, Album, Listing } from "~/utils/types";
import Spinner from "../spinner";

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

function WishList() {
  //Global Context
  const { currency } = useContext(CurrencyContext);

  //State
  const [wishlistExists, setWishlistExists] = useState<boolean>(false);
  const [collection, setCollection] = useState<Collection>();

  //Data Fetching
  const router = useRouter();
  const { user } = useUser();
  const currentUserId = user?.id;

  const {
    data: collectionsQueryData,
    error: collectionsQueryError,
    isLoading: collectionsQueryLoading,
    isError: collectionsQueryIsError,
    isSuccess: collectionsQuerySuccess,
  } = api.collections.getByUserId.useQuery({
    userId: currentUserId!,
  });
  const collections: Collection[] = collectionsQueryData as Collection[];

  const {
    mutate: createCollection,
    isSuccess: createCollectionIsSuccess,
    isError: createCollectionIsError,
  } = api.collections.create.useMutation();

  useEffect(() => {
    if (collectionsQuerySuccess && collectionsQueryData) {
      const wishlistExists = collections.some(
        (collection) => collection.name === "Wishlist"
      );
      setWishlistExists(wishlistExists);
      if (wishlistExists) {
        const wishlist = collections.find(
          (collection) => collection.name === "Wishlist"
        );
        setCollection(wishlist);
      }
      if (!wishlistExists) {
        createCollection({ userId: currentUserId!, name: "Wishlist" });
      }
    }
  }, [collectionsQuerySuccess, collectionsQueryData]);

  if (collectionsQueryIsError) {
    return <NextError statusCode={500} />;
  }
  //Logic
  const handleClick = (album: Album) => {
    const normalizedArtist = album.artist.name.replace(/\s+/g, "-");
    const normalizedAlbum = album.name.replace(/\s+/g, "-");
    router
      .push({
        pathname: `/artist/${normalizedArtist}/${normalizedAlbum}`,
        query: { id: album.id },
      })
      .catch((err) => console.log(err));
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

  //Render
  if (collection && collection.albums.length === 0) {
    return (
      <section className="mx-auto flex w-full flex-col items-center justify-center overflow-hidden">
        <div className="mx-auto my-16 text-center align-middle text-xl text-white">
          No favorites yet,{" "}
          <span
            className="cursor-pointer text-[#FF5500] underline underline-offset-4"
            onClick={() => router.push("/").catch((err) => console.log(err))}
          >
            start exploring!
          </span>
        </div>
      </section>
    );
  }

  if (collectionsQueryLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="mx-auto flex items-center justify-center">
          <Spinner />
        </div>
      </div>
    );
  } else if (collection && collection.albums.length > 0) {
    return (
      <section className="mx-auto flex w-3/5 flex-col items-center justify-center overflow-hidden">
        <div className="sm:grid-2 grid px-2 md:grid-cols-2 2xl:grid-cols-4">
          {collection.albums.map((album) => (
            <div
              key={album.id}
              className=" flex cursor-pointer flex-col items-center justify-start rounded-xl p-8 hover:bg-[#A1A1A1] hover:bg-opacity-25"
              onClick={() => handleClick(album)}
            >
              <img
                src={album.artwork}
                alt={`Artwork for ${album.name}`}
                className="rounded-xl object-contain"
              />
              <p
                className={`mt-4 text-center text-white ${sans.className} text-sm sm:text-sm md:text-base xl:text-base`}
              >
                {album.artist.name}
              </p>
              <p
                className={`text-center text-white ${sans.className} text-sm sm:text-sm md:text-base xl:text-base`}
              >
                {album.name}
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
            </div>
          ))}
        </div>
      </section>
    );
  }
}

export default WishList;
