import { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/router";
import NextError from "next/error";

import AlbumInfoCard from "~/components/Album/AlbumInfoCard";
import Layout from "~/components/Layout/Layout";
import ListingList from "~/components/Album/ListingList";
import { api } from "~/utils/api";

import { Listing } from "~/utils/types";

function AlbumPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const [listings, setListings] = useState<any>([]);
  const [album, setAlbum] = useState<any>(null);
  const [currentListing, setCurrentListing] = useState<Listing | undefined>();
  const albumQuery = api.albums.getById.useQuery({ id });
  const listingQuery = api.listings.getByAlbumId.useQuery({ albumId: id });

  useEffect(() => {
    if (albumQuery.status === "success") {
      setAlbum(albumQuery.data);
    }
  }, [albumQuery]);

  useEffect(() => {
    if (listingQuery.status === "success") {
      setListings(listingQuery.data);
    }
  }, [listingQuery]);

  if (albumQuery.error) {
    return (
      <NextError
        title={albumQuery.error.message}
        statusCode={albumQuery.error.data?.httpStatus ?? 500}
      />
    );
  }

  if (listingQuery.error) {
    return (
      <NextError
        title={listingQuery.error.message}
        statusCode={listingQuery.error.data?.httpStatus ?? 500}
      />
    );
  }

  return (
    <Layout>
      <div className="flex flex-col xl:flex-row">
        <div className="container  m-2 w-full overflow-auto rounded-lg border border-[#333333] bg-black p-6 xl:order-2 xl:w-7/12">
          <AlbumInfoCard album={album} listing={currentListing} />
        </div>
        <div className="container m-2  w-full overflow-auto rounded-lg border border-[#333333] bg-black p-6 xl:order-1 xl:w-5/12">
          <div className=" max-h-[calc(50vh)]">
            <h2 className="text-2xl font-bold text-white">Listings</h2>

            {listings.length === 0 && (
              <div className="text-white">No listings found.</div>
            )}
            <ListingList
              listings={listings}
              setCurrentListing={setCurrentListing}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AlbumPage;
