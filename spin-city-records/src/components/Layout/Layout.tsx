import { PropsWithChildren } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="m-auto flex min-h-full max-w-screen-2xl flex-col bg-[#111111]">
        <Header />
        <main className="m-6 flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
