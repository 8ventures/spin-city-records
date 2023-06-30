import { Listing } from "~/utils/types";
import ListingInfoCard from "./ListingInfoCard";

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
