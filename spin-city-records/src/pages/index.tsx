import { api } from "~/utils/api";
import NextError from "next/error";
import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from "~/components/Home/Carousel";
import MusicSection from "~/components/Home/MusicSection";
import Layout from "~/components/Layout/Layout";

export default function Home() {
  const [recentlyAdded, setRecentlyAdded] = useState<any>([]); //TODO map function to Album[]

  const recentlyAddedQuery = api.collections.getById.useQuery({
    id: "cljgvs5rg00001yjyvjeygbbp",
  });

  useEffect(() => {
    if (!recentlyAddedQuery.isLoading && !recentlyAddedQuery.error) {
      setRecentlyAdded(recentlyAddedQuery.data);
    }
  }, [recentlyAddedQuery.isLoading, recentlyAddedQuery.error]);

  if (recentlyAddedQuery.error) {
    return (
      <NextError
        title={recentlyAddedQuery.error.message}
        statusCode={recentlyAddedQuery.error.data?.httpStatus ?? 500}
      />
    );
  }

  //TODO PLACEHOLDER SKELETON
  if (recentlyAddedQuery.isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Layout>
      <Carousel />
      <section>
        <h1 className="mt-8 text-center font-Belanosima text-3xl font-bold text-white">
          SHOP MUSIC
        </h1>
        <MusicSection title="Recently Added" collection={recentlyAdded} />
        {/* <MusicSection title="BEST SELLERS" items={newReleases} />
          <MusicSection title="GENRE" items={newReleases} /> */}
      </section>
    </Layout>
  );
}
