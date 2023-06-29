// import { SignInButton } from "@clerk/nextjs";
// import { useUser } from "@clerk/clerk-react";
// import Head from "next/head";
// import Link from "next/link";
// import ManageUser from "~/components/userButton";
// import { RouterOutputs, api } from "~/utils/api";
// import SignUpStep from "~/components/addUser";

// const CreateListing = () => {
//   const { user } = useUser();
//   if (!user) return null;
//   return (
//     <div>
//       <button className="border border-slate-800">
//         <Link href="/create-listing">Create Listing</Link>
//       </button>
//     </div>
//   );
// };

// //we gonna need this later - for now we just want to see if we can get the data
// type ListingWithUser = RouterOutputs["listings"]["getAll"][number];

// const ListingView = (props: ListingWithUser) => {
//   const { listing, user } = props;
//   return (
//     <div key={listing.id}>
//       @{user.username}---
//       {listing.description} {listing.price} {listing.currency}
//     </div>
//   );
// };

// export default function Home() {
//   const user = useUser();

//   return (
//     <>
//       {!user.isSignedIn && <SignInButton />}
//       {user.isSignedIn && (
//         <div>
//           <ManageUser />
//           <CreateListing/>
//         </div>
//       )}
//       {/* <div>
//         {[...data]?.map((fullListing) => (
//           <ListingView {...fullListing} key={fullListing.listing.id} />
//         ))}
//       </div> */}
//     </>
//   );
// }

// import { useUser, SignInButton, UserButton } from "@clerk/nextjs"

// export default function Home() {
//   const user = useUser();

//   return (
//     <>
//       {!user.isSignedIn && <SignInButton />}
//       {user.isSignedIn && <UserButton afterSignOutUrl="/"/>}
//     </>
//   );
// }
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
// const updateUserMutation = api.user.updateUser.useMutation();
// const user = useUser();
// console.log({user})
// console.log(user.isSignedIn)
// useEffect(() => {
//   if (user.isSignedIn) {
//     updateUserMutation.mutate();
//   }
// }, [user.isSignedIn]);
