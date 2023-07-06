import Image from "next/image";
import logo from "../../../public/logo.svg";
import { useUser, SignInButton, SignOutButton } from "@clerk/nextjs";
import SearchAlbumsHome from "~/components/SearchAlbumsHome";
import { useRouter } from "next/router";
import Dropdown from "./Dropdown";
import { CartContext } from "~/components/GlobalContext/CartContext";
import { useContext } from "react";
import { serif, sans } from "../../utils/fonts";

import {
  ShoppingBagIcon,
  UserIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";

export default function Header() {
  const router = useRouter();
  const user = useUser();
  const { cart } = useContext(CartContext);

  const currentUserId = user.user?.id;

  return (
    <nav className="mx-auto my-4 flex w-5/6 flex-col items-center justify-between bg-black md:flex-row">
      <Image
        src={logo as string}
        alt="logo"
        onClick={() => {
          router.push("/").catch((e) => console.log(e));
        }}
        className="mx-auto mb-2 flex w-48 cursor-pointer items-start object-contain align-middle md:mb-0 md:w-64"
      />
      <div className="mx-8 flex w-full flex-grow items-center justify-center align-middle md:w-fit">
        <SearchAlbumsHome />
      </div>

      <div className="mx-auto mt-6 flex flex-row md:mt-0">
        <div className=" mr-4 mt-3">
          <Dropdown />
        </div>
        <div onClick={() => router.push("/cart").catch((e) => console.log(e))}>
          <div className="relative">
            <ShoppingBagIcon className="w-10 min-w-[2rem] cursor-pointer text-gray-600  hover:text-white" />
            {cart.length > 0 && (
              <div className="absolute right-0 top-2 -mr-1 -mt-1 ">
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {cart.length}
                </div>
              </div>
            )}
          </div>
        </div>

        {user.isSignedIn && (
          <div
            onClick={() =>
              router.push(`/profile/myOrders`).catch((e) => console.log(e))
            }
            className="mx-2 cursor-pointer"
          >
            <UserIcon className="w-10 min-w-[2rem] cursor-pointer text-gray-500  hover:text-white" />
          </div>
        )}

        {user.isSignedIn && (
          <div
            onClick={() =>
              router.push(`/profile/wishList`).catch((e) => console.log(e))
            }
            className="mx-0 cursor-pointer"
          >
            <HeartIcon className="w-10 min-w-[2rem] cursor-pointer text-red-800  hover:text-red-500" />
          </div>
        )}

        {user.isSignedIn ? (
          <div className="mx-2 cursor-pointer">
            <SignOutButton
              signOutCallback={() =>
                router.push("/").catch((e) => console.log(e))
              }
            >
              <button
                className={`bg-black p-2  text-gray-500 font-black hover:text-white  w-max`}
              >
                Sign Out
              </button>
            </SignOutButton>
          </div>
        ) : (
          <div className="mx-2 cursor-pointer">
            <SignInButton mode="modal">
              <button
                className={` bg-black p-2  text-gray-500 font-black hover:text-white  w-max`}
              >
                Sign In
              </button>
            </SignInButton>
          </div>
        )}
      </div>
    </nav>
  );
}
