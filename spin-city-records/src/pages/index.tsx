
// import { useUser, SignInButton, UserButton } from "@clerk/nextjs"

// export default function Home() {
//   const user = useUser();

//   return (
//     <>
//       {!user.isSignedIn && <SignInButton />}
//       {user.isSignedIn && <UserButton afterSignOutUrl="/"/>}
//     </>
//   );
// }
        
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
