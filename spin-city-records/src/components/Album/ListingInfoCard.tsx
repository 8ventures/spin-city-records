import { Listing } from "~/pages/album/album.types";

interface ListingInfoCardProps {
  listing: Listing;
}

export default function ListingInfoCard({ listing }: ListingInfoCardProps) {
  return (
    <div className="ml-16 mr-8 grid grid-cols-2 gap-4">
      <div className="flex flex-col">
        <span className="text-[#A1A1A1]">Price:</span>
        <span className="font-semibold text-white">
          {listing.price} {listing.currency}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-[#A1A1A1]">Condition:</span>
        <span className="font-semibold text-white">{listing.condition}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-[#A1A1A1]">Weight:</span>
        <span className="font-semibold text-white">{listing.weight}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-[#A1A1A1]">Format:</span>
        <span className="font-semibold text-white">{listing.format}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-[#A1A1A1]">Speed:</span>
        <span className="font-semibold text-white">{listing.speed}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-[#A1A1A1]">Special Edition:</span>
        <span className="font-semibold text-white">
          <ul>
            {listing.special.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </span>
      </div>
    </div>
  );
}
