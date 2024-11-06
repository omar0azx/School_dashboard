import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import Loader from "../components/Loader";
import { doc, updateDoc } from "firebase/firestore";
import maleIcon from "../assets/avatar_male.svg";

// Alert Component
const Alert = ({ message, type, onClose }) => {
  const alertStyles = {
    success: "bg-[#abff8f] text-[#528741]",
    error: "bg-[#ff7979] text-[#7D2B2B]",
  };

  return (
    <div
      className={`flex justify-between items-center p-2 rounded-xl shadow ${alertStyles[type]} fixed down-4 left-4 max-w-[200px] z-50`}
      style={{ minWidth: "150px" }}
    >
      <span className="text-sm">{message}</span>
      <button onClick={onClose} className="font-bold text-lg mx-2">
        ×
      </button>
    </div>
  );
};

const NewStudentsTable = () => {
  const headers = [
    "",
    "اسم الطالب",
    "المستوى",
    "البريد الإلكتروني",
    "رقم الجوال",
    "",
    "",
  ];
  const [newStudents, setNewStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  const fetchNewStudents = async () => {
    const email = localStorage.getItem("userEmail");
    try {
      setLoading(true);
      if (!email) {
        console.warn("No email found for logged-in user.");
        setNewStudents([]);
        setLoading(false);
        return;
      }
      const response = await fetch(`http://localhost:5000/students/${email}`);
      const data = await response.json();
      const unregisteredStudents = data.filter(
        (student) => student.isStudentRegisteredScool === false
      );
      setNewStudents(
        Array.isArray(unregisteredStudents) ? unregisteredStudents : []
      );
    } catch (error) {
      console.error("Error fetching students:", error);
      setNewStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewStudents();
  }, []);

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: "", type: "" }), 3000);
  };

  const getUserSchoolCode = async (email) => {
    try {
      const response = await fetch(`http://localhost:5000/profile/${email}`);
      if (!response.ok) {
        throw new Error("User not found");
      }
      const userData = await response.json();
      return userData.schoolCode;
    } catch (error) {
      console.error("Error fetching school code:", error);
      return null;
    }
  };

  const handleAccept = async (studentId) => {
    const email = localStorage.getItem("userEmail");
    const schoolCode = await getUserSchoolCode(email);

    if (!schoolCode) {
      showAlert("رمز المدرسة غير متوفر.", "error");
      return;
    }

    try {
      const studentRef = doc(db, "schools", schoolCode, "students", studentId);
      await updateDoc(studentRef, { isStudentRegisteredScool: true });
      fetchNewStudents();
      showAlert("تم قبول الطالب بنجاح!", "success");
    } catch (error) {
      console.error("Error accepting student:", error);
      showAlert("حدث خطأ أثناء قبول الطالب.", "error");
    }
  };

  const handleRefuse = async (studentId) => {
    const email = localStorage.getItem("userEmail");
    const schoolCode = await getUserSchoolCode(email);

    if (!schoolCode) {
      showAlert("رمز المدرسة غير متوفر.", "error");
      return;
    }

    try {
      const studentRef = doc(db, "schools", schoolCode, "students", studentId);
      // await deleteDoc(studentRef);
      fetchNewStudents();
      showAlert("تم رفض الطالب بنجاح!", "success");
    } catch (error) {
      console.error("Error refusing student:", error);
      showAlert("حدث خطأ أثناء رفض الطالب.", "error");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="my-5 mx-20 bg-white px-4 pt-3 pb-4 rounded-3xl border border-gray-200 flex-1">
      <div className="max-h-64 lg:max-h-[60vh] overflow-y-auto">
        {alert.show && (
          <Alert
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert({ show: false })}
          />
        )}
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
            {newStudents.length === 0 ? (
              <tr>
                <td
                  colSpan={headers.length}
                  className="text-center py-5 font-semibold"
                >
                  لايوجد طلاب
                </td>
              </tr>
            ) : (
              newStudents.map((student, rowIndex) => (
                <tr
                  className="bg-white text-[#232323] border-b hover:bg-gray-100"
                  key={rowIndex}
                >
                  <td className="py-3">
                    <img src={maleIcon} alt="male student icon" />
                  </td>
                  <td className="px-3 py-3">{student.name}</td>
                  <td className="px-3 py-3">{student.level}</td>
                  <td className="px-3 py-3">{student.email}</td>
                  <td className="px-3 py-3">{student.phoneNumber}</td>
                  <td className="px-4 py-3 flex justify-center items-center">
                    <button
                      onClick={() => handleAccept(student.id)}
                      className="shadow shadow-[#23232355] bg-[#abff8f] hover:bg-[#abff8faa] text-[#528741] py-2 px-6"
                      style={{
                        borderRadius: "15px",
                        transition: "all 0.1s ease-in-out",
                      }}
                    >
                      قبول
                    </button>
                  </td>
                  <td className="py-3">
                    <button
                      onClick={() => handleRefuse(student.id)}
                      className="shadow shadow-[#23232355] bg-[#ff7979] hover:bg-[#ff7979aa] text-[#7D2B2B] py-2 px-6"
                      style={{
                        borderRadius: "15px",
                        transition: "all 0.1s ease-in-out",
                      }}
                    >
                      رفض
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewStudentsTable;
