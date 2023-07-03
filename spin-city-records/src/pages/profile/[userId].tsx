import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout/Layout";
import MyOrders from "../../components/Profile/MyOrder";
import Selling from "../../components/Profile/Selling";
import WishList from "../../components/Profile/WishList";
import CreateListingForm from "../../components/createListingForm";
import OnboardingForm from "../../components/Profile/onboardingForm";
import ProfilePageButton from "../../components/Profile/ProfilePageButton";
import Messages from "../../components/Profile/Messages";
import Settings from "../../components/Profile/Settings";

const profilePages = [
  { label: "Wish List", page: "wishList" },
  { label: "My Orders", page: "myOrders" },
  { label: "Messages", page: "messages" },
  { label: "Start Selling", page: "startSelling" },
  { label: "Selling", page: "selling" },
  { label: "Create Listing", page: "createListing" },
  { label: "Settings", page: "settings" },
];

const pageComponents = {
  wishList: WishList,
  myOrders: MyOrders,
  messages: Messages,
  startSelling: OnboardingForm,
  selling: Selling,
  createListing: CreateListingForm,
  settings: Settings,
};

type Page =
  | "wishList"
  | "myOrders"
  | "messages"
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

  const PageComponent = pageComponents[currentPage] || WishList;

  const handleClick = (page: Page) => {
    setCurrentPage(page);
    router.push(`/profile/${currentUserId}/${page}`);
  };

  return (
    <Layout>
      <div className="text-white">
        <div className="mb-14 ml-28 w-96 border-b border-gray-200 text-gray-400 md:w-[790px]">
          {profilePages.map(({ label, page }) => (
            <ProfilePageButton
              key={page}
              label={label}
              page={page}
              currentPage={currentPage}
              onClick={() => handleClick(page as Page)}
            />
          ))}
        </div>
        <PageComponent />
      </div>
    </Layout>
  );
};

export default ProfilePage;
