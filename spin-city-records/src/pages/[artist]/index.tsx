import { api } from "~/utils/api";
import Layout from "~/components/Layout/Layout";
import { Album, Artist } from "../../utils/types";
import { useRouter } from "next/router";
function ArtistPage() {
  const router = useRouter();
  const id = router.query.id as string;
  

  const { data: artist, status } = api.artists.getById.useQuery({
    id: id,
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error" || !artist) {
    return <div>Error retrieving artist data</div>;
  }

  const handleClick = (artist:any ,album:any) => {
    const normalizedArtist = artist.name.replace(/\s+/g, "-");
    const normalizedAlbum = album.name.replace(/\s+/g, "-");
    router.push({
      pathname: `/${normalizedArtist}/${normalizedAlbum}`,
      query: { id: album.id },
    });
  };

  return (
    <Layout>
      <div className="m-5 flex flex-row justify-center">
        <div className="m-5 flex flex-col items-center">
          <img
            className="w-1/4 rounded-full border-2"
            src={artist.artwork}
            alt={artist.name}
          />
          <div className="mt-5 bg-black p-5 text-center text-lg text-white">
            <span className="text-3xl font-bold">{artist.name}</span>
            <br />
            <br />
            <span>{artist.bio.split(".")[0] + "."}</span>
          </div>
        </div>
        <div className="flex max-h-screen w-3/5 flex-wrap justify-start overflow-y-scroll">
          {artist.albums.map((album) => (
            <div
              className="w-2/3 m-2 flex-1 bg-black p-5 text-center cursor-pointer text-xl font-bold text-white"
              key={album.id}
              onClick={() => handleClick(artist, album)}
            >
                <img
                  className="mb-5"
                  src={album.artwork}
                  alt={album.name}
                />

              {album.name}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default ArtistPage;
