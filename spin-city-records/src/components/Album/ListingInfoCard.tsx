import { Listing } from "~/utils/types";
import getSymbolFromCurrency from "currency-symbol-map";
import Button from "../Button";
import RatingStars from "./RatingStars";

interface ListingInfoCardProps {
  listing: Listing;
  setCurrentListing: React.Dispatch<React.SetStateAction<Listing>>;
}

export default function ListingInfoCard({
  listing,
  setCurrentListing,
}: ListingInfoCardProps) {
  return (
    <>
      <div className="container my-4 flex h-24 flex-row justify-between rounded-lg border border-[#ffffff] p-4 text-white">
        <div className=" mx-1 flex-col">
          <div className="text-md font-bold">{sellerExample.name}</div>
          <div className="text-xs">{sellerExample.location.country}</div>
          <RatingStars rating={sellerExample.rating} />
        </div>
        <div className="mx-1  flex-col">
          <div className="text-xs font-semibold text-white">
            {listing.weight === "standard" ? "SD" : "OW"}
          </div>
          <div className="text-xs font-semibold text-white">
            {listing.format}
          </div>
        </div>
        <div className="mx-1 flex-col">
          <div className="text-xl font-bold">
            {getSymbolFromCurrency(listing.currency)}
            {listing.price}
          </div>
          <div className="text-sm">{listing.condition}</div>
        </div>

        <Button
          variant="select"
          className="m-2 flex rounded-lg border border-[#333333] bg-[#000000] px-2 py-2 text-sm font-semibold text-white hover:border-[#333333] hover:bg-white hover:text-black"
          onClick={() => {
            setCurrentListing(listing);
          }}
        />
      </div>
    </>
  );
}

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
  rating: 3.1,
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
      format: "12",
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
      format: "7",
      speed: "45RPM",
      special: [],
      description: "Classic 7'' vinyl single in excellent condition.",
    },
  ],
};
