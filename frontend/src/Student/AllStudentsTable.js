import { useState, useEffect } from "react";
import maleIcon from "../assets/avatar_male.svg";
import Loader from "../components/Loader.js"; // Import the Loader component
import React from "react";
import { useNavigate } from "react-router-dom";

const AllStudentsTable = () => {
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
    "البريد الإلكتروني",
    "رقم الجوال",
  ];

  useEffect(() => {
    const email = localStorage.getItem("userEmail");

    const fetchStudents = async () => {
      try {
        const response = await fetch(`http://localhost:5000/students/${email}`);
        const data = await response.json();
        setStudents(Array.isArray(data) ? data : []);
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
                  onClick={() => handleRowClick(student)}
                >
                  <td className="py-3">
                    <img src={maleIcon} alt="male student icon" />
                  </td>
                  <td className="px-3 py-3">{student.name || "N/A"}</td>
                  <td className="px-3 py-3">{student.level || "N/A"}</td>
                  <td className="px-3 py-3">{student.email || "N/A"}</td>
                  <td className="px-3 py-3">{student.phoneNumber || "N/A"}</td>
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
      {selectedStudent && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md">
            <h3 className="text-3xl font-semibold mb-8">تفاصيل الطالب</h3>
            <p className="mb-4">
              <strong>اسم الطالب:</strong> {selectedStudent.name || "N/A"}
            </p>
            <p className="mb-4">
              <strong>المستوى:</strong> {selectedStudent.level || "N/A"}
            </p>
            <p className="mb-4">
              <strong>الساعات الجديدة:</strong>{" "}
              {selectedStudent.newHours || "N/A"}
            </p>
            <p className="mb-4">
              <strong>الساعات القديمة:</strong>{" "}
              {selectedStudent.oldHours || "N/A"}
            </p>
            <p className="mb-6">
              <strong>التاريخ:</strong> {selectedStudent.date || "N/A"}
            </p>
            <div className="flex flex-col items-center gap-4 mt-4">
              <button
                onClick={goToStudentDetails}
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
};

export default AllStudentsTable;
