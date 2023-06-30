import { useState } from "react";
import Layout from "~/components/Layout/Layout";
import MyAlbums from "~/components/Profile/MyAlbums";
import Selling from "~/components/Profile/Selling";
import Sidebar from "~/components/Profile/Sidebar";
import WishList from "~/components/Profile/WishList";
import { api } from "~/utils/api";

function ProfilePage() {
  const [activeView, setActiveView] = useState("MyAlbums");

  const { mutate: createListing } = api.listings.create.useMutation()

  const getView = () => {
    switch (activeView) {
      case "MyAlbums":
        return <MyAlbums />;
      case "WishList":
        return <WishList />;
      case "Selling":
        return <Selling />;
      default:
        return <MyAlbums />;
    }
  };

  const handleClick = () => {
      createListing()
  }

  return (
    <Layout>
      <div className="flex">
        <Sidebar setActiveView={setActiveView} />
        <div className="m-10 flex h-[60rem] w-[80rem] flex-wrap justify-center overflow-auto rounded border border-white bg-black text-white">
          {getView()}
          <button onClick={handleClick}>
            Add Listing
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default ProfilePage;
