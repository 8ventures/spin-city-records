import { PropsWithChildren } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="m-auto flex min-h-full flex-col items-center">
        <Header />
        <main className="m-6 max-w-screen-2xl flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
