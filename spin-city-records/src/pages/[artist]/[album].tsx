import { useState, useContext } from "react";
import { useRouter } from "next/router";
import NextError from "next/error";

import { api } from "~/utils/api";
import { Album, Listing } from "~/utils/types";

import Layout from "~/components/Layout/Layout";
import ListingInfoCard from "~/components/Album/ListingInfoCard";
import AlbumInfoCard from "~/components/Album/AlbumInfoCard";

export default function AlbumPage() {
  //Data Fetching
  const router = useRouter();
  const id = router.query.id as string;
  const {
    data: albumQueryData,
    error: albumQueryError,
    isLoading: albumQueryLoading,
    isError: albumQueryIsError,
    isSuccess: albumQuerySuccess,
  } = api.albums.getById.useQuery({ id: id });
  const {
    data: listingQueryData,
    error: listingQueryError,
    isLoading: listingQueryLoading,
    isError: listingQueryIsError,
    isSuccess: listingQuerySuccess,
  } = api.listings.getByAlbumId.useQuery({
    albumId: id,
  });

  const album: Album = albumQueryData as Album;
  const listings: Listing[] = listingQueryData as Listing[];

  // Error Handling
  if (albumQueryIsError || listingQueryIsError) {
    return (
      <NextError
        title={albumQueryError?.message ?? listingQueryError?.message}
        statusCode={
          albumQueryError?.data?.httpStatus ??
          listingQueryError?.data?.httpStatus ??
          500
        }
      />
    );
  }

  // State
  const [currentListing, setCurrentListing] = useState<Listing>();

  //TODO SKELETON LOADING ? ERROR FETCHING
  return (
    album &&
    listings && (
      <>
        <Layout>
          <AlbumInfoCard
            album={album}
            listings={listings}
            currentListing={currentListing}
          />
        </Layout>
      </>
    )
  );
}

//   return (
//     albumQuerySuccess &&
//     albumQueryData && (
//       <Layout>
//         <div className="flex flex-col text-white ">
//           <div className="mx-auto my-16 flex flex-col items-center justify-center md:w-2/3 md:flex-row">
//             <div className="xl:mx-6">
//               <Image
//                 src={albumQueryData.artwork}
//                 width={400}
//                 height={400}
//                 alt={`Artwork for ${albumQueryData.name} by ${albumQueryData.artist.name}`}
//               />
//             </div>
//             <div className="flex flex-col">
//               <div className="">
//                 <span className="mx-6 my-2 block text-center text-6xl md:text-left">
//                   {albumQueryData.name}
//                 </span>
//                 <span className="mx-6 my-2 block text-center text-4xl md:text-left">
//                   {albumQueryData.artist.name}
//                 </span>
//                 <span className="mx-6 my-2 block text-center text-2xl md:text-left">
//                   {albumQueryData.year}, {albumQueryData.label}
//                 </span>
//               </div>

//               {!currentListing &&
//                 listingQueryData &&
//                 listingQueryData.length !== 0 && (
//                   <>
//                     <span className="mx-6 my-2 block text-center text-3xl md:text-left">
//                       Starting at{" "}
//                       <span className="inline-block font-semibold">
//                         {listingQueryData[0]?.price}{" "}
//                         {listingQueryData[0]?.currency}
//                       </span>
//                     </span>
//                   </>
//                 )}

//               {listingQueryData && listingQueryData.length === 0 && (
//                 <>
//                   <span className="mx-6 my-4 text-2xl">Not available</span>
//                 </>
//               )}

//               {listingQueryData &&
//                 listingQueryData.length !== 0 &&
//                 currentListing && (
//                   <div className="  text-white">
//                     <span className="mx-6 my-4  block text-4xl font-semibold">
//                       {listingQueryData[0]!.price}{" "}
//                       {listingQueryData[0]!.currency}
//                     </span>
//                     <span className="mx-6 my-2 block">
//                       <span className="font-semibold">Condition: </span>
//                       {listingQueryData[0]!.condition}
//                     </span>
//                     <span className="mx-6 my-2 block">
//                       <span className="font-semibold">Weight : </span>{" "}
//                       {listingQueryData[0]!.weight}
//                     </span>
//                     <span className="mx-6 my-2 block">
//                       <span className="font-semibold">Format : </span>{" "}
//                       {listingQueryData[0]!.format}
//                     </span>
//                     <span className="mx-6 my-2 block">
//                       <span className="font-semibold">Speed : </span>{" "}
//                       {listingQueryData[0]!.speed}
//                     </span>

//                     {listingQueryData[0]?.edition &&
//                       listingQueryData[0].edition.length > 0 && (
//                         <>
//                           <span className="mx-6 my-2 block">
//                             <span className="text-yellow font-semibold">
//                               Edition :{" "}
//                             </span>{" "}
//                             {listingQueryData[0].edition.map(
//                               (edition, index) => (
//                                 <span key={index}>
//                                   {index > 0 && ", "} {edition.type}
//                                 </span>
//                               )
//                             )}
//                           </span>
//                         </>
//                       )}
//                   </div>
//                 )}
//             </div>
//           </div>
//           <div className="mx-auto text-white">
//             {listingQueryData?.map((listing, index) => (
//               <div key={index}>
//                 <ListingInfoCard
//                   listing={listingQueryData[index]}
//                   setCurrentListing={setCurrentListing}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </Layout>
//     )
//   );
// }
