import { useState, useEffect, createContext, useContext } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { useRouter } from "next/router";
import NextError from "next/error";
import Image from "next/image";

import { api } from "~/utils/api";
import { Album, Listing } from "~/utils/types";

import Layout from "~/components/Layout/Layout";
import ListingInfoCard from "~/components/Album/ListingInfoCard";

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
  } = api.albums.getById.useQuery<Album | undefined>({ id: id });
  const {
    data: listingQueryData,
    error: listingQueryError,
    isLoading: listingQueryLoading,
    isError: listingQueryIsError,
    isSuccess: listingQuerySuccess,
  } = api.listings.getByAlbumId.useQuery<Listing[] | undefined>({
    albumId: id,
  });

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
  const [currentListing, setCurrentListing] = useState<Listing | undefined>();
  const [filterPrice, setFilterPrice] = useState("");

  return (
    albumQuerySuccess &&
    albumQueryData && (
      <Layout>
        <div className="flex flex-1 flex-col text-white">
          <div className="space-around m-16 flex flex-1 flex-col justify-center xl:flex-row">
            <div className="w-400 h-400 aspect-w-1 aspect-h-1 xl:mx-6">
              <Image
                src={albumQueryData.artwork}
                width={400}
                height={400}
                alt={`Artwork for ${albumQueryData.name} by ${albumQueryData.artist.name}`}
              />
            </div>
            <div className="flex flex-col">
              <div className="">
                <span className="mx-6 my-2 block text-6xl">
                  {albumQueryData.name}
                </span>
                <span className="mx-6 my-2  block text-4xl">
                  {albumQueryData.artist.name}
                </span>
                <span className="mx-6 my-2  block text-2xl">
                  {albumQueryData.year}, {albumQueryData.label}
                </span>
              </div>

              {!currentListing &&
                listingQueryData &&
                listingQueryData.length !== 0 && (
                  <>
                    <span className="mx-6 my-4 text-3xl">
                      Starting at{" "}
                      <span className="inline-block font-semibold">
                        {listingQueryData[0]?.price}{" "}
                        {listingQueryData[0]?.currency}
                      </span>
                    </span>
                  </>
                )}

              {listingQueryData && listingQueryData.length === 0 && (
                <>
                  <span className="mx-6 my-4 text-2xl">Not available</span>
                </>
              )}

              {listingQueryData &&
                listingQueryData.length !== 0 &&
                currentListing && (
                  <div className=" text-white">
                    <span className="mx-6 my-4  block text-4xl font-semibold">
                      {listingQueryData[0]!.price}{" "}
                      {listingQueryData[0]!.currency}
                    </span>
                    <span className="mx-6 my-2 block">
                      <span className="font-semibold">Condition: </span>
                      {listingQueryData[0]!.condition}
                    </span>
                    <span className="mx-6 my-2 block">
                      <span className="font-semibold">Weight : </span>{" "}
                      {listingQueryData[0]!.weight}
                    </span>
                    <span className="mx-6 my-2 block">
                      <span className="font-semibold">Format : </span>{" "}
                      {listingQueryData[0]!.format}
                    </span>
                    <span className="mx-6 my-2 block">
                      <span className="font-semibold">Speed : </span>{" "}
                      {listingQueryData[0]!.speed}
                    </span>

                    {listingQueryData[0]?.edition &&
                      listingQueryData[0].edition.length > 0 && (
                        <>
                          <span className="mx-6 my-2 block">
                            <span className="text-yellow font-semibold">
                              Edition :{" "}
                            </span>{" "}
                            {listingQueryData[0].edition.map(
                              (edition, index) => (
                                <span key={index}>
                                  {index > 0 && ", "} {edition.type}
                                </span>
                              )
                            )}
                          </span>
                        </>
                      )}
                  </div>
                )}
            </div>
          </div>
          <div className="flex flex-col text-white">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>Filter By Price</DropdownMenu.Trigger>

              <DropdownMenu.Content>
                <DropdownMenu.Label>Select a Price Range</DropdownMenu.Label>
                <DropdownMenu.Item onSelect={() => setFilterPrice("100")}>
                  Less than $100
                </DropdownMenu.Item>
                <DropdownMenu.Item onSelect={() => setFilterPrice("500")}>
                  Less than $500
                </DropdownMenu.Item>
                <DropdownMenu.Item onSelect={() => setFilterPrice("1000")}>
                  Less than $1000
                </DropdownMenu.Item>

                <DropdownMenu.Separator />

                <DropdownMenu.Item onSelect={() => setFilterPrice("")} disabled>
                  Clear Filter
                </DropdownMenu.Item>

                <DropdownMenu.Arrow />
              </DropdownMenu.Content>
            </DropdownMenu.Root>

            <div className="text-white">
              {listingQueryData?.map((listing, index) => (
                <div key={index}>
                  <ListingInfoCard
                    listing={listingQueryData[index]}
                    setCurrentListing={setCurrentListing}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    )
  );
}
