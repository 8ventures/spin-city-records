import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ProfilePage from "./Profile";
import RegisterSeller from "./RegisterSeller";
import PaymentFailedPage from "./PaymentFail";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider>
      <Component {...pageProps} />
    {/* <ProfilePage/> */}
   </ClerkProvider>
      );
};
export default api.withTRPC(MyApp);
