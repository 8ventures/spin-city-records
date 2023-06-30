//import { Listing } from "~/pages/album/album.types";
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
