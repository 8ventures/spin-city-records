import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "~/components/CartContext";


const MyApp: AppType = ({ Component, pageProps }) => {
  return (
   <ClerkProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </ClerkProvider>
  );
};
export default api.withTRPC(MyApp);
