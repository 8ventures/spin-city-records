import NextError from "next/error";
import { Collection } from "~/utils/types";
import { api } from "~/utils/api";
import SplideCarousel from "~/components/Home/Splide";
import MusicSection from "~/components/Home/MusicSection";
import Layout from "~/components/Layout/Layout";
import { DM_Sans } from "@next/font/google";
import { DM_Serif_Display } from "@next/font/google";

const sans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const serif = DM_Serif_Display({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

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

  return (
    <Layout>
      <SplideCarousel />
      <section className="mx-auto flex max-w-full flex-col items-center justify-center overflow-hidden">
        <h1
          className={`mt-4 w-full text-center text-2xl text-[#FF5500] sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl ${serif.className}`}
        >
          SHOP MUSIC
        </h1>
        <div className="my-2 w-5/6 border-b border-[#A1A1A1]" />
        <MusicSection
          title={"RECENTLY ADDED"}
          collection={recentlyAdded}
          loading={recentlyAddedQueryIsLoading}
        />
        <div className="my-2 w-5/6 border-b border-[#A1A1A1]" />
        <MusicSection
          title={"NEW RELEASES"}
          collection={recentlyAdded}
          loading={recentlyAddedQueryIsLoading}
        />
        <div className="my-2 w-5/6 border-b border-[#A1A1A1]" />
        <MusicSection
          title={"BEST SELLERS"}
          collection={recentlyAdded}
          loading={recentlyAddedQueryIsLoading}
        />
      </section>
    </Layout>
  );
}
