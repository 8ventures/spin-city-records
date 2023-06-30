import Image from "next/image";
import logo from "../../../public/logo.svg";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import SearchAlbumsHome from "~/components/SearchAlbumsHome";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
// import CurrencySelect from "./CurrencySelect";

export default function Header() {
  const router = useRouter();
  const user = useUser();
  const [searchText, setSearchText] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const CreateListing = () => {
    const { user } = useUser();
    if (!user) return null;
    return (
      <div>
        <button className="border border-slate-500 rounded text-white">
          <Link href="/create-listing">Create Listing</Link>
        </button>
      </div>
    );
  };

  return (
    <nav className="min-h-34 mb-4 flex w-full flex-col items-center justify-between border-b border-[#A1A1A1] bg-black px-6 py-4 lg:flex-row ">
      <Image
        src={logo}
        alt="logo"
        onClick={() => {
          router.push("/");
        }}
        className="max-h-full max-w-full cursor-pointer"
      />
      <div className=" mt-5 flex flex-col items-center px-8 xl:w-full xl:flex-row">
        {/* <div
          className={`mb-4 flex h-10 w-full cursor-pointer items-center justify-center rounded-full border ${
            isSelected
              ? "border-2 border-cyan-200 shadow-lg shadow-cyan-500/50"
              : ""
          }`}
        >
          <MagnifyingGlassIcon className="ml-2 h-5 w-5 cursor-default text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="h-full w-full bg-transparent px-5 text-white outline-none"
            onChange={(e) => setSearchText(e.target.value)}
            onSelect={() => {
              setIsSelected(true);
              console.log(isSelected);
            }}
            onBlur={() => {
              setIsSelected(false);
            }}
          />
        </div> */}
        <SearchAlbumsHome />
        <div className="mb-4 flex flex-col items-center sm:flex-row">
          <button className="m-2 flex justify-center rounded-lg border  bg-[#000000] px-4 py-2 text-base font-semibold text-white hover:border-[#333333] hover:bg-white hover:text-black">
            Categories
          </button>
          <button className="m-2 flex justify-center rounded-lg border  bg-[#000000] px-4 py-2 text-base font-semibold text-white hover:border-[#333333] hover:bg-white hover:text-black">
            Collections
          </button>
          <button className="m-2 flex justify-center rounded-lg border  bg-[#000000] px-4 py-2 text-base font-semibold text-white hover:border-[#333333] hover:bg-white hover:text-black">
            Rare
          </button>
          <button className="m-2 flex justify-center rounded-lg border  bg-[#000000] px-4 py-2 text-base font-semibold text-white hover:border-[#333333] hover:bg-white hover:text-black">
            Sellers
          </button>
          <button className="m-2 flex justify-center rounded-lg border  bg-[#000000] px-4 py-2 text-base font-semibold text-white hover:border-[#333333] hover:bg-white hover:text-black">
            Profile
          </button>
        </div>
      </div>
      <div className="flex-col w-fit justify-center">

        <div className="flex items-center">
          <div
            onClick={() => router.push("/cart")}
            className=" justify-cent mx-2 flex h-10 w-10 flex-shrink-0 cursor-pointer items-center"
          >
            <ShoppingBagIcon className="h-10 w-10 text-white" />
          </div>


          <div className="mx-2 text-white w-10">
            {!user.isSignedIn && <SignInButton />}
            {user.isSignedIn && (
              <div className="">
                <UserButton afterSignOutUrl="/" />
              </div>
            )}
          </div>
        </div>
        <CreateListing />
      </div>
      {/* <CurrencySelect /> */}
    </nav>
  );
}
