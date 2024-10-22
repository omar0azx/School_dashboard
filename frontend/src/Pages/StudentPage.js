import StudentNav from "../Student/StudentNav.js";
import StudentsTable from "../Student/StudentsTable.js";
import StudentSideNav from "../components/sideNav.js";

function StudentPage() {
  return (
    <>
      <section
        dir="rtl"
        className="grid h-svh grid-rows-[5rem_1fr] grid-cols-[17rem_1fr] 2k:grid-cols-[19rem_1fr] fullhd:grid-cols-[19rem_1fr]"
      >
        <div className="bg-red-500">
          <StudentNav></StudentNav>{" "}
        </div>
        <div className="col-start-1 row-start-1 row-end-3 bg-black w-full">
          <StudentSideNav></StudentSideNav>
        </div>
        <div className=" bg-[#F3F3F3]">
          <div className="flex mt-6 mb-6 justify-between">
            <h2 className="text-[20px] font-semibold font-cairo text-right pr-5">
              الطُلاب الجُدد المُسجلين في المنصة:{" "}
            </h2>
          </div>
          <StudentsTable></StudentsTable>
        </div>
      </section>
    </>
  );
}

export default StudentPage;

// import SideNav from "../components/sideNav.js";
// import Nav from "../Home/nav.js";
// import TableLocal from "../Home/Table.js";

// const StudentPage = () => {
//   return (
//     <section
//       dir="rtl"
//       className="grid h-svh grid-rows-[5rem_1fr] grid-cols-[17rem_1fr] 2k:grid-cols-[19rem_1fr] fullhd:grid-cols-[19rem_1fr]"
//     >
//       <div className="bg-red-500">
//         <Nav></Nav>
//       </div>
//       <div className="col-start-1 row-start-1 row-end-3 bg-black w-full">
//         <SideNav></SideNav>
//       </div>
//       <div className=" bg-[#F3F3F3]">{/* <TableLocal></TableLocal> */}</div>
//     </section>
//   );
// };
// export default StudentPage;
