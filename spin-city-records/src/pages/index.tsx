// import { SignInButton } from "@clerk/nextjs";
// import { useUser } from "@clerk/clerk-react";
// import Head from "next/head";
// import Link from "next/link";
// import ManageUser from "~/components/userButton";
// import { RouterOutputs, api } from "~/utils/api";
// import SignUpStep from "~/components/addUser";

// const CreateListing = () => {
//   const { user } = useUser();
//   if (!user) return null;
//   return (
//     <div>
//       <button className="border border-slate-800">
//         <Link href="/create-listing">Create Listing</Link>
//       </button>
//     </div>
//   );
// };

// //we gonna need this later - for now we just want to see if we can get the data
// type ListingWithUser = RouterOutputs["listings"]["getAll"][number];

// const ListingView = (props: ListingWithUser) => {
//   const { listing, user } = props;
//   return (
//     <div key={listing.id}>
//       @{user.username}---
//       {listing.description} {listing.price} {listing.currency}
//     </div>
//   );
// };

// export default function Home() {
//   const user = useUser();

//   return (
//     <>
//       {!user.isSignedIn && <SignInButton />}
//       {user.isSignedIn && (
//         <div>
//           <ManageUser />
//           <CreateListing/>
//         </div>
//       )}
//       {/* <div>
//         {[...data]?.map((fullListing) => (
//           <ListingView {...fullListing} key={fullListing.listing.id} />
//         ))}
//       </div> */}
//     </>
//   );
// }

// import { useUser, SignInButton, UserButton } from "@clerk/nextjs"

// export default function Home() {
//   const user = useUser();
<<<<<<< HEAD

//   return (
//     <>
//       {!user.isSignedIn && <SignInButton />}
//       {user.isSignedIn && <UserButton afterSignOutUrl="/"/>}
//     </>
//   );
// }
        
=======

//   return (
//     <>
//       {!user.isSignedIn && <SignInButton />}
//       {user.isSignedIn && <UserButton afterSignOutUrl="/"/>}
//     </>
//   );
// }

>>>>>>> 6af8aa77a293717d3038aa4087316ef8075b079e
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import mockListings from "./mock-listings.json";
import mockAlbums from "./mock-albums.json";
import Carousel from "./Home/Carousel";
import Footer from "../components/Layout/Footer";
import MusicSection from "./Home/MusicSection";
import Header from "~/components/Layout/Header";

interface Listing {
  id: string;
  createdAt: string;
  updatedAt: string;
  userID: string;
  albumID: string;
  price: number;
  currency: string;
  condition: string;
  weight: string;
  format: string;
  speed: string;
  special: string[];
  description: string;
}

interface Album {
  id: string;
  name: string;
  artist: string;
  releaseYear: number;
  label: string;
  artwork: string;
  createdAt: string;
  updatedAt: string;
}

export interface CombinedData extends Listing {
  album?: Album;
}

const combineData: CombinedData[] = mockListings.map((listing: Listing) => {
  const album = mockAlbums.find((album: Album) => album.id === listing.albumID);
  return { ...listing, album };
});

combineData.sort(
  (a: CombinedData, b: CombinedData) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
);

const newReleases = combineData.slice(0, 10);

export default function Home() {
  return (
    <Link href="/">
      <>
        <Header />
        <div className="h-full bg-purple-100">
          <Carousel />
          <section>
            <h1 className="text-center font-Belanosima text-6xl font-bold text-purple-700">
              SHOP MUSIC
            </h1>
            <MusicSection title="RECENTLY ADDED" items={newReleases} />
            <MusicSection title="BEST SELLERS" items={newReleases} />
            <MusicSection title="GENRE" items={newReleases} />
          </section>
          <Footer />
        </div>
      </>
    </Link>
  );
}
