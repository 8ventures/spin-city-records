import Layout from "~/components/Layout/Layout";
import Sidebar from "~/components/Profile/Sidebar";

function ProfilePage() {
  return (
    <Layout>
      <div className="flex">
        <Sidebar />
        <div className="m-10 h-[60rem] w-[50rem] rounded border border-white bg-black text-white"></div>
      </div>
    </Layout>
  );
}

export default ProfilePage;
