import React from "react";
import * as XLSX from "xlsx"; // Import xlsx
import { useState, useRef } from "react";
import Cards from "./cards.js";
import maleIcon from "../assets/avatar_male.svg";
import { FaSyncAlt } from "react-icons/fa"; // Import the refresh icon
import MainTable from "./MainTable.js"; // Import MainTable

const TablesController = ({ searchQuery }) => {
  const [activeHeader, setActiveHeader] = useState("inbox");
  const [isRefreshing, setIsRefreshing] = useState(false); // Track loading state
  const tableRef = useRef(null);

  const handleHeaderClick = (headerName) => {
    setActiveHeader(headerName);
  };

  // Function to handle Excel download
  const handleDownloadExcel = () => {
    const tableData = tableRef.current.getTableData();
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "MainTableData");
    XLSX.writeFile(workbook, "Students_Data.xlsx");
  };

  // Refresh table function
  const refreshTable = () => {
    setIsRefreshing(true); // Set loading state to true
    tableRef.current.refreshData(); // Call the refresh method on MainTable
    setTimeout(() => {
      setIsRefreshing(false); // Reset loading state after a delay (simulate loading)
    }, 2000); // Simulate a 2-second delay (adjust based on actual refresh time)
  };

  return (
    <div className="my-3 2k:w-[95%] fullhd:w-[95%]">
      <div className="flex justify-center items-center gap-5">
        <h2
          className={`cursor-pointer font-bold ${
            activeHeader === "inbox"
              ? "text-[#3BCAD3] underline underline-offset-8 decoration-4 decoration-[#3BCAD3]"
              : "text-[#B4B4B4]"
          } transition-all duration-300`}
          onClick={() => handleHeaderClick("inbox")}
        >
          صندوق الوارد
        </h2>
        <h2
          className={`cursor-pointer font-bold ${
            activeHeader === "reports"
              ? "text-[#3BCAD3] underline underline-offset-8 decoration-4 decoration-[#3BCAD3]"
              : "text-[#B4B4B4]"
          } transition-all duration-300`}
          onClick={() => handleHeaderClick("reports")}
        >
          التقارير
        </h2>
      </div>
      <h2 className="text-[20px] font-semibold font-cairo text-right pr-5">
        أبرز الاحصائيات:
      </h2>
      <hr className="mt-3 w-11/12 mx-auto border-t-2 border-gray-300" />
      {/* Cards component */}
      <Cards />

      {activeHeader === "inbox" && (
        <div className="flex mt-1 justify-between items-center">
          <div className="flex items-center">
            <h2 className="text-[20px] font-semibold font-cairo text-right pr-5">
              التحقق من توثيق الساعات الجديدة للطلاب:
            </h2>
            <button
              className="mr-4 border-none bg-transparent text-[#232323] font-bold rounded-xl relative group"
              onClick={refreshTable} // Attach refresh function
            >
              <FaSyncAlt
                className={`inline-block text-lg ${
                  isRefreshing ? "animate-spin" : ""
                }`} // Add spinning animation on refresh
              />
              <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm text-[#ffffff] bg-[#232323] px-2 py-1 rounded-xl shadow-md">
                تحديث
              </span>
            </button>
          </div>

          <button
            className="ml-7 shadow-lg shadow-[#23232355] bg-[#232323] hover:bg-[#232323d2] text-white font-bold py-2 px-6 rounded-xl"
            onClick={handleDownloadExcel} // Attach download function
          >
            تنزيل ملف الاكسل
          </button>
        </div>
      )}

      {activeHeader === "reports" && (
        <div className="flex mt-1 justify-between">
          <h2 className="text-[20px] font-semibold font-cairo text-right pr-5">
            التحقق من التقارير الجديدة للطلاب:
          </h2>
        </div>
      )}

      <hr className="mt-3 mb-4 w-11/12 mx-auto border-t-2 border-gray-300" />
      {activeHeader === "inbox" && (
        <MainTable ref={tableRef} searchQuery={searchQuery} />
      )}
      {activeHeader === "reports" && <ReportsTable />}
    </div>
  );
};

export default TablesController;

function ReportsTable() {
  // // State to manage the SVG color for each row (use an array)
  // const [setCheckboxStates] = useState(
  //   new Array(6).fill(false) // Assuming 6 rows, change as needed
  // );

  // Table headers
  const headers = [
    "",
    "اسم الطالب",
    "المستوى",
    "الساعات الجديدة",
    "الساعات القديمة",
    "التاريخ",
    "التقرير",
  ];

  // Table data (each row corresponds to a student, matching the headers)
  const rows = [
    ["محمد أحمد", "الثالث", "10", "20", "10/10/2021"],
    ["أحمد علي", "الثاني", "8", "18", "11/11/2021"],
    ["سعيد محمد", "الرابع", "12", "24", "12/12/2021"],
    ["علي سعيد", "الأول", "6", "14", "01/01/2022"],
    ["خالد سالم", "الثالث", "11", "22", "02/02/2022"],
    ["نواف حسن", "الثاني", "9", "19", "03/03/2022"],
  ];

  // Function to handle the click event for a specific row
  // const handleClick = (index) => {
  //   setCheckboxStates((prevState) => {
  //     const newStates = [...prevState];
  //     newStates[index] = !newStates[index]; // Toggle the state for the clicked checkbox
  //     return newStates;
  //   });
  // };
  return (
    <div className="mt-4 mx-20 bg-white px-4 pt-3 pb-4 rounded-3xl border border-gray-200 flex-1">
      {/* <div className="border-x border-gray-200 rounded mt-3 bg-black p-5"> */}
      {/* Add a wrapper div with max-height and overflow-y-auto */}
      <div className="max-h-64 lg:max-h-[75vh] overflow-y-auto">
        <table className="w-full text-[#718EBF] bg-white">
          <thead className="border-b-2 border-gray-300">
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="px-4 py-2">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                className="bg-white text-[#232323] border-b hover:bg-gray-100"
                key={rowIndex}
              >
                <td className="py-3">
                  <img src={maleIcon} alt="male student icon" />
                </td>
                {row.map((cell, cellIndex) => (
                  <td className="px-3 py-3" key={cellIndex}>
                    {cell}
                  </td>
                ))}
                <td className="px-4 py-3 flex justify-center items-center">
                  <button
                    className="shadow-lg shadow-[#23232355] bg-[#23232372] hover:bg-[#232323d2] text-white font-bold py-2 px-6 rounded-xl"
                    style={{
                      borderRadius: "15px",
                      transition: "all 0.1s ease-in-out",
                    }}
                  >
                    تنزيل
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* </div> */}
    </div>
  );
}
