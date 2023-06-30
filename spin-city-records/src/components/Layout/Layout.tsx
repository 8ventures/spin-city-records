import { PropsWithChildren } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="m-auto flex min-h-full flex-col items-center">
        <Header />
        <main className="m-6 flex-1 max-w-screen-2xl">{children}</main>
        <Footer />
      </div>
    </>
  );
}
