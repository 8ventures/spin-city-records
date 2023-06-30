import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ProfilePage from "./profile/[userId]";
import ArtistPage from "./artist/[index]";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
    {/* <ProfilePage/> */}
   </ClerkProvider>
      );
};
export default api.withTRPC(MyApp);
