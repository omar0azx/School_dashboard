import React, { useState, useEffect, useCallback } from "react";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import maleIcon from "../assets/avatar_male.svg";
import Loader from "../components/Loader"; // import the Loader component

const MainTable = React.forwardRef(({ searchQuery }, ref) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true); // loading state
  const loggedInUserEmail = localStorage.getItem("userEmail");

  const fetchData = useCallback(async () => {
    setLoading(true); // start loading when data fetch begins
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

      const filteredStudents = data.filter(
        (student) => student.newHours && student.newHours !== "0"
      );
      setRows(filteredStudents);
    } catch (error) {
      console.error("Error fetching students:", error);
      setRows([]);
    } finally {
      setLoading(false); // stop loading after data is fetched or an error occurs
    }
  }, [loggedInUserEmail]);

  const refreshData = () => {
    fetchData();
  };

  useEffect(() => {
    if (loggedInUserEmail) {
      fetchData();
    } else {
      console.warn("No email found for logged-in user.");
    }
  }, [loggedInUserEmail, fetchData]);

  React.useImperativeHandle(ref, () => ({
    getTableData: () =>
      rows
        .filter((row) =>
          row.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((row) => ({
          "اسم الطالب": row.name,
          المستوى: row.level,
          "الساعات الجديدة": row.newHours,
          // Remove 'الساعات المكتملة' since you want to ignore it
          "رقم الجوال": row.phoneNumber,
        })),
    refreshData,
  }));

  const headers = [
    "",
    "اسم الطالب",
    "المستوى",
    "الساعات الجديدة",
    // Remove 'الساعات المكتملة' from headers as well
    "رقم الجوال",
    "التحقق",
  ];

  const handleClick = async (index) => {
    const selectedStudent = rows[index];
    const updatedHours = parseInt(selectedStudent.newHours) || 0;

    try {
      const studentRef = doc(
        db,
        "schools",
        selectedStudent.school,
        "students",
        selectedStudent.id
      );
      await updateDoc(studentRef, {
        // Only update newHours and leave hoursCompleted as it is
        newHours: "0",
      });

      setRows((prevRows) => {
        const updatedRows = [...prevRows];
        updatedRows[index] = {
          ...updatedRows[index],
          newHours: "0", // Reset newHours
          isChecked: !updatedRows[index].isChecked,
        };

        const [rowToMove] = updatedRows.splice(index, 1);
        updatedRows.push(rowToMove);

        return updatedRows;
      });
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const filteredRows = rows.filter(
    (row) =>
      row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.phoneNumber.includes(searchQuery)
  );

  return loading ? (
    <Loader /> // Show the loader while data is being fetched
  ) : (
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
            {filteredRows.length === 0 ? (
              <tr>
                <td
                  colSpan={headers.length}
                  className="text-center py-5 font-semibold"
                >
                  لايوجد طلاب لديهم ساعات جديدة
                </td>
              </tr>
            ) : (
              filteredRows.map((row, rowIndex) => (
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default MainTable;
