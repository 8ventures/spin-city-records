
import { Listing } from "~/utils/types";
import ListingInfoCard from "./ListingInfoCard";


interface Listing{
  price: number,
    currency: string,
    weight:string,
    format: string,
    createdAt: Date,
    updatedAt: Date,
    speed: string,
    description: string,
    edition: [{ type: string }],
    condition: string,
    sellerId: string,
    albumId: string,
}

interface ListingListProps {
  listings: Listing[];
  setCurrentListing: React.Dispatch<React.SetStateAction<Listing | undefined>>;
}

export default function ListingList({
  listings,
  setCurrentListing,
}: ListingListProps) {
  return (
    <>
      {listings.map((listing, index) => (
        <div key={index}>
          <ListingInfoCard
            listing={listing}
            setCurrentListing={setCurrentListing}
          />
        </div>
      ))}
    </>
  );
}
