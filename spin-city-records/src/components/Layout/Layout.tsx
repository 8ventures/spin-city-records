import { PropsWithChildren } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { DM_Sans } from "@next/font/google";

const sans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
