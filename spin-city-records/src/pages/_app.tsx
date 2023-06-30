import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ProfilePage from "./profile/[index]";
import ArtistPage from "./artist/[index]";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      {/* <AlbumPage></AlbumPage> */}
      {/* <ProfilePage /> */}
      {/*<ArtistPage /> */}
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
