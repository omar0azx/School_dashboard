import { useState, useEffect } from "react";
import maleIcon from "../assets/avatar_male.svg";

const AllStudentsTable = () => {
  const headers = [
    "",
    "اسم الطالب",
    "المستوى",
    "البريد الإلكتروني",
    "رقم الجوال",
    "",
    "",
  ];

  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Assume the email is stored in localStorage or another state management solution
    const email = localStorage.getItem("userEmail"); // or obtain it from context if available

    const fetchStudents = async () => {
      try {
        // Include the email as a parameter in the request URL
        const response = await fetch(`http://localhost:5000/students/${email}`);
        const data = await response.json();

        // Ensure data is an array
        setStudents(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching students:", error);
        setStudents([]); // Fallback to empty array if error
      }
    };

    if (email) {
      fetchStudents();
    } else {
      console.warn("No email found for logged-in user.");
    }
  }, []);

  return (
    <div className="my-5 mx-20 bg-white px-4 pt-3 pb-4 rounded-3xl border border-gray-200 flex-1">
      <div className="max-h-64 lg:max-h-[60vh] overflow-y-auto">
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
            {students.length > 0 ? (
              students.map((student, index) => (
                <tr
                  key={index}
                  className="bg-white text-[#232323] border-b hover:bg-gray-100"
                >
                  <td className="py-3">
                    <img src={maleIcon} alt="male student icon" />
                  </td>
                  <td className="px-3 py-3">{student.name}</td>
                  <td className="px-3 py-3">{student.level}</td>
                  <td className="px-3 py-3">{student.email}</td>
                  <td className="px-3 py-3">{student.phoneNumber}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length} className="text-center py-3">
                  لايوجد طلاب
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllStudentsTable;
