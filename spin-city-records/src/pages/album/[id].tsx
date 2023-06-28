import { useState } from "react";
import AlbumInfoCard from "~/components/Album/AlbumInfoCard";
import Layout from "~/components/Layout/Layout";
import { Album, Listing, Seller } from "./album.types";
import ListingList from "~/components/Album/ListingList";

function AlbumPage() {
  const [album, setAlbum] = useState<Album>({
    id: "",
    name: "",
    artist: "",
    releaseYear: 0,
    label: "",
    genre: "",
    artwork: "",
    createdAt: "",
    updatedAt: "",
  });
  const [listing, setListing] = useState<Listing>({
    id: "",
    createdAt: "",
    updatedAt: "",
    sellerID: "",
    albumID: "",
    price: 0,
    currency: "",
    condition: "",
    weight: "",
    format: "",
    speed: "",
    special: [],
    description: "",
  });
  const [seller, setSeller] = useState<Seller>({
    id: "",
    name: "",
    email: "",
    location: {
      city: "",
      state: "",
      country: "",
      address: "",
      postalCode: "",
    },
    rating: 0,
    listings: [],
  });
  const [listings, setListings] = useState<Listing[]>([]);

  return (
    <Layout>
      <div className="flex flex-col md:flex-row">
        <div className="container  m-2 w-full overflow-auto rounded-lg border border-[#333333] bg-black p-6 md:order-2 md:w-2/3">

          <AlbumInfoCard
            album={albumExample}
            seller={sellerExample}
            listing={listingExample1}
          />
        </div>
        <div className="container m-2  w-full overflow-auto rounded-lg border border-[#333333] bg-black p-6 md:order-1 md:w-1/3">
          <div className=" max-h-[calc(50vh)]">
            <ListingList listings={listingsExample} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AlbumPage;

const albumExample: Album = {
  id: "cuid1",
  name: "Thriller",
  artist: "Michael Jackson",
  releaseYear: 1982,
  label: "Epic",
  genre: "Pop",
  artwork:
    "https://i.discogs.com/VHc9hFCOdKfEc5oztrJbDEkjntspySFD34Cms5tNL9Y/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE5NTMw/NjEtMTI4MDUwMTc4/MS5qcGVn.jpeg",
  createdAt: "2023-06-24T12:00:00Z",
  updatedAt: "2023-06-24T12:00:00Z",
};

const sellerExample: Seller = {
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
