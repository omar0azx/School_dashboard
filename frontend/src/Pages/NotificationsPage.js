import SideNav from "../components/sideNav.js";
import Nav from "../components/nav.js";

const NotificationPage = () => {
  return (
    <section
      dir="rtl"
      className="grid h-svh grid-rows-[5rem_1fr] grid-cols-[17rem_1fr] 2k:grid-cols-[19rem_1fr] fullhd:grid-cols-[19rem_1fr]"
    >
      <div className="bg-red-500">
        <Nav></Nav>
      </div>
      <div className="col-start-1 row-start-1 row-end-3 bg-black w-full">
        <SideNav></SideNav>
      </div>
      <div className="bg-[#F3F3F3] max-h-[100vh] overflow-y-auto">
        <div className="text-lg text-center font-semibold text-[#718EBF] p-4 m-10 ">
          لايوجد إشعارات حتى الان.
        </div>
      </div>
    </section>
  );
};
export default NotificationPage;
