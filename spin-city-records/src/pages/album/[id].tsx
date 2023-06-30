import { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/router";
import NextError from "next/error";

import AlbumInfoCard from "~/components/Album/AlbumInfoCard";
import Layout from "~/components/Layout/Layout";
import ListingList from "~/components/Album/ListingList";
import { api } from "~/utils/api";

import { Listing } from "~/utils/types";

interface Listing {
  price: number;
  currency: string;
  weight: string;
  format: string;
  speed: string;
  description: string;
  edition: [{ type: string }];
  condition: string;
  sellerId: string;
  albumId: string;
}
type GetResult<T> = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
} & T;

// You can now use this GetResult type with Listing:
type GetListingResult = GetResult<Listing>;

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
  if (albumQuery.status !== "success" || listingQuery.status !== "success") {
    return (
      <Layout>
        <div className="flex flex-col md:flex-row">
          <div className="container  m-2 h-96 w-full animate-pulse rounded-lg border border-[#333333] bg-zinc-900/70 p-6 md:order-2 md:w-2/3"></div>
          <div className="container m-2  h-96 w-full animate-pulse rounded-lg border border-[#333333] bg-zinc-900/70 p-6 md:order-1 md:w-1/3"></div>
        </div>
      </Layout>
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

const sellerExample = {
  id: "seller123",
  name: "John Doe",
  email: "johndoe@example.com",
  location: {
    city: "New York City",
    state: "New York",
    country: "United States",
    address: "123 Main Street",
    postalCode: "10001",
  },
  rating: 4.5,
  listings: [
    {
      id: "listing1",
      createdAt: "2023-06-24T12:00:00Z",
      updatedAt: "2023-06-24T12:00:00Z",
      sellerID: "seller123",
      albumID: "album1",
      price: 25.99,
      currency: "USD",
      condition: "Near Mint",
      weight: "standard",
      format: "12''",
      speed: "33RPM",
      edition: ["colored", "limited edition"],
      description:
        "Limited edition colored vinyl in near mint condition. Comes with original sleeve.",
    },
    {
      id: "listing2",
      createdAt: "2023-06-25T09:30:00Z",
      updatedAt: "2023-06-25T09:30:00Z",
      sellerID: "seller123",
      albumID: "album2",
      price: 19.99,
      currency: "USD",
      condition: "Excellent",
      weight: "standard",
      format: "7''",
      speed: "45RPM",
      edition: [],
      description: "Classic 7'' vinyl single in excellent condition.",
    },
  ],
};
