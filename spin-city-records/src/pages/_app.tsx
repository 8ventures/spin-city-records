import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "~/components/GlobalContext/CartContext";
import { CurrencyProvider } from "~/components/GlobalContext/CurrencyContext";
import { api } from "~/utils/api";
import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider>
      <CurrencyProvider>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </CurrencyProvider>
    </ClerkProvider>
  );
};
export default api.withTRPC(MyApp);
