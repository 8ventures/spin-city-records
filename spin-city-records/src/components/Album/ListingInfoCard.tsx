import { Listing } from "~/pages/album/album.types";
import Button from "./Button";

interface ListingInfoCardProps {
  listing: Listing;
}

export default function ListingInfoCard({ listing }: ListingInfoCardProps) {
  return (
    <>
      <div className="border-[#333333 flex flex-row rounded-lg border ">
        <div className="">
          <span className="text-sm text-white">{listing.condition} </span>
          <span className="text-sm text-white">{listing.price} </span>
          <span className="text-sm text-white">{listing.currency} </span>
          <span className="text-sm text-white">{listing.format} </span>
          <span className="text-sm text-white">{listing.speed} </span>
          <span className="text-sm text-white">{listing.weight} </span>
        </div>

        <div className="w-1/3">
          <Button variant="select" />
        </div>
      </div>
      ;
    </>
  );
}
