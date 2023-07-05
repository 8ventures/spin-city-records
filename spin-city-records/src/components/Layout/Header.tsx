import Image from "next/image";
import logo from "../../../public/logo.svg";
import { useUser, SignInButton, SignOutButton } from "@clerk/nextjs";
import SearchAlbumsHome from "~/components/SearchAlbumsHome";
import { useRouter } from "next/router";
import Dropdown from "./Dropdown";
import { CartContext } from "~/components/GlobalContext/CartContext";
import { useContext } from "react";

import {
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

export default function Header() {
  const router = useRouter();
  const user = useUser();
  const { cart } = useContext(CartContext);

  const currentUserId = user.user?.id;

  return (
    <header className="flex min-w-full justify-center border-b border-[#A1A1A1] bg-black">
      <nav className="h-34 mb-4 flex w-full flex-col items-center justify-between px-6 py-4 md:flex-row">
        <Image
          src={logo as string}
          alt="logo"
          onClick={() => {
            router.push("/").catch((e) => console.log(e));
          }}
          className="max-h-full max-w-full cursor-pointer"
        />
        <div className="ml-4 md:ml-14 mt-2 md:mt-6 flex md:flex-row w-full px-4 md:px-8">
          <SearchAlbumsHome />
        </div>


        <div className="ml-14 mt-8 flex items-end justify-center">

        <div>
            <Dropdown />

          </div>
          <div
            onClick={() => router.push("/cart")}
            className="relative mx-2 flex h-10 w-10 flex-shrink-0 cursor-pointer items-center"
          >

            <ShoppingBagIcon className="mb-5 h-10 w-10 text-white" />
            {cart.length > 0 && (
              <div className="absolute bottom-9 right-0 mb-1 h-6 w-6 rounded-xl bg-custom-orange pb-7 text-center text-lg  text-white ">
                {cart.length}
              </div>
            )}


          </div>


          {currentUserId && (
            <div
              onClick={() => router.push(`/profile/${currentUserId}`)}
              className=" mx-2 flex h-10 w-10 flex-shrink-0 cursor-pointer items-center"
            >
              <UserIcon className="mb-5 h-10 w-10 text-white" />
            </div>
          )}

          <div className="mx-2 mb-3 w-10 p-0 text-white">
            {!user.isSignedIn && (
              <SignInButton mode="modal">
                <button className="py-1">LogIn</button>
              </SignInButton>
            )}
            {user.isSignedIn && (

                <SignOutButton signOutCallback={()=>router.push("/")}>
                <button className="py-1">Logout</button>
                </SignOutButton>

            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
