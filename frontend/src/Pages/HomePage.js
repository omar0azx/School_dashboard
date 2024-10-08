import SideNav from "../components/sideNav.js";
import Nav from "../Home/nav.js";
// import TableLocal from "../Home/Table.js";

const HomePage = () => {
  return (
    <section
      dir="rtl"
      className="grid h-svh grid-rows-[6rem_1fr] grid-cols-[15rem_1fr] 2k:grid-cols-[19rem_1fr] fullhd:grid-cols-[19rem_1fr]"
    >
      <div className="bg-red-500">
        <Nav></Nav>
      </div>
      <div className="col-start-1 row-start-1 row-end-3 ">
        <SideNav></SideNav>
      </div>
      <div className=" bg-[#F3F3F3]">{/* <TableLocal></TableLocal> */}</div>
    </section>
  );
};
export default HomePage;
