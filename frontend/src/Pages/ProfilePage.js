import ProfileSideNav from "../components/sideNav.js";
import ProfileNav from "../components/nav.js";
import Profile from "../components/Profile.js";

const ProfilePage = () => {
  return (
    <section
      dir="rtl"
      className="grid h-svh grid-rows-[5rem_1fr] grid-cols-[17rem_1fr] 2k:grid-cols-[19rem_1fr] fullhd:grid-cols-[19rem_1fr]"
    >
      <div className="bg-red-500">
        <ProfileNav></ProfileNav>
      </div>
      <div className="col-start-1 row-start-1 row-end-3 ">
        <ProfileSideNav></ProfileSideNav>
      </div>
      <div className="bg-[#F3F3F3] max-h-[100vh] overflow-y-auto">
        <Profile></Profile>
      </div>
    </section>
  );
};
export default ProfilePage;
