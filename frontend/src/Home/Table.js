import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Cards from "./cards.js";
import maleIcon from "../assets/avatar_male.svg";

const Table = () => {
  // State to track which header is clicked
  const [activeHeader, setActiveHeader] = useState("inbox");

  // Function to handle click and set the active header
  const handleHeaderClick = (headerName) => {
    setActiveHeader(headerName);
  };
  return (
    <div className="my-3 2k:w-[95%] fullhd:w-[95%]">
      <div className="flex justify-center items-center gap-5">
        {/* Clickable h3 Tags */}
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
      <Cards />

      {activeHeader === "inbox" && (
        <div className="flex mt-1 justify-between">
          <h2 className="text-[20px] font-semibold font-cairo text-right pr-5">
            التحقق من توثيق الساعات الجديدة للطلاب:
          </h2>
          <button className="ml-7 shadow-lg shadow-[#23232355]  bg-[#232323] hover:bg-[#232323d2] text-white font-bold py-2 px-6 rounded-xl">
            تنزيل ملف الاكسل
          </button>
        </div>
      )}
      {activeHeader === "reports" && (
        <div className="flex mt-2 justify-between">
          <h2 className="text-[20px] font-semibold font-cairo text-right pr-5">
            التحقق من تقرير كل فرصة تطوعية:
          </h2>
        </div>
      )}
      {activeHeader === "inbox" && <MainTable />}
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

function MainTable() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const handleRowClick = (student) => setSelectedStudent(student);
  const closeModal = () => setSelectedStudent(null);
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to navigate to /StudentDetails page
  const goToStudentDetails = () => {
    navigate("/StudentDetails");
  };
  // State to manage table rows, including checkbox states
  const [rows, setRows] = useState([
    {
      name: "محمد أحمد",
      level: "الثالث",
      newHours: "10",
      oldHours: "20",
      date: "10/10/2021",
      isChecked: false,
    },
    {
      name: "أحمد علي",
      level: "الثاني",
      newHours: "8",
      oldHours: "18",
      date: "11/11/2021",
      isChecked: false,
    },
    {
      name: "سارة محمد",
      level: "الرابع",
      newHours: "12",
      oldHours: "24",
      date: "12/12/2021",
      isChecked: false,
    },
    {
      name: "علي سعيد",
      level: "الأول",
      newHours: "6",
      oldHours: "14",
      date: "01/01/2022",
      isChecked: false,
    },
    {
      name: "خالد سالم",
      level: "الثالث",
      newHours: "11",
      oldHours: "22",
      date: "02/02/2022",
      isChecked: false,
    },
    {
      name: "فاطمة حسن",
      level: "الثاني",
      newHours: "9",
      oldHours: "19",
      date: "03/03/2022",
      isChecked: false,
    },
    {
      name: "فاطمة حسن",
      level: "الثاني",
      newHours: "9",
      oldHours: "19",
      date: "03/03/2022",
      isChecked: false,
    },
    {
      name: "فاطمة حسن",
      level: "الثاني",
      newHours: "9",
      oldHours: "19",
      date: "03/03/2022",
      isChecked: false,
    },
    {
      name: "فاطمة حسن",
      level: "الثاني",
      newHours: "9",
      oldHours: "19",
      date: "03/03/2022",
      isChecked: false,
    },
    // ... more rows
  ]);

  // Table headers
  const headers = [
    "",
    "اسم الطالب",
    "المستوى",
    "الساعات الجديدة",
    "الساعات القديمة",
    "التاريخ",
    "التحقق",
  ];

  // Function to handle the click event for a specific row
  const handleClick = (index) => {
    setRows((prevRows) => {
      // Clone the rows to avoid mutating the state directly
      const updatedRows = [...prevRows];

      // Toggle the `isChecked` state for the clicked row
      updatedRows[index] = {
        ...updatedRows[index],
        isChecked: !updatedRows[index].isChecked,
      };

      // Move the row to the bottom of the table
      const [rowToMove] = updatedRows.splice(index, 1);
      updatedRows.push(rowToMove);

      return updatedRows; // Return the updated rows
    });
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
                <td className="py-3 cursor-pointer">
                  <img
                    onClick={() => handleRowClick(row)}
                    src={maleIcon}
                    alt="male student icon"
                  />
                </td>
                <td className="px-4 py-3">{row.name}</td>
                <td className="px-4 py-3">{row.level}</td>
                <td className="px-4 py-3">{row.newHours}</td>
                <td className="px-4 py-3">{row.oldHours}</td>
                <td className="px-4 py-3">{row.date}</td>
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
      {/* Modal for student details */}
      {selectedStudent && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md">
            <h3 className="text-3xl font-semibold mb-8">تفاصيل الطالب</h3>
            <p className="mb-4">
              <strong>اسم الطالب:</strong> {selectedStudent.name}
            </p>
            <p className="mb-4">
              <strong>المستوى:</strong> {selectedStudent.level}
            </p>
            <p className="mb-4">
              <strong>الساعات الجديدة:</strong> {selectedStudent.newHours}
            </p>
            <p className="mb-4">
              <strong>الساعات القديمة:</strong> {selectedStudent.oldHours}
            </p>
            <p className="mb-6">
              <strong>التاريخ:</strong> {selectedStudent.date}
            </p>

            {/* Button container with vertical alignment */}
            <div className="flex flex-col items-center gap-4 mt-4">
              <button
                type="button"
                onClick={goToStudentDetails} // Attach navigation function
                className="shadow-lg shadow-cyan-500/50 bg-[#3BCAD3] hover:bg-[#3bc9d3ba] text-white font-bold py-2 px-6 rounded-xl"
              >
                إظهار السجل التطوعي
              </button>
              <button
                onClick={closeModal}
                className="shadow-lg shadow-[#d33b3b5e] bg-[#d33b3b] hover:bg-[#d33b3be5] text-white font-bold py-2 px-6 rounded-xl"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
