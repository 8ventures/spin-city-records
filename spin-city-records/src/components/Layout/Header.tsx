import Image from "next/image";
import logo from "../../../public/logo.svg";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import CurrencySelect from "./CurrencySelect";

export default function Header() {
  const router = useRouter();
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
    <nav className="min-h-34 mb-4 flex w-full flex-col items-center justify-between bg-black px-6 py-4 lg:flex-row">
      <CurrencySelect />
      <Image
        src={logo}
        alt="logo"
        onClick={() => {
          router.push("/");
        }}
        className="max-h-full max-w-full cursor-pointer"
      />
      <div className=" m-2 mt-5 flex   w-2/3 max-w-full  flex-col">
        <div className="flex h-10 w-full cursor-pointer items-center justify-center rounded-full border">
          <MagnifyingGlassIcon className="ml-2 h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="h-full w-full bg-transparent px-5 text-white outline-none"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className="flex flex-col place-content-around items-center sm:flex-row">
          <button className="m-4 flex justify-center rounded-lg border  bg-[#000000] px-4 py-2 text-base font-semibold text-white hover:border-[#333333] hover:bg-white hover:text-black">
            Categories
          </button>
          <button className="m-4 flex justify-center rounded-lg border  bg-[#000000] px-4 py-2 text-base font-semibold text-white hover:border-[#333333] hover:bg-white hover:text-black">
            Collections
          </button>
          <button className="m-4 flex justify-center rounded-lg border  bg-[#000000] px-4 py-2 text-base font-semibold text-white hover:border-[#333333] hover:bg-white hover:text-black">
            Rare
          </button>
          <button className="m-4 flex justify-center rounded-lg border  bg-[#000000] px-4 py-2 text-base font-semibold text-white hover:border-[#333333] hover:bg-white hover:text-black">
            Sellers
          </button>
          <button className="m-4 flex justify-center rounded-lg border  bg-[#000000] px-4 py-2 text-base font-semibold text-white hover:border-[#333333] hover:bg-white hover:text-black">
            Profile
          </button>
        </div>
      </div>
    </nav>
  );
}

{
  /* <div className="">
{!user.isSignedIn && <SignInButton />}
{user.isSignedIn && (
  <div className="">
    <UserButton afterSignOutUrl="/" />
  </div>
)}
</div> */
}
