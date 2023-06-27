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

import { useUser, SignInButton, UserButton } from "@clerk/nextjs"

export default function Home() {
  const user = useUser();

  return (
    <>
      {!user.isSignedIn && <SignInButton />}
      {user.isSignedIn && <UserButton afterSignOutUrl="/"/>}
    </>
  );
}

