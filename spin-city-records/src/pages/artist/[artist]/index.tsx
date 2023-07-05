import { useContext } from "react";
import { useRouter } from "next/router";
import NextError from "next/error";

import { api } from "~/utils/api";
import { Album, Artist } from "../../../utils/types";

import { CurrencyContext } from "~/components/GlobalContext/CurrencyContext";
import Layout from "~/components/Layout/Layout";

export default function ArtistPage() {
  //Data Fetching
  const router = useRouter();
  const id = router.query.id as string;
  const {
    data: artistQueryData,
    error: artistQueryError,
    isLoading: artistQueryLoading,
    isError: artistQueryIsError,
    isSuccess: artistQuerySuccess,
  } = api.artists.getById.useQuery({ id: id });

  const artist: Artist = artistQueryData as Artist;

  // Error Handling
  if (artistQueryIsError) {
    return (
      <NextError
        title={artistQueryError?.message}
        statusCode={artistQueryError?.data?.httpStatus ?? 500}
      />
    );
  }

  //Global Context
  const { currency } = useContext(CurrencyContext);

  const handleClick = (artist: Artist, album: Album) => {
    const normalizedArtist = artist.name.replace(/\s+/g, "-");
    const normalizedAlbum = album.name.replace(/\s+/g, "-");
    router
      .push({
        pathname: `/artist/${normalizedArtist}/${normalizedAlbum}`,
        query: { id: album.id },
      })
      .catch((e) => console.log(e));
  };
  //TODO SKELETON LOADING
  return (
    artist && (
      <Layout>
        <div className="mx-auto mb-8 mt-8 flex w-full flex-col justify-center md:w-5/6 md:flex-row">
          <div className="mt-8 w-fit xl:w-2/3">
            <img
              className="mx-auto h-36 w-36 rounded-full  border  border-white sm:h-40 sm:w-40 md:h-44  md:w-44 lg:h-48 lg:w-48 xl:h-64 xl:w-64"
              src={artist.artwork}
              alt={artist.name}
            />
            <div className="mx-auto my-8 flex w-5/6 border-b border-[#A1A1A1] md:w-full" />
            <div className="md:text-md mb-8 px-8 text-center text-sm text-white lg:text-base">
              {artist.bio}
            </div>{" "}
          </div>
          <div className="grid grid-cols-2 px-2 2xl:grid-cols-3">
            {artist.albums.map((album) => (
              <div
                key={album.id}
                onClick={() => handleClick(artist, album)}
                className=" flex cursor-pointer flex-col items-center justify-start rounded-xl p-8 hover:bg-[#A1A1A1] hover:bg-opacity-25"
              >
                <img
                  className="rounded-xl object-contain"
                  src={album.artwork}
                  alt={album.name}
                />
                <p className="p-4 text-center text-sm text-white md:text-base">
                  {album.name} ({album.year})
                </p>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    )
  );
}
