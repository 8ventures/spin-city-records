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
import logo from "./images/logo.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import mockListings from "./mock-listings.json";
import mockAlbums from "./mock-albums.json";

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

const newReleases = combineData.slice(0, 10);
const displayData = combineData.slice(0, 10);
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
            <div className="h-34 flex w-full items-center justify-between bg-purple-950 p-10">
              <Image src={logo} alt="logo" height={150} />
              <div className="flex">
                <input type="text" placeholder="Search" className="h-12 w-96" />
                <MagnifyingGlassIcon className="m-2 h-10 text-white" />
              </div>
              <ManageUser />
            </div>
            <div className="flex justify-around bg-purple-950">
              <button
                type="button"
                className="mb-4 mr-2 w-44 rounded-lg bg-yellow-300 px-5 py-2.5 font-Belanosima text-lg font-medium text-black hover:bg-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-400"
              >
                Category
              </button>
              <button
                type="button"
                className="w- mb-4 mr-2 rounded-lg bg-yellow-300 px-5 py-2.5 font-Belanosima text-lg font-medium text-black hover:bg-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-400"
              >
                Browse Collections
              </button>
              <button
                type="button"
                className="mb-4 mr-2 w-44 rounded-lg bg-yellow-300 px-5 py-2.5 font-Belanosima text-lg font-medium text-black hover:bg-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-400"
              >
                Rare
              </button>
              <button
                type="button"
                className="mb-4 mr-2 w-44 rounded-lg bg-yellow-300 px-5 py-2.5 font-Belanosima text-lg font-medium text-black hover:bg-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-400"
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
                  <p className="absolute inset-0 m-5 flex items-center justify-center bg-black bg-opacity-20 p-3 font-Belanosima text-2xl">
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
                  <p className="absolute inset-0 m-5 flex items-center justify-center bg-black bg-opacity-20 p-3 font-Belanosima text-2xl">
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
                  <p className="absolute inset-0 m-5 flex items-center justify-center bg-black bg-opacity-20 p-3 font-Belanosima text-2xl">
                    Join us at Spin City Records - your dedicated hub for buying
                    and selling vinyl records. Let's keep the passion for vinyl
                    alive and spinning!
                  </p>
                </div>
              </Slider>
            </div>
            <section>
              <h1 className="text-center font-Belanosima text-6xl font-bold text-purple-700">
                SHOP MUSIC
              </h1>
              <div className="m-10">
                <h3 className="font-Belanosima text-2xl font-bold text-purple-700">
                  RECENTLY ADDED
                </h3>
                <div className="m-10 flex overflow-x-auto rounded-xl bg-purple-50 pb-10">
                  {newReleases.map((item) => (
                    <div
                      key={item.id}
                      className="m-5 flex flex-col items-center"
                    >
                      <img
                        src={item.album?.artwork}
                        alt={item.album?.name}
                        className="h-40 w-40 rounded-xl object-cover"
                      />
                      <div className="w-40 text-center">
                        <h2 className="m-4">{item.album?.artist}</h2>
                        <h2 className="m-4">{item.album?.name}</h2>
                        <p className="m-4 font-bold">
                          {item.price} {item.currency}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="m-10">
                <h3 className="font-Belanosima text-2xl font-bold text-purple-700">
                  BEST SELLERS
                </h3>
                <div className=" m-10 flex overflow-x-auto rounded-xl border-2 border-black bg-purple-50 pb-10">
                  {newReleases.map((item) => (
                    <div
                      key={item.id}
                      className="m-5 flex flex-col items-center"
                    >
                      <img
                        src={item.album?.artwork}
                        alt={item.album?.name}
                        className="h-40 w-40 rounded-xl object-cover"
                      />
                      <div className="w-40 text-center">
                        <h2 className="m-4">{item.album?.artist}</h2>
                        <h2 className="m-4">{item.album?.name}</h2>
                        <p className="m-4 font-bold">
                          {item.price} {item.currency}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="m-10">
                <h3 className="font-Belanosima text-2xl font-bold text-purple-700">
                  GENRE
                </h3>
                <div className=" m-10 flex overflow-x-auto rounded-xl border-2 border-purple-700 bg-purple-50 pb-10">
                  {newReleases.map((item) => (
                    <div
                      key={item.id}
                      className="m-5 flex flex-col items-center"
                    >
                      <img
                        src={item.album?.artwork}
                        alt={item.album?.name}
                        className="h-40 w-40 rounded-xl object-cover"
                      />
                      <div className="w-40 text-center">
                        <h2 className="m-4">{item.album?.artist}</h2>
                        <h2 className="m-4">{item.album?.name}</h2>
                        <p className="m-4 font-bold">
                          {item.price} {item.currency}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <footer>
              <div className=" flex justify-evenly bg-purple-950 text-white">
                <div className="flex items-center">
                  <Image src={logo} alt="logo" height={150} />
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
