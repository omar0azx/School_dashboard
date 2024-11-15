import StudentNav from "../components/nav.js";
import NewStudentsTable from "../Student/NewStudentsTable.js";
import AllStudentsTable from "../Student/AllStudentsTable.js";
import StudentSideNav from "../components/sideNav.js";
import { useState, useRef } from "react";

function StudentPage() {
  const [activeHeader, setActiveHeader] = useState("AllStudents");
  const tableRef = useRef(null); // Reference to the MainTable component
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query

  const handleHeaderClick = (headerName) => {
    setActiveHeader(headerName);
  };
  return (
    <>
      <section
        dir="rtl"
        className="grid h-svh grid-rows-[5rem_1fr] grid-cols-[17rem_1fr] 2k:grid-cols-[19rem_1fr] fullhd:grid-cols-[19rem_1fr]"
      >
        <div className="bg-red-500">
          <StudentNav setSearchQuery={setSearchQuery}></StudentNav>{" "}
        </div>
        <div className="col-start-1 row-start-1 row-end-3 bg-black w-full">
          <StudentSideNav></StudentSideNav>
        </div>
        <div className="bg-[#F3F3F3] max-h-[100vh] overflow-y-auto">
          <div className="flex justify-center items-center gap-5 mt-3">
            <h2
              className={`cursor-pointer font-bold ${
                activeHeader === "AllStudents"
                  ? "text-[#3BCAD3] underline underline-offset-8 decoration-4 decoration-[#3BCAD3]"
                  : "text-[#B4B4B4]"
              } transition-all duration-300`}
              onClick={() => handleHeaderClick("AllStudents")}
            >
              الطلاب المُسجلين{" "}
            </h2>
            <h2
              className={`cursor-pointer font-bold ${
                activeHeader === "NewStudents"
                  ? "text-[#3BCAD3] underline underline-offset-8 decoration-4 decoration-[#3BCAD3]"
                  : "text-[#B4B4B4]"
              } transition-all duration-300`}
              onClick={() => handleHeaderClick("NewStudents")}
            >
              الطلاب الجُدد{" "}
            </h2>
          </div>

          <div className="">
            {activeHeader === "AllStudents" && (
              <div className="flex mt-1 justify-between">
                <h2 className="text-[20px] font-semibold font-cairo text-right pr-5">
                  جميع الطُلاب المُسجلين في المنصة:
                </h2>
              </div>
            )}
            {activeHeader === "NewStudents" && (
              <div className="flex mt-1 justify-between">
                <h2 className="text-[20px] font-semibold font-cairo text-right pr-5">
                  الطُلاب الجُدد المُسجلين في المنصة:
                </h2>
              </div>
            )}
            <hr className="mt-2 mb-6 w-11/12 mx-auto border-t-2 border-gray-300" />
            {activeHeader === "AllStudents" && (
              <AllStudentsTable ref={tableRef} searchQuery={searchQuery} />
            )}
            {activeHeader === "NewStudents" && (
              <NewStudentsTable searchQuery={searchQuery} />
            )}
          </div>
          {/* <hr className="mt-2 mb-6 w-11/12 mx-auto border-t-2 border-gray-300" /> */}
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
