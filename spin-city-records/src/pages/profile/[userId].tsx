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
  { label: "My Listings", page: "selling" },
  { label: "Create a Listing", page: "createListing" },
  { label: "Settings", page: "settings" },
];

const profilePages = [
  { label: "Wish List", page: "wishList" },
  { label: "My Orders", page: "myOrders" },
  { label: "Become a Seller", page: "startSelling" },
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

  const [currentPage, setCurrentPage] = useState<Page>("wishList");

  useEffect(() => {
    if (page && typeof page === "string" && page in pageComponents) {
      setCurrentPage(page as Page);
    } else {
      setCurrentPage("wishList");
    }
  }, [page]);

  const PageComponent = pageComponents[currentPage] || Settings;

  const handleClick = (page: Page) => {
    setCurrentPage(page);
    if (currentUserId) {
      router.push(`/profile/${page}`).catch((e) => console.log(e));
    }
  };

  return (
    <Layout>
      {currentUserId && (
        <div className="mx-auto  flex w-full flex-col  justify-center text-base text-[#A1A1A1] sm:flex-row md:text-lg">
          {user?.publicMetadata.stripeId
            ? profilePagesisSeller.map(({ label, page }) => (
                <button
                  onClick={() => handleClick(page as Page)}
                  className={`m-4 rounded-xl p-4 ${
                    currentPage === page
                      ? "text-white underline decoration-4 underline-offset-8"
                      : "hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))
            : profilePages.map(({ label, page }) => (
                <button
                  onClick={() => handleClick(page as Page)}
                  className={`m-4 rounded-xl p-4 ${
                    currentPage === page
                      ? "text-white underline decoration-4 underline-offset-8"
                      : "hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
        </div>
      )}

      {currentPage && <PageComponent />}
    </Layout>
  );
};

export default ProfilePage;
