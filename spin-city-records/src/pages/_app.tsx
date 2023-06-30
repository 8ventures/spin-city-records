import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ProfilePage from "./profile/[index]";
import RegisterSeller from "./seller/[index]";
import PaymentFailedPage from "./fail/[index]";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider>
    {/* <Component {...pageProps} /> */}
    
    <PaymentFailedPage/>
   </ClerkProvider>
      );
};
export default api.withTRPC(MyApp);
