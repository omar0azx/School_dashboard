// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";

// export const Table = ({ data }) => {
//   const products = [
//     { code: "A1", name: "Product 1", category: "Category 1", quantity: 10 },
//     { code: "A2", name: "Product 2", category: "Category 1", quantity: 20 },
//     { code: "A3", name: "Product 3", category: "Category 2", quantity: 5 },
//     { code: "A4", name: "Product 4", category: "Category 2", quantity: 10 },
//     { code: "A5", name: "Product 5", category: "Category 3", quantity: 15 },
//   ];
//   return (
//     <div>
//       <DataTable value={products} tableStyle={{ minWidth: "50rem" }}>
//         <Column
//           field="code"
//           header="Code"
//           sortable
//           style={{ width: "25%" }}
//         ></Column>
//         <Column
//           field="name"
//           header="Name"
//           sortable
//           style={{ width: "25%" }}
//         ></Column>
//         <Column
//           field="category"
//           header="Category"
//           sortable
//           style={{ width: "25%" }}
//         ></Column>
//         <Column
//           field="quantity"
//           header="Quantity"
//           sortable
//           style={{ width: "25%" }}
//         ></Column>
//       </DataTable>
//     </div>
//   );
// };
// export default Table;

import React from "react";
// import { format } from "date-fns";
import { Link } from "react-router-dom";
// import { getOrderStatus } from "../lib/helpers";
import { useState } from "react";
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
  const [checkboxStates, setCheckboxStates] = useState(
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
              <tr className="bg-white text-[#232323] border-b" key={rowIndex}>
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
              <tr className="bg-white text-[#232323] border-b" key={rowIndex}>
                <td className="py-3">
                  <img src={maleIcon} alt="male student icon" />
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
    </div>
  );
}
