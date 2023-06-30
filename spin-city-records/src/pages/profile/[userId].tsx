import { useState } from "react";
import Layout from "~/components/Layout/Layout";
import MyAlbums from "~/components/Profile/MyAlbums";
import Selling from "~/components/Profile/Selling";
import Sidebar from "~/components/Profile/Sidebar";
import WishList from "~/components/Profile/WishList";
import { useRouter } from 'next/router'
import { useUser } from "@clerk/nextjs";
function ProfilePage() {
  const [activeView, setActiveView] = useState("MyAlbums");

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

  // will be handy later
  // const { data, error } = useUser(router.query.userId);
  const router = useRouter()
  // const user = useUser();
  console.log(router.query.userId);
  //simple example: <h1>Profile Page for User: {router.query.userId}</h1>
  return (
    <Layout>
      <div className="flex">
        <Sidebar setActiveView={setActiveView} />
        <div className="m-10 flex h-[60rem] w-[80rem] flex-wrap justify-center overflow-auto rounded border border-white bg-black text-white">
          {getView()}
        </div>
      </div>
    </Layout>
  );
}

export default ProfilePage;
