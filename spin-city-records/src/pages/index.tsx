import { SignInButton } from "@clerk/nextjs";
import { signIn, signOut, useSession } from "next-auth/react";
import { useUser } from "@clerk/clerk-react";
import Head from "next/head";
import Link from "next/link";
import ManageUser from "~/components/userButton";
import { RouterOutputs, api } from "~/utils/api";

const CreateListing = () => {
  const { user } = useUser();
  if (!user) return null;
  return (
    <div>
      <button className="border border-slate-800">
        <Link href="/create-listing">Create Listing</Link>
      </button>
    </div>
  );
};

//we gonna need this later - for now we just want to see if we can get the data
type ListingWithUser = RouterOutputs["listings"]["getAll"][number];

const ListingView = (props: ListingWithUser) => {
  const { listing, user } = props;
  return (
    <div key={listing.id}>
      @{user.username}---
      {listing.description} {listing.price} {listing.currency}
    </div>
  );
};

export default function Home() {
  const user = useUser();
  const { data } = api.listings.getAll.useQuery();
  if (!data) return <div>something went wrong..</div>;
  console.log({ data });
  console.log({ user });
  return (
    <>
      {!user.isSignedIn && <SignInButton />}
      {user.isSignedIn && (
        <div>
          <ManageUser />
          <CreateListing />
        </div>
      )}
      <div>
        {[...data]?.map((fullListing) => (
          <ListingView {...fullListing} key={fullListing.listing.id} />
        ))}
      </div>
    </>
  );
}

// function AuthShowcase() {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined },
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// }
