import { api } from "~/utils/api";
import Layout from "~/components/Layout/Layout";

function ArtistPage() {
  const { data: artist, status } = api.artists.getById.useQuery({
    id: "cljfsjjhn0000uaec7c8q0xks",
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error" || !artist) {
    return <div>Error retrieving artist data</div>;
  }

  return (
    <Layout>
      <div className="m-10 flex flex-row justify-center">
        <div className="m-10">
          <img
            className="rounded-full border-2"
            src={artist.artistPicture}
            alt={artist.name}
          />
        </div>
        <div className="al m-10 w-[32rem] rounded-3xl border-2 bg-black p-5 text-center text-lg text-white">
          <span className="text-3xl font-bold">{artist.name}</span>
          <br />
          <br />
          <span>{artist.bio}</span>
        </div>
      </div>
      <div className="m-10 flex flex-row justify-evenly">
        {artist.albums.map((album) => (
          <div
            className="rounded-xl border-2 bg-black p-5 text-center text-xl font-bold text-white"
            key={album.id}
          >
            <img className="mb-5" src={album.artwork} alt={album.name} />
            {album.name}
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default ArtistPage;
