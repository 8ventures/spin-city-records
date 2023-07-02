import { Album } from "../../utils/types";
import { useRouter } from "next/router";

interface MusicSectionProps {
  title: string;
  collection: Album[];
}

const MusicSection: React.FC<MusicSectionProps> = ({ title, collection }) => {
  const router = useRouter();

  const handleClick = (album: Album) => {
    const normalizedArtist = album.artist.name.replace(/\s+/g, "-");
    const normalizedAlbum = album.name.replace(/\s+/g, "-");
    router.push({
      pathname: `/${normalizedArtist}/${normalizedAlbum}`,
      query: { id: album.id },
    });
  };

  const getLowestPrice = (album: Album, exchangeRate: number) => {
    if (album.listings.length === 0) {
      return 0;
    }
    let lowestPrice = Infinity;
    album.listings.forEach((listing) => {
      const convertedPrice = listing.price / exchangeRate;
      if (convertedPrice < lowestPrice) {
        lowestPrice = convertedPrice;
      }
    });
    return lowestPrice;
  };

  return (
    <div className="m-10">
      <h3 className="text-2xl font-bold text-white">{title}</h3>
      <div className="m-10 flex overflow-x-auto rounded-xl bg-black pb-10">
        {collection.map((album) => (
          <div
            key={album.id}
            onClick={() => handleClick(album)}
            className="m-5 flex cursor-pointer flex-col items-center"
          >
            <img
              src={album.artwork}
              alt={`Artwork for ${album.name}`}
              className="rounded-xl object-cover"
            />
            <div className="w-40 text-center text-white">
              <h2 className="m-4">{album.artist.name}</h2>
              <h2 className="m-4">{album.name}</h2>
              {getLowestPrice(album, 1) ? (
                <h2 className="m-4 font-bold">
                  {getLowestPrice(album, 1).toFixed(2)} {"GLOBAL CCY"}
                </h2>
              ) : (
                <h2 className="m-4">No listings found</h2>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicSection;
