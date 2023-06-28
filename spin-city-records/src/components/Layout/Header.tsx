import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import logo from "../../pages/Home/images/logo-black.png";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import { useState } from "react";
import Link from "next/link";


export default function Header() {
  const user = useUser();
  const [searchText, setSearchText] = useState("");
  const CreateListing = () => {
  const { user } = useUser();
  if (!user) return null;
  return (
    <div>
      <button className="border border-slate-800">
        <Link href="/create-listing">Create Listing</Link>
      </button>
    </div>
  );
};

  return (
    <nav>
      <div className="h-34 flex w-full items-center justify-between bg-black p-10">
        <Image src={logo} alt="logo" height={120} />
        <form>
          <label className="sr-only mb-2 text-sm font-medium text-gray-700 dark:text-white">
            Search
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="search"
              className="w-[950px] rounded-lg p-4 pl-10 text-sm"
              placeholder="Search"
              required
            />
            <button
              type="submit"
              className="absolute bottom-2.5 right-2.5 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white"
            >
              Search
            </button>
          </div>
        </form>
        <div className="text-white">
          {!user.isSignedIn && <SignInButton />}
          {user.isSignedIn && (
            <div className="flex flex-col items-center">
              <UserButton afterSignOutUrl="/" />
              <CreateListing />
            </div>
          ) }
        </div>
      </div>
      <div className="flex justify-around bg-black">
        <button className="mb-4 h-12 w-48 rounded-lg border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 shadow hover:bg-gray-300">
          Category
        </button>
        <button className="mb-4 h-12 w-48 rounded-lg border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 shadow hover:bg-gray-300">
          Browse Collections
        </button>
        <button className="mb-4 h-12 w-48 rounded-lg border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 shadow hover:bg-gray-300">
          Rare
        </button>
        <button className="mb-4 h-12 w-48 rounded-lg border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 shadow hover:bg-gray-300">
          Sellers
        </button>
      </div>
    </nav>
  );
}
