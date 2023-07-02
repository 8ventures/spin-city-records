import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "~/components/CartContext";
import { api } from "~/utils/api";
import "~/styles/globals.css";

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
