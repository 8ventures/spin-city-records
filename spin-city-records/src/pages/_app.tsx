import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import AlbumPage from "./album/[id]";
import ProfilePage from "./profile/[index]";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider>
      <Component {...pageProps} />
      {/* <AlbumPage></AlbumPage> */}
      {/* <ProfilePage /> */}
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
