import { Listing } from "~/pages/album/album.types";
import ListingInfoCard from "./ListingInfoCard";

interface ListingListProps {
  listings: Listing[];
}

export default function ListingList({ listings }: ListingListProps) {
  return (
    <>
      <div className=" w-full">
        {listings.map((listing, index) => (
          <div key={index} className="">
            <ListingInfoCard listing={listing} />
          </div>
        ))}
      </div>
    </>
  );
}
