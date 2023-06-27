import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import AlbumPage from "./album/[id]";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <AlbumPage />
    // <ClerkProvider>
    //   <SessionProvider session={session}>
    //     <Component {...pageProps} />
    //   </SessionProvider>
    // </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
