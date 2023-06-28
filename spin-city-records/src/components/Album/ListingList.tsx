import { Listing } from "~/pages/album/album.types";
import ListingInfoCard from "./ListingInfoCard";

interface ListingListProps {
  listings: Listing[];
}

export default function ListingList({ listings }: ListingListProps) {
  return (
    <>
      {listings.map((listing, index) => (
        <div key={index}>
          <ListingInfoCard listing={listing} />
        </div>
      ))}
    </>
  );
}
