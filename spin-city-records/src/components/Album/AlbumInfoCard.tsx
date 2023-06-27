import { Album, Seller, Listing } from "~/pages/album/album.types";
import Image from "next/image";
import Button from "../Button";

interface AlbumInfoCardProps {
  album: Album;
  seller: Seller;
  listing: Listing;
}

export default function AlbumInfoCard({
  album,
  seller,
  listing,
}: AlbumInfoCardProps) {
  return (
    <div className="flex">
      <div className="mr-6">
        <Image
          src={album.artwork}
          width={500}
          height={500}
          alt="Album Artwork"
          className="rounded-lg border border-[#ffffff]"
        />
      </div>

      <div className="m-4">
        <div>
          <h1 className="mb-2 text-5xl font-bold text-white">{album.name}</h1>
          <h1 className="mb-2 text-2xl font-bold text-white ">
            {album.artist}
          </h1>
          <h2 className="text-xl text-[#A1A1A1]">
            {album.releaseYear}, {album.label}
          </h2>
        </div>
        <div className="m-4">
          <div className="flex">
            <span className="mr-4 text-xl text-[#A1A1A1]">Price:</span>
            <span className="text-xl font-semibold text-white">
              {listing.price} {listing.currency}
            </span>
          </div>
        </div>
      </div>

      <div>
        <Button variant="basket" />
        <Button variant="wishlist" />
        <Button variant="collection" />
      </div>
    </div>
  );
}
