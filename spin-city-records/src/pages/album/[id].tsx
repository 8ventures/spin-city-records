import AlbumInfoCard from "~/components/Album/AlbumInfoCard";
import Layout from "~/components/Layout/Layout";
import ListingList from "~/components/Album/ListingList";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import NextError from 'next/error'

function AlbumPage() {

  // const id = useRouter().query.id as string;
  // const albumQuery = api.albums.getById.useQuery({id})
  const albumQuery = api.albums.getById.useQuery({id: 'cljeh2c3k0004uasgpnlhofu7'})
  const listingQuery = api.listings.getByAlbumId.useQuery({albumId: 'cljeh2c3k0004uasgpnlhofu7'})

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

  if (albumQuery.status!== 'success' || listingQuery.status !== 'success') {
    return (
      <Layout>
      <div className="flex flex-col md:flex-row">
        <div className="container  m-2 w-full rounded-lg border border-[#333333] bg-zinc-900/70 animate-pulse p-6 md:order-2 md:w-2/3 h-96"></div>
        <div className="container m-2  w-full rounded-lg border border-[#333333] bg-zinc-900/70 animate-pulse p-6 md:order-1 md:w-1/3 h-96"></div>
      </div>
    </Layout>
    );
  }

  const album = albumQuery.data
  const listings = listingQuery.data
  listings? console.log(listings) : null
  return (
    <Layout>
      <div className="flex flex-col md:flex-row">
        <div className="container  m-2 w-full overflow-auto rounded-lg border border-[#333333] bg-black p-6 md:order-2 md:w-2/3">

          <AlbumInfoCard
            album={album}
            seller={sellerExample}
            listing={listingExample1}
          />
        </div>
        <div className="container m-2  w-full overflow-auto rounded-lg border border-[#333333] bg-black p-6 md:order-1 md:w-1/3">
          <div className=" max-h-[calc(50vh)]">
            <div>listings?[0]</div>
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

const listingExample1 = {
  id: "cuid1",
  createdAt: "2023-06-24T12:00:00Z",
  updatedAt: "2023-06-24T12:00:00Z",
  sellerID: "user123",
  albumID: "cuid1",
  price: 25.99,
  currency: "USD",
  condition: "Near Mint",
  weight: "Standard",
  format: "12''",
  speed: "33RPM",
  special: ["colored", "limited edition"],
  description:
    "Limited edition colored vinyl in near mint condition. Comes with original sleeve.",
};

const listingExample2 = {
  id: "cuid2",
  createdAt: "2023-06-25T10:30:00Z",
  updatedAt: "2023-06-26T14:45:00Z",
  sellerID: "user456",
  albumID: "cuid2",
  price: 19.99,
  currency: "EUR",
  condition: "Very Good",
  weight: "Standard",
  format: "7''",
  speed: "45RPM",
  special: ["picture disc"],
  description:
    "Rare picture disc vinyl in very good condition. Limited pressing.",
};

const listingExample3 = {
  id: "cuid3",
  createdAt: "2023-06-27T08:15:00Z",
  updatedAt: "2023-06-27T12:30:00Z",
  sellerID: "user789",
  albumID: "cuid3",
  price: 12.5,
  currency: "USD",
  condition: "Good",
  weight: "Standard",
  format: "CD",
  speed: "",
  special: [],
  description: "Used CD in good condition. Some minor scratches on the case.",
};

const listingExample4 = {
  id: "cuid3",
  createdAt: "2023-06-27T08:15:00Z",
  updatedAt: "2023-06-27T12:30:00Z",
  sellerID: "user789",
  albumID: "cuid3",
  price: 12.5,
  currency: "USD",
  condition: "Good",
  weight: "Standard",
  format: "CD",
  speed: "",
  special: [],
  description: "Used CD in good condition. Some minor scratches on the case.",
};

const listingExample5 = {
  id: "cuid3",
  createdAt: "2023-06-27T08:15:00Z",
  updatedAt: "2023-06-27T12:30:00Z",
  sellerID: "user789",
  albumID: "cuid3",
  price: 12.5,
  currency: "USD",
  condition: "Good",
  weight: "Standard",
  format: "CD",
  speed: "",
  special: [],
  description: "Used CD in good condition. Some minor scratches on the case.",
};

const listingExample6 = {
  id: "cuid3",
  createdAt: "2023-06-27T08:15:00Z",
  updatedAt: "2023-06-27T12:30:00Z",
  sellerID: "user789",
  albumID: "cuid3",
  price: 12.5,
  currency: "USD",
  condition: "Good",
  weight: "Standard",
  format: "CD",
  speed: "",
  special: [],
  description: "Used CD in good condition. Some minor scratches on the case.",
};

const listingsExample = [
  listingExample1,
  listingExample2,
  listingExample3,
  listingExample4,
  listingExample5,
  listingExample6,
];
