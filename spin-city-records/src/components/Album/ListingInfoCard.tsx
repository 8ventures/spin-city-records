import { Listing, Seller } from "~/pages/album/album.types";
import getSymbolFromCurrency from "currency-symbol-map";

import Button from "../Button";
import RatingStars from "./RatingStars";
import Tag from "./Tags";

interface ListingInfoCardProps {
  listing: Listing;
}

export default function ListingInfoCard({ listing }: ListingInfoCardProps) {
  return (
    <>
      <div className="my-6 flex h-24 flex-row rounded-lg border border-[#ffffff]">
        <div className="w-2/3 text-white">
          <div className="flex h-full flex-col justify-center">
            <div className="flex flex-row justify-between">
              <div className="flex w-2/4 flex-col justify-center p-6">
                <div className="text-l font-bold">{sellerExample.name}</div>
                <div className="text-xs">{sellerExample.location.country}</div>
                <RatingStars rating={sellerExample.rating} />
              </div>
              <div className="flex w-1/4 flex-col justify-center">
                <Tag variant="weight" value={listing.weight} />
                <Tag variant="speed" value={listing.speed} />
                <Tag variant="speed" value={listing.format} />
              </div>
              <div className="flex w-1/4 flex-col justify-center">
                <div className="text-xl font-bold">
                  {getSymbolFromCurrency(listing.currency)}
                  {listing.price}
                </div>
                <div className="text-l">{listing.condition}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/3">
          <Button variant="select" />
        </div>
      </div>
    </>
  );
}

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
