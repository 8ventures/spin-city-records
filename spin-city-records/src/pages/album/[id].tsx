import AlbumInfoCard from "~/components/Album/AlbumInfoCard";
import Layout from "~/components/Layout/Layout";
import ListingList from "~/components/Album/ListingList";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import NextError from "next/error";
import { useState, useEffect } from "react";

function AlbumPage() {
  const id = useRouter().query.id as string;
  const [album, setAlbum] = useState<any>(null);
  const [listings, setListings] = useState<any>([]);
  const [currentListing, setCurrentListing] = useState<any>(null);
  const albumQuery = api.albums.getById.useQuery({ id });
  const listingQuery = api.listings.getByAlbumId.useQuery({ albumId: id });
  const firstListing = listingQuery.data?.[0];

  useEffect(() => {
    if (albumQuery.status === "success") {
      setAlbum(albumQuery.data);
    }
  }, [albumQuery.status]);

  useEffect(() => {
    if (listingQuery.status === "success") {
      setListings(listingQuery.data);
      setCurrentListing(firstListing);
    }
  }, [listingQuery.status, listingQuery.data]);

  if (albumQuery.error || listingQuery.error) {
    return (
      <NextError
        title={albumQuery.error?.message || listingQuery.error?.message}
        statusCode={
          albumQuery.error?.data?.httpStatus ||
          listingQuery.error?.data?.httpStatus ||
          500
        }
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
            <ListingList listings={listings} />
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
      special: ["colored", "limited edition"],
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
      special: [],
      description: "Classic 7'' vinyl single in excellent condition.",
    },
  ],
};
