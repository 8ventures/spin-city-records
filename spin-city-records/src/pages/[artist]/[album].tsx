import { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/router";
import NextError from "next/error";
import Image from "next/image";
import Layout from "~/components/Layout/Layout";
import { api } from "~/utils/api";
import { Album, Listing } from "~/utils/types";

type GetResult<T extends object> = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
} & T;
type AlbumResult = GetResult<Album>;
type ListingResult = GetResult<Listing>;

export default function AlbumPage() {
  // State
  const [currentAlbum, setCurrentAlbum] = useState<Album | undefined>();
  const [currentListing, setCurrentListing] = useState<Listing | undefined>();
  const [listings, setListings] = useState<Listing[] | undefined>([]);

  //Data Fetching
  //TODO Error Handling
  const router = useRouter();
  const id = router.query.id as string;
  const {
    data: albumQueryData,
    isLoading: albumQueryLoading,
    isError: albumQueryError,
    isSuccess: albumQuerySuccess,
  } = api.albums.getById.useQuery<AlbumResult | undefined>({ id: id });
  const {
    data: listingQueryData,
    isLoading: listingQueryLoading,
    isError: listingQueryError,
    isSuccess: listingQuerySuccess,
  } = api.listings.getByAlbumId.useQuery<ListingResult[] | undefined>({
    albumId: id,
  });

  if (albumQuerySuccess && albumQueryData) {
    setCurrentAlbum(albumQueryData);
  }

  return albumQuerySuccess && albumQueryData ? (
    <Layout>
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row">
          <Image
            src={albumQueryData.artwork}
            width={300}
            height={300}
            alt="Album Artwork"
          />
        </div>
      </div>
    </Layout>
  ) : (
    <div>Loading...</div>
  );
}

// if (listingQueryData && !listingQueryLoading && !listingQueryError) {
//   setListings(listingQueryData);
// }

// useEffect(() => {
//   console.log("albumQueryData", albumQueryData);
//   console.log("listingQueryData", listingQueryData);
// }, [albumQueryData, listingQueryData]);

/* <div className="flex flex-col xl:flex-row">
// <div className="container  m-2 w-full overflow-auto rounded-lg border border-[#333333] bg-black p-6 xl:order-2 xl:w-7/12">
//   <AlbumInfoCard album={album} listing={currentListing} />
// </div>
// <div className="container m-2  w-full overflow-auto rounded-lg border border-[#333333] bg-black p-6 xl:order-1 xl:w-5/12">
//   <div className=" max-h-[calc(50vh)]">
//     <h2 className="text-2xl font-bold text-white">Listings</h2>

//     {listings.length === 0 && (
//       <div className="text-white">No listings found.</div>
//     )}
//     <ListingList
//       listings={listings}
//       setCurrentListing={setCurrentListing}
//     />
//   </div>
// </div>
// </div> */

// // const sellerExample = {
// //   id: "seller123",
// //   name: "John Doe",
// //   email: "johndoe@example.com",
// //   location: {
// //     city: "New York City",
// //     state: "New York",
// //     country: "United States",
// //     address: "123 Main Street",
// //     postalCode: "10001",
// //   },
// //   rating: 4.5,
// //   listings: [
// //     {
// //       id: "listing1",
// //       createdAt: "2023-06-24T12:00:00Z",
// //       updatedAt: "2023-06-24T12:00:00Z",
// //       sellerID: "seller123",
// //       albumID: "album1",
// //       price: 25.99,
// //       currency: "USD",
// //       condition: "Near Mint",
// //       weight: "standard",
// //       format: "12''",
// //       speed: "33RPM",
// //       edition: ["colored", "limited edition"],
// //       description:
// //         "Limited edition colored vinyl in near mint condition. Comes with original sleeve.",
// //     },
// //     {
// //       id: "listing2",
// //       createdAt: "2023-06-25T09:30:00Z",
// //       updatedAt: "2023-06-25T09:30:00Z",
// //       sellerID: "seller123",
// //       albumID: "album2",
// //       price: 19.99,
// //       currency: "USD",
// //       condition: "Excellent",
// //       weight: "standard",
// //       format: "7''",
// //       speed: "45RPM",
// //       edition: [],
// //       description: "Classic 7'' vinyl single in excellent condition.",
// //     },
// //   ],
// // };

// // const [currentListing, setCurrentListing] = useState<Listing | undefined>();

// // const [listings, setListings] = useState<Listing[] | undefined>([]);
// // const [currentAlbum, setCurrentAlbum] = useState<Album | undefined>(
// //   albumQueryData
// // );

// // useEffect(() => {
// //   if (albumQuery.status === "success") {
// //     setAlbum(albumQuery.data);
// //   }
// // }, [albumQuery]);

// // useEffect(() => {
// //   if (listingQuery.status === "success") {
// //     setListings(listingQuery.data);
// //   }
// // }, [listingQuery]);

// // if (albumQuery.error) {
// //   return (
// //     <NextError
// //       title={albumQuery.error.message}
// //       statusCode={albumQuery.error.data?.httpStatus ?? 500}
// //     />
// //   );
// // }

// // if (listingQuery.error) {
// //   return (
// //     <NextError
// //       title={listingQuery.error.message}
// //       statusCode={listingQuery.error.data?.httpStatus ?? 500}
// //     />
// //   );
// // }
// // if (albumQuery.status !== "success" || listingQuery.status !== "success") {
// //   return (
// //     <Layout>
// //       <div className="flex flex-col md:flex-row">
// //         <div className="container  m-2 h-96 w-full animate-pulse rounded-lg border border-[#333333] bg-zinc-900/70 p-6 md:order-2 md:w-2/3"></div>
// //         <div className="container m-2  h-96 w-full animate-pulse rounded-lg border border-[#333333] bg-zinc-900/70 p-6 md:order-1 md:w-1/3"></div>
// //       </div>
// //     </Layout>
// //   );
// // }  *}
