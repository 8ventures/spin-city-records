import React, { useState, useEffect } from "react";
import Turnstone from "turnstone";
import recentSearchesPlugin from "turnstone-recent-searches";
import { api } from "~/utils/api";
import SplitMatch from "split-match";
import { useRouter } from "next/router";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

interface SplitMatchProps {
  children: React.ReactNode;
}

interface Album {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  label: string;
  artwork: string;
  year: number;
  artistId: string;
}

interface Artist {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  bio: string;
  artwork: string;
}

const styles = {
  input:
    "h-12 w-full bg-transparent pl-12 text-lg text-white outline-none rounded-xl border border-gray-500",
  inputFocus:
    "h-12 w-full bg-transparent pl-12 text-lg text-white outline-none rounded-xl border shadow-lg shadow-gray-500/10",
  query: "text-oldsilver-800 placeholder-oldsilver-400",
  typeahead: "text-slate-500",
  cancelButton: `absolute w-10 h-12 inset-y-0 left-0 items-center justify-center z-10 text-crystal-600 inline-flex sm:hidden`,
  clearButton:
    "absolute inset-y-0 text-3xl text-custom-orange right-0 w-10 inline-flex items-center justify-center bg-netural-700 hover:text-red-300",
  listbox:
    "w-full bg-black text-sm text-white sm:rounded-md text-left sm:mt-2 p-2 sm:drop-shadow-xl",
  groupHeading:
    "cursor-default mt-2 mb-0.5 px-1.5 uppercase text-sm text-center text-custom-orange",
  match: "font-bold",
  item: "cursor-pointer p-0 text-md whitespace-nowrap text-ellipsis overflow-hidden text-white",
  highlightedItem:
    "cursor-pointer p-0 text-lg whitespace-nowrap sm:text-ellipsis overflow-hidden text-oldsilver-900 rounded-md bg-gradient-to-t from-crystal-100 to-white",
  noItems: "cursor-default text-center my-20",
};

const SearchAlbumsHome = () => {
  const { data: albums } = api.albums.getAll.useQuery();
  const { data: artists } = api.artists.getAll.useQuery();

  const router = useRouter();
  const albumsData = albums;
  const artistsData = artists;
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);



  useEffect(() => {
    if (selectedAlbum && selectedAlbum.id && artistsData) {
      // Get artist details from all artists using artistId of selectedAlbum
      const artist = artistsData.find(a => a.id === selectedAlbum.artistId);
      if (artist) {
        const normalizedArtist = artist.name.replace(/\s+/g, "-");
        const normalizedAlbum = selectedAlbum.name.replace(/\s+/g, "-");
        router.push({
          pathname: `/artist/${normalizedArtist}/${normalizedAlbum}`,
          query: { id: selectedAlbum.id },
        }).catch((e) => console.error(e));
      }
    }
}, [selectedAlbum]);

  useEffect(() => {
    if (selectedArtist && selectedArtist.id) {
      const normalizedArtist = selectedArtist.name.replace(/\s+/g, "-");
      router.push({
        pathname: `/artist/${normalizedArtist}/`,
        query: { id: selectedArtist.id },
      }).catch((e) => console.log(e));
    }
  }, [selectedArtist]);

  function isAlbum(arg: any): arg is Album {
    return arg !== undefined && arg.year !== undefined;
  }

  const handleSelect = (item: Album | Artist) => {
    if (isAlbum(item)) {
      setSelectedAlbum(item); // typecast as Album
    } else {
      setSelectedArtist(item); // typecast as Artist
    }
  };

  const ItemContents: React.FC<{
    index: number;
    item: Album | Artist;
    query: string;
  }> = (props) => {
    const { index, item, query } = props;
    const img = () => {
      return (
        <div className="flex cursor-pointer items-center px-2 py-2">
          <img
            width={70}
            height={70}
            src={item.artwork}
            alt={item.name}
            className="mr-1 rounded-full object-cover"
          />
        </div>
      );
    };

    const matchedText = () => {
      return (
        <SplitMatch
          searchText={query}
          globalMatch={false}
          globalSplit={false}
          caseSensitiveMatch={false}
          caseSensitiveSplit={false}
          separator=","
        >
          {item.name}
        </SplitMatch>
      );
    };

    return (
      <div
        className="flex cursor-pointer items-center space-x-2 rounded-xl p-2 hover:bg-gray-800"
        onClick={() => handleSelect(item, item.name, index)}
      >
        {img()}
        {matchedText()}
      </div>
    );
  };

  const listbox = [
    {
      id: "albums",
      name: "Albums",
      data: albumsData,
      displayField: "name",
      searchType: "contains",
      ratio: 4,
    },
    {
      id: "artists",
      name: "Artists",
      data: artistsData,
      searchType: "contains",
      displayField: "name",
      ratio: 4,
    },
  ];
  const plugins = [
    [
      recentSearchesPlugin,
      {
        id: "recent",
        name: "Recent Searches",
        ratio: 6,
      },
    ],
  ];
  const [hasFocus, setHasFocus] = useState(false);

  const containerStyles = hasFocus
    ? "fixed block w-full h-full top-0 left-0 z-50 relative"
    : "relative w-full";

  const iconDisplayStyle = hasFocus
    ? "inline-flex text-crystal-600"
    : "inline-flex text-oldsilver-400";

  const onBlur = () => setHasFocus(false);
  const onFocus = () => setHasFocus(true);

  return (
    <div className={containerStyles}>
      <span
        className={`absolute inset-y-0 left-2 z-10 h-12 w-10 items-center justify-center ${iconDisplayStyle}`}
      >
        <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
      </span>

      <Turnstone
        Item={ItemContents}
        plugins={plugins}
        cancelButton={false}
        typeahead={true}
        debounceWait={250}
        maxItems={8}
        clearButton={true}
        id="search"
        name="search"
        matchText={true}
        noItemsMessage="We couldn't find any album or artist that matches your search"
        listbox={listbox}
        styles={styles}
        onSelect={handleSelect}
        placeholder="Search for albums or artists.."
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </div>
  );
};

export default SearchAlbumsHome;
