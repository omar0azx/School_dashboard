import { useState, useEffect } from "react";
import maleIcon from "../assets/avatar_male.svg";
import Loader from "../components/Loader.js"; // Import the Loader component
import React from "react";
import { useNavigate } from "react-router-dom";

const AllStudentsTable = ({ searchQuery }) => {
  const navigate = useNavigate();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const handleRowClick = (student) => setSelectedStudent(student || {});
  const closeModal = () => setSelectedStudent(null);

  // Function to navigate to /StudentDetails page
  const goToStudentDetails = () => {
    if (selectedStudent) {
      navigate("/StudentDetails", { state: { student: selectedStudent } });
    }
  };

  const headers = [
    "",
    "اسم الطالب",
    "المستوى",
    "الساعات المكتملة",
    "البريد الإلكتروني",
    "رقم الجوال",
  ];

  useEffect(() => {
    const email = localStorage.getItem("userEmail");

    const fetchStudents = async () => {
      try {
        const response = await fetch(`http://localhost:5000/students/${email}`);
        const data = await response.json();
        // Filter students where isStudentAccepted is 1 = true
        const filteredStudents = data.filter(
          (student) => student.isStudentAccepted === 1
        );

        setStudents(Array.isArray(filteredStudents) ? filteredStudents : []);
      } catch (error) {
        console.error("Error fetching students:", error);
        setStudents([]);
      } finally {
        setLoading(false); // Set loading to false after data fetch
      }
    };

    if (email) {
      fetchStudents();
    } else {
      console.warn("No email found for logged-in user.");
      setLoading(false); // Set loading to false if no email
    }
  }, []);

  // Show loader while loading
  if (loading) {
    return <Loader />;
  }
  const filteredStudents = students.filter(
    (student) =>
      student.name.includes(searchQuery) ||
      student.email.includes(searchQuery) ||
      student.phoneNumber.includes(searchQuery)
  );
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
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student, index) => (
                <tr
                  key={index}
                  className="bg-white text-[#232323] border-b hover:bg-gray-100"
                  onClick={() => handleRowClick(student)}
                >
                  <td className="py-3">
                    <img src={maleIcon} alt="male student icon" />
                  </td>
                  <td className="px-3 py-3">{student.name || "N/A"}</td>
                  <td className="px-3 py-3">{student.level || "N/A"}</td>
                  <td className="px-3 py-3 text-green-500 font-semibold">
                    {student.hoursCompleted || "N/A"} س
                  </td>

                  <td className="px-3 py-3">{student.email || "N/A"}</td>
                  <td className="px-3 py-3">{student.phoneNumber || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={headers.length}
                  className="text-center py-5 font-semibold"
                >
                  {" "}
                  لايوجد طلاب
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {selectedStudent && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40">
          <div className="relative bg-white p-6 rounded-xl w-[90%] max-w-md">
            <button
              className="absolute top-2 right-4 text-gray-500 hover:text-red-500"
              onClick={closeModal}
            >
              ✕
            </button>
            <h3 className="text-4xl font-extrabold mb-8">تفاصيل الطالب</h3>
            <img
              src={maleIcon}
              alt="male student icon"
              className="w-20 h-20 mx-auto mb-4"
            />

            <p className="mb-4">
              <strong>{selectedStudent.name || "N/A"}</strong>
            </p>
            <p className="mb-4">
              <strong>{selectedStudent.level || "N/A"}</strong>
            </p>
            <p className="mb-4">
              <strong>{selectedStudent.phoneNumber || "N/A"}</strong>
            </p>
            <p className="mb-4">
              <strong>{selectedStudent.email || "N/A"}</strong>
            </p>
            <p className="mb-4 text-green-500 font-semibold">
              {selectedStudent.hoursCompleted || "N/A"} ساعة تطوعية
            </p>

            <div className="flex flex-col items-center gap-4 mt-4">
              <button
                onClick={goToStudentDetails}
                className="w-3/4 bg-[#3BCAD3] text-white py-2 rounded-xl transition-all duration-300 ease-in-out transform hover:bg-[#3bc9d3ba] hover:scale-105 hover:shadow-lg"
              >
                إظهار السجل التطوعي
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllStudentsTable;
