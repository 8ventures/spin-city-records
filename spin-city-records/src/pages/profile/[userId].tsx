import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout/Layout";
import MyOrders from "../../components/Profile/MyOrder";
import Selling from "../../components/Profile/Selling";
import CreateListingForm from "../../components/Create Listing/createListingForm";
import OnboardingForm from "../../components/Profile/onboardingForm";
import ProfilePageButton from "../../components/Profile/ProfilePageButton";

import Settings from "../../components/Profile/Settings";
import WishList from "~/components/Profile/WishList";

const profilePagesisSeller = [
  { label: "Wish List", page: "wishList" },
  { label: "My Orders", page: "myOrders" },
  { label: "Become A Seller", page: "startSelling" },
  { label: "My Listings", page: "selling" },
  { label: "Create a Listing", page: "createListing" },
  { label: "Settings", page: "settings" },
];

const profilePages = [
  { label: "Wish List", page: "wishList" },
  { label: "My Orders", page: "myOrders" },
  { label: "Become A Seller", page: "startSelling" },
  { label: "Settings", page: "settings" },
];

const pageComponents = {
  wishList: WishList,
  myOrders: MyOrders,
  startSelling: OnboardingForm,
  selling: Selling,
  createListing: CreateListingForm,
  settings: Settings,
};

type Page =
  | "wishList"
  | "myOrders"
  | "startSelling"
  | "selling"
  | "createListing"
  | "settings";

const ProfilePage = () => {
  const router = useRouter();
  const { user } = useUser();
  const currentUserId = user?.id;
  const pathArray = router.asPath.split("/");
  const page = pathArray[pathArray.length - 1];

  const [currentPage, setCurrentPage] = useState<Page>(
    (page as Page) || "wishList"
  );

  useEffect(() => {
    if (page && typeof page === "string") {
      setCurrentPage(page as Page);
    }
  }, [page]);

  const PageComponent = pageComponents[currentPage] || Settings;

  const handleClick = (page: Page) => {
    setCurrentPage(page);
    router.push(`/profile/${currentUserId!}/${page}`).catch((e)=> console.log(e));
  };

  return (
    <Layout>
      <div className="text-white">
        <div className="mb-10 ml-28  text-gray-400">
          {user?.publicMetadata.stripeId ? (
            profilePagesisSeller.map(({ label, page }) => (
              <ProfilePageButton
                key={page}
                label={label}
                page={page}
                currentPage={currentPage}
                onClick={() => handleClick(page as Page)}
              />
            ))
          ) : (
            profilePages.map(({ label, page }) => (
              <ProfilePageButton
                key={page}
                label={label}
                page={page}
                currentPage={currentPage}
                onClick={() => handleClick(page as Page)}
              />
            ))
          )}
        </div>
        <PageComponent />
      </div>
    </Layout>
  );
};

export default ProfilePage;
