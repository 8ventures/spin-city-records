import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import ManageUser from "~/components/userButton";
import { api } from "~/utils/api";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import vinyl from "./images/vinyl.png";

export default function Home() {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

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
          </nav>
          <body className="h-full bg-purple-100">
            <section>
              <div className="relative">
                <div className="absolute inset-0 w-full">
                  <Image
                    src={vinyl}
                    alt="vinyl"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="relative z-10 flex h-full flex-col justify-center text-center text-white">
                  <p className=" m-5 text-2xl">
                    Welcome to Spin City Records, a unique online marketplace
                    built by vinyl enthusiasts, for vinyl enthusiasts. We
                    connect sellers and buyers, facilitating the exchange of
                    vinyl records from every corner of the music world. Discover
                    hard-to-find rarities, pick up the latest releases, or sell
                    your own cherished collection.
                  </p>
                  <p className="m-5 text-xl">
                    Our platform ensures a smooth, secure trading experience,
                    with quality at the forefront. Whether you're browsing to
                    buy or looking to list, our user-friendly interface makes it
                    effortless.
                  </p>
                  <p className="m-5 text-xl">
                    Join us at Spin City Records - your dedicated hub for buying
                    and selling vinyl records. Let's keep the passion for vinyl
                    alive and spinning!
                  </p>
                </div>
              </div>
            </section>
            <section>
              <h1 className="mt-20 text-center text-6xl font-bold text-purple-700">
                SHOP MUSIC
              </h1>
              <div className="m-10">
                <h3>NEW RELEASES</h3>
                <div className="m-10 h-56 bg-purple-50"></div>
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
          </body>
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
