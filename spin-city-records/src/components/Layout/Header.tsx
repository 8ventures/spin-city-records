import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import logo from "../../../public/logo.svg";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import { useState } from "react";

export default function Header() {
  const user = useUser();
  const [searchText, setSearchText] = useState("");

  return (
    <nav className="">
      <div className="flex h-64 w-full items-center justify-between bg-black p-10">
        <Image src={logo} alt="logo" />
        <div className="flex">
          <input
            type="text"
            placeholder="Search"
            className="h-14 w-[800px] rounded-xl p-5"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <MagnifyingGlassIcon className="m-2 h-10 text-white" />
        </div>
        <div className="text-white">
          {!user.isSignedIn && <SignInButton />}
          {user.isSignedIn && <UserButton afterSignOutUrl="/" />}
        </div>
      </div>
      <div className=" flex justify-around bg-black">
        <button className="mb-4 mr-2 w-44 rounded-lg bg-yellow-300 px-5 py-2.5 font-Belanosima text-lg font-medium text-black hover:bg-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-400">
          Category
        </button>
        <button className="w- mb-4 mr-2 rounded-lg bg-yellow-300 px-5 py-2.5 font-Belanosima text-lg font-medium text-black hover:bg-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-400">
          Browse Collections
        </button>
        <button className="mb-4 mr-2 w-44 rounded-lg bg-yellow-300 px-5 py-2.5 font-Belanosima text-lg font-medium text-black hover:bg-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-400">
          Rare
        </button>
        <button className="mb-4 mr-2 w-44 rounded-lg bg-yellow-300 px-5 py-2.5 font-Belanosima text-lg font-medium text-black hover:bg-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-400">
          Sellers
        </button>
      </div>
    </nav>
  );
}
