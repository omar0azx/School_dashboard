import React from "react";
import * as XLSX from "xlsx"; // Import xlsx
import { useState, useRef } from "react";
import Cards from "./cards.js";
import { FaSyncAlt } from "react-icons/fa"; // Import the refresh icon
import MainTable from "./MainTable.js"; // Import MainTable
import ReportsTable from "./ReportsTable"; //Import ReportsTable
import DownloadIcon from "../assets/icon_download_file.svg";

const TablesController = ({ searchQuery }) => {
  const [activeHeader, setActiveHeader] = useState("inbox");
  const [isRefreshing, setIsRefreshing] = useState(false); // Track loading state
  const [bounce, setBounce] = useState(false); // State for bounce animation
  const tableRef = useRef(null);

  const handleHeaderClick = (headerName) => {
    // If the clicked header is the same as the current active one, set bounce animation
    if (activeHeader !== headerName) {
      setActiveHeader(headerName);
      setBounce(headerName); // Set bounce animation only on the clicked header
    }

    // Reset the bounce state after 1.5 second (duration of bounce animation)
    setTimeout(() => {
      setBounce(null); // Reset bounce animation after it finishes
    }, 1500);
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
          className={`cursor-pointer font-bold flex items-center ${
            activeHeader === "inbox"
              ? "text-[#3BCAD3] underline underline-offset-8 decoration-4 decoration-[#3BCAD3]"
              : "text-[#B4B4B4]"
          } transition-all duration-300`}
          onClick={() => handleHeaderClick("inbox")}
        >
          صندوق الوارد
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className={`w-5 h-5 mr-2 ${
              activeHeader === "inbox" ? "fill-[#3BCAD3]" : "fill-[#B4B4B4]"
            } ${bounce === "inbox" ? "animate-bounce" : ""}`} // Add bounce only if it's the clicked header
          >
            <path d="M121 32C91.6 32 66 52 58.9 80.5L1.9 308.4C.6 313.5 0 318.7 0 323.9L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-92.1c0-5.2-.6-10.4-1.9-15.5l-57-227.9C446 52 420.4 32 391 32L121 32zm0 64l270 0 48 192-51.2 0c-12.1 0-23.2 6.8-28.6 17.7l-14.3 28.6c-5.4 10.8-16.5 17.7-28.6 17.7l-120.4 0c-12.1 0-23.2-6.8-28.6-17.7l-14.3-28.6c-5.4-10.8-16.5-17.7-28.6-17.7L73 288 121 96z" />
          </svg>
        </h2>

        <h2
          className={`cursor-pointer font-bold flex items-center ${
            activeHeader === "reports"
              ? "text-[#3BCAD3] underline underline-offset-8 decoration-4 decoration-[#3BCAD3]"
              : "text-[#B4B4B4]"
          } transition-all duration-300`}
          onClick={() => handleHeaderClick("reports")}
        >
          التقارير
          <svg
            className={`w-5 h-5 mr-2 ${
              activeHeader === "reports" ? "fill-[#3BCAD3]" : "fill-[#B4B4B4]"
            } ${bounce === "reports" ? "animate-bounce" : ""}`} // Add bounce only if it's the clicked header
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path d="M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z" />
          </svg>
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
            className="ml-7 shadow-lg shadow-[#23232355] bg-[#232323] hover:bg-[#232323d2] text-white font-bold py-2 px-6 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg inline-flex items-center"
            onClick={handleDownloadExcel} // Attach download function
          >
            تنزيل ملف الاكسل
            <img
              src={DownloadIcon}
              alt="Download Icon"
              className="w-5 h-5 mr-2"
            />
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
      {activeHeader === "reports" && <ReportsTable searchQuery={searchQuery} />}
    </div>
  );
};

export default TablesController;
