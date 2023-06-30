import { Album, Seller, Listing } from "~/pages/album/album.types";
import Image from "next/image";
import Button from "../Button";

interface AlbumInfoCardProps {
  album: Album;
  listing: Listing;
}

export default function AlbumInfoCard({
  album,
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
            {album.artist.name}
          </h1>
          <h2 className="text-xl text-[#A1A1A1]">
            {album.year}, {album.label}
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
        <Button
          variant="basket"
          className="m-4 flex justify-center rounded-lg border border-[#333333] bg-[#000000] px-4 py-2 text-base font-semibold text-white hover:border-[#333333] hover:bg-white hover:text-black"
        />
        <Button
          variant="wishlist"
          className="m-4 flex justify-center rounded-lg border border-[#333333] bg-[#000000] px-4 py-2 text-base font-semibold text-white hover:border-[#333333] hover:bg-white hover:text-black"
        />
        <Button
          variant="collection"
          className="m-4 flex justify-center rounded-lg border border-[#333333] bg-[#000000] px-4 py-2 text-base font-semibold text-white hover:border-[#333333] hover:bg-white hover:text-black"
        />
      </div>
    </div>
  );
}
