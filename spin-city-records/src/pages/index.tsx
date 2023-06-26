import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import ManageUser from "~/components/userButton";
import { api } from "~/utils/api";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import vinyl from "./images/vinyl.png";
import records from "./images/records.png";
import record from "./images/record.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import mockListings from "./mock-listings.json";
import mockAlbums from "./mock-albums.json";
import { list } from "postcss";

function Arrow(props: { type: string; onClick?: () => void }) {
  const { type, onClick } = props;
  const isLeft = type === "prev";

  return (
    <div
      onClick={onClick}
      style={{
        width: "40px",
        height: "40px",
        position: "absolute",
        top: "calc(60%)",
        zIndex: "2",
        cursor: "pointer",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        [isLeft ? "left" : "right"]: "10px",
        borderRadius: "50%",
      }}
    >
      {isLeft ? "<" : ">"}
    </div>
  );
}

const combineData = mockListings.map((listing) => {
  const album = mockAlbums.find((album) => album.id === listing.albumID);
  return { ...listing, album };
});

console.log(combineData);
combineData.sort(
  (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
);

const newReleases = combineData.slice(0, 5);
console.log(newReleases);

export default function Home() {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    nextArrow: <Arrow type="next" />,
    prevArrow: <Arrow type="prev" />,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <Link href="/">
        <>
          <nav>
            <div className="flex h-28 w-full items-center justify-between bg-purple-950 p-10">
              <h1 className="text-white">Spin City Records</h1>
              <div className="flex">
                <input type="text" placeholder="Search" className="h-12 w-96" />
                <MagnifyingGlassIcon className="m-2 h-10 text-white" />
              </div>
              <ManageUser />
            </div>
            <div className="flex justify-around bg-purple-950">
              <button
                type="button"
                className="mb-2 w-44 rounded-lg bg-purple-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                Category
              </button>
              <button
                type="button"
                className="mb-2 mr-2 w-44 rounded-lg bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800"
              >
                Browse Collections
              </button>
              <button
                type="button"
                className="mb-2 mr-2 w-44 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                Rare
              </button>
              <button
                type="button"
                className="mb-2 mr-2 w-44 rounded-lg bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-purple-500/50 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-purple-300 dark:shadow-lg dark:shadow-purple-800/80 dark:focus:ring-purple-800"
              >
                Sellers
              </button>
            </div>
          </nav>
          <div className="h-full bg-purple-100">
            <div style={{ height: "500px" }}>
              <Slider {...settings}>
                <div className="relative flex h-80 justify-center text-center text-white">
                  <Image
                    src={vinyl}
                    alt="vinyl"
                    className="absolute inset-0 object-cover"
                    priority
                  />
                  <p className="absolute inset-0 m-5 flex items-center justify-center bg-black bg-opacity-20 p-3 text-2xl">
                    Welcome to Spin City Records, a unique online marketplace
                    built by vinyl enthusiasts, for vinyl enthusiasts. We
                    connect sellers and buyers, facilitating the exchange of
                    vinyl records from every corner of the music world. Discover
                    hard-to-find rarities, pick up the latest releases, or sell
                    your own cherished collection.
                  </p>
                </div>
                <div className="relative flex h-80 justify-center text-center text-white">
                  <Image
                    src={records}
                    alt="records"
                    className="absolute inset-0 object-cover"
                    priority
                  />
                  <p className="absolute inset-0 m-5 flex items-center justify-center bg-black bg-opacity-20 p-3 text-2xl">
                    Our platform ensures a smooth, secure trading experience,
                    with quality at the forefront. Whether you're browsing to
                    buy or looking to list, our user-friendly interface makes it
                    effortless.
                  </p>
                </div>
                <div className="relative flex h-80 justify-center text-center text-white">
                  <Image
                    src={record}
                    alt="record"
                    className="absolute inset-0 object-cover"
                    priority
                  />
                  <p className="absolute inset-0 m-5 flex items-center justify-center bg-black bg-opacity-20 p-3 text-2xl">
                    Join us at Spin City Records - your dedicated hub for buying
                    and selling vinyl records. Let's keep the passion for vinyl
                    alive and spinning!
                  </p>
                </div>
              </Slider>
            </div>
            <section>
              <h1 className="text-center text-6xl font-bold text-purple-700">
                SHOP MUSIC
              </h1>
              <div className="m-10">
                <h3>NEW RELEASES</h3>
                <div className="m-10 h-56 bg-purple-50">
                  {newReleases.map((item) => (
                    <div key={item.id} className="flex">
                      <img src={item.album?.artwork} alt={item.album?.name} />
                      <h2>{item.album?.name}</h2>
                      <p>
                        {item.price} {item.currency}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="m-10">
                <h3>BEST SELLERS</h3>
                <div className="m-10 h-56 border-2 border-black bg-purple-50"></div>
              </div>
              <div className="m-10">
                <h3>MUSICAL GENRES</h3>
                <div className="m-10 h-56 border-2 border-purple-700 bg-purple-50"></div>
              </div>
            </section>
            <footer>
              <div className="m-20 flex justify-evenly border-t-4 border-purple-200 bg-purple-100">
                <div className="flex items-center">
                  <h3>Spin City Records</h3>
                </div>
                <ul className="m-10">
                  <li>Shop With Us</li>
                  <li>Sell With Us</li>
                  <li>About Us</li>
                  <li>Follow Us</li>
                </ul>
                <ul className="m-10">
                  <li>Search</li>
                  <li>Browse Collection</li>
                  <li>My Account</li>
                  <li>My orders</li>
                  <li>View Basket</li>
                </ul>
                <ul className="m-10">
                  <li>FAQ</li>
                  <li>Help</li>
                  <li>Contact Us</li>
                  <li>Legal Stuff</li>
                </ul>
              </div>
            </footer>
          </div>
        </>
      </Link>
    </>
  );
}

// function AuthShowcase() {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined },
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// }
