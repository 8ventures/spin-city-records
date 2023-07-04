import { useState, useContext } from "react";
import { useRouter } from "next/router";
import NextError from "next/error";

import { api } from "~/utils/api";
import { Album, Listing } from "~/utils/types";
import convertToGlobalCurrency from "~/utils/currencyConversion";

import { CurrencyContext } from "~/components/GlobalContext/CurrencyContext";
import Layout from "~/components/Layout/Layout";
import ListingInfoCard from "~/components/Album/ListingInfoCard";
import AlbumInfoCard from "~/components/Album/AlbumInfoCard";
import SortBy from "~/components/Album/SortComponent";

export default function AlbumPage() {
  //Data Fetching
  const router = useRouter();
  const id = router.query.id as string;
  const {
    data: albumQueryData,
    error: albumQueryError,
    isLoading: albumQueryLoading,
    isError: albumQueryIsError,
    isSuccess: albumQuerySuccess,
  } = api.albums.getById.useQuery({ id: id });
  const {
    data: listingQueryData,
    error: listingQueryError,
    isLoading: listingQueryLoading,
    isError: listingQueryIsError,
    isSuccess: listingQuerySuccess,
  } = api.listings.getByAlbumId.useQuery({
    albumId: id,
  });

  const album: Album = albumQueryData as Album;
  const listings: Listing[] = listingQueryData as Listing[];

  // Error Handling
  if (albumQueryIsError || listingQueryIsError) {
    return (
      <NextError
        title={albumQueryError?.message ?? listingQueryError?.message}
        statusCode={
          albumQueryError?.data?.httpStatus ??
          listingQueryError?.data?.httpStatus ??
          500
        }
      />
    );
  }

  //Global Context
  const { currency } = useContext(CurrencyContext);

  // State
  const [currentListing, setCurrentListing] = useState<Listing>();
  const [sortOption, setSortOption] = useState<string | undefined>(undefined);
  const [sortedListings, setSortedListings] = useState<Listing[] | undefined>(
    undefined
  );

  //Logic
  const handleSortOption = (option: string) => {
    console.log(option);

    setSortOption(option);
    if (option === "lowToHigh") {
      setSortedListings(
        [...listings].sort((a, b) => {
          return (
            convertToGlobalCurrency(a.price, a.currency, currency) -
            convertToGlobalCurrency(b.price, b.currency, currency)
          );
        })
      );
      console.log(sortedListings);
    } else if (option === "highToLow") {
      setSortedListings(
        [...listings].sort((a, b) => {
          return (
            convertToGlobalCurrency(b.price, b.currency, currency) -
            convertToGlobalCurrency(a.price, a.currency, currency)
          );
        })
      );
      console.log(sortedListings);
    }
  };

  const clearSort = () => {
    setSortOption(undefined);
    setSortedListings(undefined);
  };

  //TODO SKELETON LOADING ? ERROR FETCHING
  return (
    album &&
    listings && (
      <>
        <Layout>
          <div className="mx-auto max-w-4xl">
            {" "}
            <AlbumInfoCard
              album={album}
              listings={listings}
              currentListing={currentListing}
            />
            {listings && listings.length !== 0 && (
              <>
                <div className="flex justify-between">
                  <div className="text-md my-4 ml-6 inline text-white sm:ml-14">
                    Available Listings
                  </div>
                  <SortBy
                    sortOption={sortOption}
                    setSortOption={setSortOption}
                    handleSortOption={handleSortOption}
                    clearSort={clearSort}
                  />
                </div>
                <div>
                  {(sortedListings || listings).map((listing, index) => (
                    <div key={index}>
                      <ListingInfoCard
                        album={album}
                        listing={listing}
                        currentListing={currentListing}
                        setCurrentListing={setCurrentListing}
                      />
                      {index !== listings.length - 1 && (
                        <div className="mx-12 my-4 justify-center border-t border-[#A1A1A1]"></div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </Layout>
      </>
    )
  );
}
