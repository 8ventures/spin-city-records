import React, { useState, useEffect } from "react";
import Turnstone from "turnstone";
import { api } from "~/utils/api";
import SplitMatch from "split-match";
import { useRouter } from "next/router";

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

const styles = {
  input:
    "w-full h-12 border border-crystal-400 py-2 pl-5 pr-9 text-xl text-white outline-none rounded-md bg-black ",
  inputFocus:
    "w-full h-12 border-x-0 border-t-0 border-b border-crystal-500 py-2 pl-5 pr-9 text-xl text-white outline-none sm:rounded-md sm:border bg-black",
  query: "text-white placeholder-oldsilver-400",
  typeahead: "text-white border-white",
  cancelButton: `absolute w-10 h-12 inset-y-0 left-0 items-center justify-center z-10 text-white inline-flex sm:hidden`,
  clearButton:
    "absolute inset-y-0 right-0 w-10 inline-flex items-center justify-center text-white hover:text-hotpink-300",
  listbox:
    "w-full bg-black sm:border sm:border-crystal-500 sm:rounded-md text-left sm:mt-2 p-2 sm:drop-shadow-xl",
  groupHeading:
    "cursor-default mt-2 mb-0.5 px-1.5 uppercase text-sm text-hotpink-500",
  item: "cursor-pointer p-1.5 text-lg whitespace-nowrap text-ellipsis overflow-hidden text-white",
  highlightedItem:
    "cursor-pointer p-1.5 text-lg whitespace-nowrap sm:text-ellipsis overflow-hidden text-white rounded-md bg-gradient-to-t from-crystal-100 to-white",
  noItems: "cursor-default text-center my-20 text-white",
};


const SearchAlbumsHome= () => {

  const { data: albums } = api.albums.getAll.useQuery();
  console.log(albums);
  const router = useRouter();
  const albumsData = albums;
  const defaultListBox = albumsData;
  const [selectedItem, setSelectedItem] = useState<Album | null>(null);

  useEffect(() => {
    if (selectedItem && selectedItem.id) {
      router.push(`/album/${selectedItem.id}`);
    }
  }, [selectedItem]);

  const handleSelect = (item: Album, name: string, index: number) => {
    setSelectedItem(item);
  };

  const ItemContents: React.FC<{
    index: number;
    item: Album;
    query: string;
  }> = (props) => {
    const { index, item, query } = props;
    const img = () => {
      return (
        <div className="h-12 w-12">
          <img
            src={item.artwork}
            alt={item.name}
            // className="h-full w-full rounded object-cover"
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
          MatchComponent={({ children }: SplitMatchProps) => (
            <span className="font-semibold text-gray-800">{children}</span>
          )}
          SplitComponent={({ children }: SplitMatchProps) => (
            <span>{children}</span>
          )}
        >
          {item.name}
        </SplitMatch>
      );
    };

    return (
      <div
        className="flex cursor-pointer items-center space-x-2 rounded p-2 hover:bg-gray-100"
        onClick={() => handleSelect(item, item.name, index)}
      >
        {img()}
        {matchedText()}
      </div>
    );
  };

  const listbox = [
    {
      name: "albums",
      data: albumsData,
      searchType: "contains",
      displayField: "name",
    },
  ];

  return (
    <Turnstone
      Item={ItemContents}
      autoFocus={true}
      cancelButton={true}
      clearButton={true}
      defaultListbox={defaultListBox}
      defaultListboxIsImmutable={false}
      id="album"
      noItemsMessage="no results"
      listbox={listbox}
      matchText={true}
      styles={styles}
      onSelect={handleSelect}
      placeholder="Choose album"
    />
  );
};
export default SearchAlbumsHome;
