import { useEffect, useState } from "react";
import AlbumInfoCard from "~/components/Album/AlbumInfoCard";
import Layout from "~/components/Layout/Layout";
import { Album, Listing, Seller } from "./album.types";
import ListingInfoCard from "~/components/Album/ListingInfoCard";

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

  useEffect(() => {
    setAlbum(albumExample);
    setListing(listingExample);
    setSeller(sellerExample);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto flex rounded-lg border border-[#333333] bg-black p-6 ">
        <AlbumInfoCard album={album} seller={seller} listing={listing} />
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

const listingExample: Listing = {
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

{
  /* <ListingInfoCard listing={listing}></ListingInfoCard>
<div className="m-4 flex flex-col">

</div> */
}
