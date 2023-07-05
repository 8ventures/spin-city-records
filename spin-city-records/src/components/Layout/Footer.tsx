import Image from "next/image";
import logo from "../../../public/logo.svg";
import { useRouter } from "next/router";
import { DM_Sans } from "@next/font/google";

const sans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default function Footer() {
  const router = useRouter();
  return (
    <footer className="bottom-0 mx-auto flex w-5/6  bg-black p-4 text-white sm:p-0">
      <div className="mx-auto flex flex-col items-center justify-center md:flex-row">
        <Image
          src={logo as string}
          alt="logo"
          priority
          onClick={() => {
            router.push("/").catch((e) => console.log(e));
          }}
          className="mr-4  w-40 cursor-pointer sm:w-48"
        />
        <div className="grid grid-cols-3 gap-8">
          <ul className="md:text-md m-2 list-none p-0 text-center text-xs md:m-8 lg:text-sm">
            <li className="cursor-pointer hover:underline">Shop With Us</li>
            <li className="cursor-pointer hover:underline">Sell With Us</li>
            <li className="cursor-pointer hover:underline">About Us</li>
            <li className="cursor-pointer hover:underline">Follow Us</li>
          </ul>
          <ul className="md:text-md m-2 list-none p-0 text-center text-xs md:m-8 lg:text-sm">
            <li className="cursor-pointer hover:underline">Search</li>
            <li className="cursor-pointer hover:underline">My Account</li>
            <li className="cursor-pointer hover:underline">My Orders</li>
            <li className="cursor-pointer hover:underline">View Basket</li>
          </ul>
          <ul className="md:text-md m-2 list-none p-0 text-center text-xs md:m-8 lg:text-sm">
            <li className="cursor-pointer hover:underline">FAQ</li>
            <li className="cursor-pointer hover:underline">Help</li>
            <li className="cursor-pointer hover:underline">Contact Us</li>
            <li className="cursor-pointer hover:underline">Legal Stuff</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
