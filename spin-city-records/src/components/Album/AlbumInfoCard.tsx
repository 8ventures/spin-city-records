import { Album } from "~/pages/album/album.types";
import Image from "next/image";

interface AlbumInfoCardProps {
  album: Album;
}

export default function AlbumInfoCard({ album }: AlbumInfoCardProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="mr-6">
        <div>
          <Image
            src={album.artwork}
            width={300}
            height={300}
            alt="Album Artwork"
          />
        </div>
      </div>
      <div>
        <h1 className="mb-2 text-2xl font-bold">{album.name}</h1>
        <h1 className="mb-2 text-lg font-bold">{album.artist}</h1>
        <h2 className="text-sm text-gray-600">
          {album.releaseYear}, {album.label}
        </h2>
      </div>
    </div>
  );
}
