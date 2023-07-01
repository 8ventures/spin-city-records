import Image from "next/image";
import logo from "../../../public/logo.svg";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import SearchAlbumsHome from "~/components/SearchAlbumsHome";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
// import CurrencySelect from "./CurrencySelect";

export default function Header() {
  const router = useRouter();
  const user = useUser();
  const [searchText, setSearchText] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  console.log(user.user?.id);
  const currentUserId = user.user?.id;
  return (
    <div className="flex min-w-full justify-center border-b border-[#A1A1A1] bg-black">
      <nav className="min-h-34 mb-4 flex w-full max-w-screen-2xl flex-col items-center justify-between  px-6 py-4 lg:flex-row ">
        <Image
          src={logo}
          alt="logo"
          onClick={() => {
            router.push("/");
          }}
          className="max-h-full max-w-full cursor-pointer"
        />
        <div className=" mt-5 flex flex-col items-center px-8 xl:w-full xl:flex-row">
          <SearchAlbumsHome />
          <div className="flex flex-col items-center sm:flex-row">
            <button className="button-class">Categories</button>
            <button className="button-class">Collections</button>
            <button className="button-class">Rare</button>
            <button className="button-class">Sellers</button>
            <button
              onClick={() => {
                router.push(`/profile/${currentUserId}`);
              }}
              className="button-class"
            >
              Profile
            </button>
            <Link href="/artist">
              <button className="button-class">Artist</button>
            </Link>
          </div>
        </div>
        <div className="w-fit flex-col justify-center">
          <div className="flex items-center">
            <div
              onClick={() => router.push("/cart")}
              className=" justify-cent mx-2 flex h-10 w-10 flex-shrink-0 cursor-pointer items-center"
            >
              <ShoppingBagIcon className="h-10 w-10 text-white" />
            </div>
            <div className="mx-2 w-10 text-white">
              {!user.isSignedIn && <SignInButton />}
              {user.isSignedIn && (
                <div className="">
                  <UserButton afterSignOutUrl="/" />
                </div>
              )}
            </div>
          </div>
        </div>
        {/* <CurrencySelect /> */}
      </nav>
    </div>
  );
}
