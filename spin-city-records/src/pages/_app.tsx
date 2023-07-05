import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import {dark} from "@clerk/themes";
import { CartProvider } from "~/components/GlobalContext/CartContext";
import { CurrencyProvider } from "~/components/GlobalContext/CurrencyContext";
import { WishlistProvider } from "~/components/GlobalContext/WishListContext";
import { api } from "~/utils/api";
import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark
      }}
    >
      <CurrencyProvider>
        <CartProvider>
          <WishlistProvider>
            <Component {...pageProps} />
          </WishlistProvider>
        </CartProvider>
      </CurrencyProvider>
    </ClerkProvider>
  );
};
export default api.withTRPC(MyApp);
