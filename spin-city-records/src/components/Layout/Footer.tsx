import Image from "next/image";
import logo from "../../../public/logo.svg";
import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();
  return (
    <footer className="absolute bottom-0 mx-auto w-full  border-t border-[#A1A1A1] bg-black py-2 text-white">
      <div className="mx-auto flex flex-col items-center justify-center md:flex-row">
        <Image
          src={logo}
          alt="logo"
          priority
          onClick={() => {
            router.push("/");
          }}
          className="m-2 w-40 cursor-pointer sm:w-60"
        />
        <div className="grid grid-cols-3 gap-4">
          <ul className="md:text-md m-2 list-none p-0 text-center text-sm md:m-8 lg:text-base">
            <li className="cursor-pointer hover:underline">Shop With Us</li>
            <li className="cursor-pointer hover:underline">Sell With Us</li>
            <li className="cursor-pointer hover:underline">About Us</li>
            <li className="cursor-pointer hover:underline">Follow Us</li>
          </ul>
          <ul className="md:text-md m-2 list-none p-0 text-center text-sm md:m-8 lg:text-base">
            <li className="cursor-pointer hover:underline">Search</li>
            <li className="cursor-pointer hover:underline">My Account</li>
            <li className="cursor-pointer hover:underline">My Orders</li>
            <li className="cursor-pointer hover:underline">View Basket</li>
          </ul>
          <ul className="md:text-md m-2 list-none p-0 text-center text-sm md:m-8 lg:text-base">
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
