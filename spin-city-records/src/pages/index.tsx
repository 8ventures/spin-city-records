import NextError from "next/error";
import { Collection } from "~/utils/types";
import { api } from "~/utils/api";
import SplideCarousel from "~/components/Home/Splide";
import MusicSection from "~/components/Home/MusicSection";
import Layout from "~/components/Layout/Layout";
import { serif } from "~/utils/fonts";
import Head from "next/head";

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

  const bestSellersID = "cljr3oies0000uaactjnx1j65";

  const {
    data: bestSellersQueryData,
    error: bestSellersQueryError,
    isLoading: bestSellersQueryIsLoading,
    isError: bestSellersQueryIsError,
    isSuccess: bestSellersQueryIsSuccess,
  } = api.collections.getById.useQuery({ id: bestSellersID });

  const bestSellers: Collection = bestSellersQueryData as Collection;

  const beatlesID = "cljr0q69c0000uam80vj6a3iy";

  const {
    data: beatlesQueryData,
    error: beatlesQueryError,
    isLoading: beatlesQueryIsLoading,
    isError: beatlesQueryIsError,
    isSuccess: beatlesQueryIsSuccess,
  } = api.collections.getById.useQuery({ id: beatlesID });

  const beatles: Collection = beatlesQueryData as Collection;

  // Error Handling
  if (recentlyAddedQueryIsError) {
    return (
      <NextError
        title={recentlyAddedQueryError?.message}
        statusCode={recentlyAddedQueryError?.data?.httpStatus ?? 500}
      />
    );
  }

  return (
    <>
      <Layout>
        <SplideCarousel />
        <section className="mx-auto flex w-full flex-col items-center justify-center overflow-hidden">
          <h1
            className={`mt-8 w-full text-center text-2xl text-white sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl ${serif.className}`}
          >
            SHOP MUSIC
          </h1>
          <div className="my-8 w-5/6 border-b border-gray-600" />
          <MusicSection
            title={"RECENTLY ADDED"}
            collection={recentlyAdded}
            loading={recentlyAddedQueryIsLoading}
          />
          <div className="my-8 w-5/6 border-b border-gray-600" />
          <MusicSection
            title={"BEST SELLERS"}
            collection={bestSellers}
            loading={recentlyAddedQueryIsLoading}
          />
          <div className="my-8 w-5/6 border-b border-gray-600" />
          <MusicSection
            title={"THE BEATLES"}
            collection={beatles}
            loading={recentlyAddedQueryIsLoading}
          />
          <div className="my-4" />
        </section>
      </Layout>
    </>
  );
}
