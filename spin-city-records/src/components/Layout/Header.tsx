import Image from "next/image";
import logo from "../../../public/logo.svg";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import SearchAlbumsHome from "~/components/SearchAlbumsHome";
import { useRouter } from "next/router";
import Dropdown from "./Dropdown";
import {
  ShoppingBagIcon,
  UserIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";

export default function Header() {
  const router = useRouter();
  const user = useUser();
  const currentUserId = user.user?.id;

  return (
    <header className="flex min-w-full justify-center border-b border-[#A1A1A1] bg-black">
      <nav className="h-34 mb-4 flex w-full flex-col items-center justify-between px-6 py-4 md:flex-row">
        <Image
          src={logo}
          alt="logo"
          onClick={() => {
            router.push("/");
          }}
          className="max-h-full max-w-full cursor-pointer"
        />
        <div className="ml-14 mt-6 flex w-full px-8">
          <SearchAlbumsHome />
        </div>
        <div className="ml-14 mt-8 flex items-end justify-center">
          <div
            onClick={() => router.push(`/profile/${currentUserId}`)}
            className=" justify-cent mx-2 flex h-10 w-10 flex-shrink-0 cursor-pointer items-center"
          >
            <UserIcon className="mb-5 h-10 w-10 text-white" />
          </div>
          <div
            onClick={() => router.push("/cart")}
            className="justify-cent mx-2 flex h-10 w-10 flex-shrink-0 cursor-pointer items-center"
          >
            <ShoppingBagIcon className="mb-5 h-10 w-10 text-white" />
          </div>
          <div
            onClick={() => router.push("/")}
            className=" justify-cent mx-2 flex h-10 w-10 flex-shrink-0 cursor-pointer items-center"
          >
            <EnvelopeIcon className="mb-3 h-10 w-10 text-white" />
          </div>
          <div>
            <Dropdown />
          </div>
          <div className="mx-2 mb-3 w-10 text-white">
            {!user.isSignedIn && <SignInButton mode="modal"/>}
            {user.isSignedIn && (
              <div className="">
                <UserButton afterSignOutUrl="/" />
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
