import { useState, useContext } from "react";
import { useRouter } from "next/router";
import NextError from "next/error";

import { api } from "~/utils/api";
import { Album, Listing } from "~/utils/types";

import Layout from "~/components/Layout/Layout";
import ListingInfoCard from "~/components/Album/ListingInfoCard";
import AlbumInfoCard from "~/components/Album/AlbumInfoCard";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

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

  // State
  const [currentListing, setCurrentListing] = useState<Listing>();

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
            <div className="flex justify-between">
              <div className="my-4 ml-6 inline text-lg text-white sm:ml-14">
                Available Listings
              </div>
              <div className="my-4 mr-6 inline text-lg text-white sm:mr-14">
                Sort by{" "}
                <ChevronDownIcon className="inline-block h-5 w-5 text-white" />
              </div>
            </div>
            {listings && listings.length !== 0 && (
              <div>
                {listings.map((listing, index) => (
                  <div key={index}>
                    <ListingInfoCard
                      album={album}
                      listing={listing}
                      currentListing={currentListing}
                      setCurrentListing={setCurrentListing}
                    />
                    {index !== listings.length - 1 &&
                      index !== listings.length - 1 && (
                        <div className="mx-12 my-4 justify-center border-t border-[#A1A1A1]"></div>
                      )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Layout>
      </>
    )
  );
}
