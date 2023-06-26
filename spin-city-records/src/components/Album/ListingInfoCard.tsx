import { Listing } from "~/pages/album/album.types";

interface ListingInfoCardProps {
  listing: Listing;
}

export default function ListingInfoCard({ listing }: ListingInfoCardProps) {
  return (
    <div className="ml-16 mr-8 grid grid-cols-2 gap-4">
      <div className="flex flex-col">
        <span className="text-gray-500">Price:</span>
        <span className="font-semibold">
          {listing.price} {listing.currency}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-gray-500">Condition:</span>
        <span className="font-semibold">{listing.condition}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-gray-500">Weight:</span>
        <span className="font-semibold">{listing.weight}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-gray-500">Format:</span>
        <span className="font-semibold">{listing.format}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-gray-500">Speed:</span>
        <span className="font-semibold">{listing.speed}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-gray-500">Special Edition:</span>
        <span className="font-semibold">
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
