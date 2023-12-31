import Head from "next/head";
import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer, toast } from "react-toastify";
import { dark } from "@clerk/themes";
import { CartProvider } from "~/components/GlobalContext/CartContext";
import { CurrencyProvider } from "~/components/GlobalContext/CurrencyContext";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Spin City Records</title>
        <meta property="og:title" content="Spin City Records" key="title" />
      </Head>
      <ClerkProvider
        appearance={{
          baseTheme: dark,
          variables: {
            colorPrimary: "#FF5500",
          },
        }}
      >
        <CurrencyProvider>
          <CartProvider>
            <Component {...pageProps} />
          </CartProvider>
        </CurrencyProvider>
      </ClerkProvider>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme="dark"
      />
    </>
  );
};
export default api.withTRPC(MyApp);
