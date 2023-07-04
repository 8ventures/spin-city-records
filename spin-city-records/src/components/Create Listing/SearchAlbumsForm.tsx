import React, { useState, useEffect } from "react";
import Turnstone from "turnstone";
import { api } from "~/utils/api";
import SplitMatch from "split-match";
import type { ControllerRenderProps } from "react-hook-form/dist/types";
import Image from "next/image";
interface SplitMatchProps {
  children: React.ReactNode;
}

type SetForm = React.Dispatch<
  React.SetStateAction<{
    price: number;
    currency: string;
    weight: string;
    format: string;
    speed: string;
    description: string;
    edition: { value: string }[];
    condition: string;
    albumId: string;
  }>
>;

type SearchAlbumsFormProps= {
  field: ControllerRenderProps<{
    price: number;
    currency: string;
    weight: string;
    format: string;
    description: string;
    condition: string;
    speed: string;
    album: Album;
    editions: {value: string}[];
  }, "album">
}
export interface Album {
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
    "h-12 w-full bg-transparent pl-12 text-xl text-white outline-none rounded-xl border",
  inputFocus:
    "h-12 w-full bg-transparent pl-12 text-xl text-white outline-none rounded-xl border-2 border-cyan-200 shadow-lg shadow-cyan-500/50",
  query: "text-oldsilver-800 placeholder-oldsilver-400",
  typeahead: "text-slate-500",
  cancelButton: `absolute w-10 h-12 inset-y-0 left-0 items-center justify-center z-10 text-crystal-600 inline-flex sm:hidden`,
  clearButton:
    "absolute inset-y-0 text-3xl text-custom-orange right-0 w-10 inline-flex items-center justify-center bg-netural-700 hover:text-red-300",
    groupHeading:
    "cursor-default mt-2 mb-0.5 px-1.5 uppercase text-sm text-cyan-500",
  listbox:
    "w-full bg-black text-sm text-white sm:rounded-md text-left sm:mt-2 p-2 sm:drop-shadow-xl",
  match: "font-bold",
  item: "cursor-pointer p-1 text-lg whitespace-nowrap text-ellipsis overflow-hidden text-white",
  highlightedItem:
    "cursor-pointer p-1.5 text-lg whitespace-nowrap sm:text-ellipsis overflow-hidden text-oldsilver-900 rounded-md bg-gradient-to-t from-crystal-100 to-white",
  noItems: "cursor-default text-center my-20",
};


const SearchAlbumsForm = React.forwardRef<HTMLButtonElement, SearchAlbumsFormProps> (
  ({ field }, forwardedRef) => {
    //const [inputAlbum, setInputAlbum] = useState<string | null>(null);

    const { data: albums } = api.albums.getAll.useQuery();
    console.log(albums);

    const albumsData = albums;
    // const defaultListBox = albumsData;
    const [selectedItem, setSelectedItem] = useState<Album | null>(null);

    useEffect(() => {
      if (selectedItem && selectedItem.id) {
        console.log("useEffect called", selectedItem);
      }
    }, [selectedItem]);

    const handleSelect = (item: Album, name: string, index: number) => {
      setSelectedItem(item);
    };

    // const handleSelect = (item: Album, name: string, index: number) => {
    //   if (item && item.id) {
    //     console.log('handleSelect called', item, name, index);
    //     //console.log({item})
    //     setForm(prevForm => ({ ...prevForm, albumId: item.id }));
    //     //setInputAlbum(item.id);
    //   }
    // };

    const ItemContents: React.FC<{
      index: number;
      item: Album;
      query: string;
    }> = (props) => {
      const { index, item, query } = props;
      const img = () => {
        return (
          <div className="flex cursor-pointer items-center px-2 py-2">
            <img
              width={60}
              height={60}
              src={item.artwork}
              alt={item.name}
              className="mr-2 rounded-full object-cover"
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
        name: "albums",
        data: albumsData,
        searchType: "contains",
        displayField: "name",
      },
    ];

    return (
      <Turnstone
        Item={ItemContents}
        autoFocus={false}
        cancelButton={true}
        clearButton={true}
        debounceWait={250}
        maxItems={5}

        defaultListboxIsImmutable={false}
        id="album"
        noItemsMessage="We couldn't find an album that matches your search...please provide another one"
        listbox={listbox}
        matchText={true}
        styles={styles}
        onSelect={field.onChange}
        placeholder="Choose an album..."
        ref={forwardedRef}
      />
    );
  }
)

SearchAlbumsForm.displayName = 'SearchAlbumsForm'
export default SearchAlbumsForm;
