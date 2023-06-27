import { Listing } from "~/pages/album/album.types";
import Button from "../Button";

interface ListingInfoCardProps {
  listing: Listing;
}

export default function ListingInfoCard({ listing }: ListingInfoCardProps) {
  return (
    <>
      <div className="border-[#333333 flex flex-row rounded-lg border ">
        <div className="w-1/3">
          <Button variant="select" />
        </div>
      </div>
      ;
    </>
  );
}
