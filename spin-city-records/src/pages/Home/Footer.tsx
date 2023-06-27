import Image from "next/image";
import logo from "./images/logo.png";

export default function Footer() {
  return (
    <footer>
      <div className="flex justify-evenly bg-purple-950 text-white">
        <div className="flex items-center">
          <Image src={logo} alt="logo" height={150} />
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
  );
}
