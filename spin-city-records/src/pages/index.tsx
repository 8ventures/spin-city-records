import { useContext } from "react";
import NextError from "next/error";
import { Collection } from "~/utils/types";
import { api } from "~/utils/api";
import { CurrencyContext } from "~/components/GlobalContext/CurrencyContext";
import SplideCarousel from "~/components/Home/Splide";
import MusicSection from "~/components/Home/MusicSection";
import Layout from "~/components/Layout/Layout";

export default function Home() {
  //Data Fetching
  const recentlyAddedId = "cljmx6n8c0000ua3czgt95ysp";
  const {
    data: recentlyAddedQueryData,
    error: recentlyAddedQueryError,
    isLoading: recentlyAddedQueryIsLoading,
    isError: recentlyAddedQueryIsError,
    isSuccess: recentlyAddedQueryIsSuccess,
  } = api.collections.getById.useQuery({ id: recentlyAddedId });

  const recentlyAdded: Collection = recentlyAddedQueryData as Collection;

  // Error Handling
  if (recentlyAddedQueryIsError) {
    return (
      <NextError
        title={recentlyAddedQueryError?.message}
        statusCode={recentlyAddedQueryError?.data?.httpStatus ?? 500}
      />
    );
  }

  //Global Context
  const { currency } = useContext(CurrencyContext);

  //TODO PLACEHOLDER SKELETON
  // if (recentlyAddedQuery.isLoading) {
  //   return <div>Loading...</div>;
  // }
  return (
    <Layout>
      <SplideCarousel />
      <section className="h-max bg-red-500">
        <h1 className="mx-auto w-full items-center justify-center bg-white text-center text-3xl font-bold text-black">
          SHOP MUSIC
        </h1>
      </section>
    </Layout>
  );
}
