import React from "react";
import * as XLSX from "xlsx"; // Import xlsx
import { useState, useRef, useEffect } from "react";
import Cards from "./cards.js";
import maleIcon from "../assets/avatar_male.svg";
import { db } from "../firebase.js";
import { doc, updateDoc } from "firebase/firestore";
import { FaSyncAlt } from "react-icons/fa"; // Import the refresh icon

const Table = () => {
  const [activeHeader, setActiveHeader] = useState("inbox");
  const tableRef = useRef(null); // Reference to the MainTable component

  const handleHeaderClick = (headerName) => {
    setActiveHeader(headerName);
  };

  // Function to handle Excel download
  const handleDownloadExcel = () => {
    const tableData = tableRef.current.getTableData(); // Get latest table data from MainTable
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "MainTableData");
    XLSX.writeFile(workbook, "Students_Data.xlsx");
  };

  // Refresh table function
  const refreshTable = () => {
    tableRef.current.refreshData(); // Call the refresh method on MainTable
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
      <Cards />

      {activeHeader === "inbox" && (
        <div className="flex mt-1 justify-between">
          <h2 className="text-[20px] font-semibold font-cairo text-right pr-5">
            التحقق من توثيق الساعات الجديدة للطلاب:
          </h2>
          <button
            className="ml-7 shadow-lg shadow-[#23232355] bg-[#232323] hover:bg-[#232323d2] text-white font-bold py-2 px-6 rounded-xl"
            onClick={handleDownloadExcel} // Attach download function
          >
            تنزيل ملف الاكسل
          </button>
          {/* Refresh button */}
          <button
            className="ml-4 shadow-lg shadow-[#23232355] bg-[#232323] hover:bg-[#232323d2] text-white font-bold py-2 px-6 rounded-xl"
            onClick={refreshTable} // Attach refresh function
          >
            <FaSyncAlt className="inline-block mr-2 text-lg" /> تحديث
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
      {activeHeader === "inbox" && <MainTable ref={tableRef} />}
      {activeHeader === "reports" && <ReportsTable />}
    </div>
  );
};

export default Table;

function ReportsTable() {
  // State to manage the SVG color for each row (use an array)
  const [setCheckboxStates] = useState(
    new Array(6).fill(false) // Assuming 6 rows, change as needed
  );

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
  const handleClick = (index) => {
    setCheckboxStates((prevState) => {
      const newStates = [...prevState];
      newStates[index] = !newStates[index]; // Toggle the state for the clicked checkbox
      return newStates;
    });
  };
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

const MainTable = React.forwardRef((_, ref) => {
  const [rows, setRows] = useState([]);
  const [setCheckboxStates, setCheckboxState] = useState([]);
  const loggedInUserEmail = localStorage.getItem("userEmail");

  // Declare the fetchData function first
  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/students/${loggedInUserEmail}`
      );
      const data = await response.json();

      if (!Array.isArray(data)) {
        console.warn("Unexpected data format:", data);
        setRows([]);
        return;
      }

      // Filter students where newHours is not "0"
      const filteredStudents = data.filter(
        (student) => student.newHours && student.newHours !== "0"
      );
      setRows(filteredStudents);

      // Initialize the checkbox state based on the number of rows
      setCheckboxState(new Array(filteredStudents.length).fill(false));
    } catch (error) {
      console.error("Error fetching students:", error);
      setRows([]);
    }
  };

  // Refresh data function
  const refreshData = () => {
    fetchData(); // Now fetchData is defined and can be called
  };

  useEffect(() => {
    if (loggedInUserEmail) {
      fetchData();
    } else {
      console.warn("No email found for logged-in user.");
    }
  }, [loggedInUserEmail]);

  // Export table data for Excel download
  React.useImperativeHandle(ref, () => ({
    getTableData: () =>
      rows.map((row) => ({
        "اسم الطالب": row.name,
        المستوى: row.level,
        "الساعات الجديدة": row.newHours,
        "الساعات المكتملة": row.hoursCompleted,
        "رقم الجوال": row.phoneNumber,
      })),
    refreshData, // Expose refreshData to parent component
  }));

  const headers = [
    "",
    "اسم الطالب",
    "المستوى",
    "الساعات الجديدة",
    "الساعات المكتملة",
    "رقم الجوال",
    "التحقق",
  ];

  // Function to handle "التحقق" button click
  const handleClick = async (index) => {
    const selectedStudent = rows[index];
    const updatedHours =
      parseInt(selectedStudent.newHours) +
      parseInt(selectedStudent.hoursCompleted || "0");

    try {
      const studentRef = doc(
        db,
        "schools",
        selectedStudent.school,
        "students",
        selectedStudent.id
      );
      await updateDoc(studentRef, {
        hoursCompleted: updatedHours.toString(),
        newHours: "0",
      });

      setRows((prevRows) => {
        const updatedRows = [...prevRows];
        updatedRows[index] = {
          ...updatedRows[index],
          hoursCompleted: updatedHours,
          newHours: "0",
          isChecked: !updatedRows[index].isChecked,
        };

        // Move the verified student to the end of the list
        const [rowToMove] = updatedRows.splice(index, 1);
        updatedRows.push(rowToMove);

        return updatedRows;
      });
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <div className="mt-4 mx-20 bg-white px-4 pt-3 pb-4 rounded-3xl border border-gray-200 flex-1">
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
                <td className="px-3 py-3">{row.name}</td>
                <td className="px-3 py-3">{row.level}</td>
                <td className="px-3 py-3">{row.newHours}</td>
                <td className="px-3 py-3">{row.hoursCompleted}</td>
                <td className="px-3 py-3">{row.phoneNumber}</td>
                <td className="px-4 py-3 flex justify-center items-center">
                  <svg
                    onClick={() => handleClick(rowIndex)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill={row.isChecked ? "green" : "white"}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke={row.isChecked ? "white" : "#c2c2c2"}
                    className="size-8 cursor-pointer transition-all duration-300 ease-in-out hover:scale-110"
                  >
                    <path
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
