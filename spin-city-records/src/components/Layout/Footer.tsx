import Image from "next/image";
import logo from "../../../public/logo.svg";
import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();
  return (
    <>
      <footer>
        <hr className="h-px border-0 bg-gray-200 dark:bg-gray-700"></hr>
        <div className="flex justify-evenly bg-black text-white">
          <div className="flex items-center">
            <Image
              src={logo}
              alt="logo"
              height={100}
              priority
              onClick={() => {
                router.push("/");
              }}
              className="cursor-pointer"
            />
          </div>
          <ul className="m-10">
            <li>Shop With Us</li>
            <li>Sell With Us</li>
            <li>About Us</li>
            <li>Follow Us</li>
          </ul>
          <ul className="m-10">
            <li>Search</li>
            <li>Browse Collection</li>
            <li>My Account</li>
            <li>My Orders</li>
            <li>View Basket</li>
          </ul>
          <ul className="m-10">
            <li>FAQ</li>
            <li>Help</li>
            <li>Contact Us</li>
            <li>Legal Stuff</li>
          </ul>
        </div>
      </footer>
    </>
  );
}
