import React, { useState, useEffect } from "react";
import SettingsSideNav from "../components/sideNav.js";
import SettingsNav from "../components/nav.js";
import { showSignOutAlert } from "../components/sideNav.js";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, deleteUser } from "firebase/auth";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { getDocs, query, where, collection } from "firebase/firestore";

import showPasswordIcon from "../assets/eye_closed.svg";
import hidePasswordIcon from "../assets/eye_opened.svg";

const Settings = () => {
  const [isSchoolKeyVisible, setIsSchoolKeyVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Password visibility state
  const [schoolKey, setSchoolKey] = useState("");
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useState({ schoolCode: "" });
  const [showConfirmPopup, setShowConfirmPopup] = useState(false); // Popup visibility state

  // const [originalUserInfo, setOriginalUserInfo] = useState(userInfo);
  // const [userEmail, setUserEmail] = useState(null);

  const navigate = useNavigate();
  const fetchUserInfo = async (email) => {
    try {
      const response = await fetch(`http://localhost:5000/profile/${email}`);
      if (!response.ok) {
        throw new Error("User not found");
      }
      const data = await response.json();
      setUserInfo(data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // setUserEmail(user.email);
        fetchUserInfo(user.email);
      } else {
        // setUserEmail(null);
      }
    });
  }, []);

  const handleChangeSchoolKey = () => {
    console.log("New School Key:", schoolKey);
    setSchoolKey("");
    setIsSchoolKeyVisible(false);
  };

  const handleChangePassword = () => {
    // Handle logic for changing the password
    console.log("New Password:", password);
    setPassword("");
    setIsPasswordVisible(false);
  };

  const handleDeleteAccount = async () => {
    const auth = getAuth();

    try {
      const user = auth.currentUser;
      if (user) {
        const userEmail = user.email;

        // Fetch user info to retrieve schoolCode
        const response = await fetch(
          `http://localhost:5000/profile/${userEmail}`
        );
        if (!response.ok) {
          throw new Error("User not found");
        }
        const userData = await response.json();
        const schoolCode = userData.schoolCode;

        if (schoolCode) {
          // Delete the Firebase Authentication account
          await deleteUser(user);
          console.log("User account deleted from Firebase Authentication.");

          alert("Your account has been deleted successfully.");
          navigate("/loginPage");
        } else {
          console.error("No schoolCode found for the user.");
        }
      } else {
        console.log("No authenticated user found.");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Error deleting account. Please try again later.");
    }
  };

  const handleLogout = () => {
    // Handle logout logic
    showSignOutAlert(navigate);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="p-4 m-20 mt-5 font-sans bg-[#ffffff] rounded-xl">
      <div className="mb-6 border rounded-xl bg-white shadow-sm">
        <button
          onClick={() => setIsSchoolKeyVisible(!isSchoolKeyVisible)}
          className="flex justify-between items-center w-full text-left text-black p-2 rounded-xl hover:bg-[#ffffffd4] focus:outline-none border bg-white shadow-md"
        >
          <span className="opacity-35">
            تغيير الرمز الحالي للمدرسة: {userInfo.schoolCode || "N/A"}
            {/* Display the fetched school code */}
          </span>
          <span>{isSchoolKeyVisible ? "▲" : "▼"}</span>
        </button>
        {isSchoolKeyVisible && (
          <div className="mt-2 p-4 shadow-sm">
            <input
              type="text"
              value={schoolKey}
              onChange={(e) => setSchoolKey(e.target.value)}
              placeholder="أدخل رمز المدرسة الجديد"
              className="shadow appearance-none border rounded-xl w-full py-2 px-4 bg-[#9d9d9d12] text-gray-700 leading-tight focus:outline focus:shadow-outline"
            />
            <button
              onClick={handleChangeSchoolKey}
              className="mt-2 w-1/4 shadow-lg shadow-cyan-500/50  bg-[#3BCAD3] hover:bg-[#3bc9d3ba] text-white font-bold p-2 rounded-3xl"
            >
              حفظ الرمز الجديد
            </button>
          </div>
        )}
      </div>
      <hr className="mt-2 mb-4 w-100 mx-auto border-t-1 border-gray-300" />

      <div className="mb-6 border rounded-xl bg-white shadow-sm">
        <button
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          className="flex justify-between items-center w-full text-left text-black p-2 rounded-xl hover:bg-[#ffffffd4] focus:outline-none border bg-white shadow-md"
        >
          <span className="opacity-35">تغيير كلمة المرور</span>
          <span>{isPasswordVisible ? "▲" : "▼"}</span>
        </button>
        {isPasswordVisible && (
          <div className="mt-2 p-4 relative">
            {/* Password Input */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Ensure this line is active
                className="shadow appearance-none border rounded-xl w-full py-2 px-4 text-gray-700 leading-tight focus:outline focus:shadow-outline"
                placeholder="أدخل كلمة المرور"
                style={{ backgroundColor: "#9d9d9d12" }}
                dir="rtl" // Set direction to right-to-left
              />
              <img
                src={showPassword ? hidePasswordIcon : showPasswordIcon}
                alt="toggle password visibility"
                className="absolute left-3 top-2 w-5 h-5 cursor-pointer opacity-50"
                onClick={togglePasswordVisibility}
              />
            </div>
            <button
              onClick={handleChangePassword}
              className="mt-2 w-1/4 shadow-lg shadow-cyan-500/50  bg-[#3BCAD3] hover:bg-[#3bc9d3ba] text-white font-bold p-2 rounded-3xl"
            >
              حفظ كلمة المرور
            </button>
          </div>
        )}
      </div>
      <hr className="mt-2 mb-4 w-100 mx-auto border-t-1 border-gray-300" />
      <div className="mb-4 flex items-center justify-between">
        <h5 className="text-sm font-normal mr-2 text-red-500">
          حذف الحساب سيؤدي إلى فقدان جميع البيانات المرتبطة به.
        </h5>
        <button
          onClick={() => setShowConfirmPopup(true)} // Show confirmation popup
          className="shadow-sm bg-red-500 text-white p-1.5 rounded hover:bg-red-600 focus:outline-none"
        >
          حذف الحساب
        </button>
      </div>
      {showConfirmPopup && (
        <ConfirmationPopup
          message="هل أنت متأكد أنك تريد حذف حسابك؟"
          onConfirm={() => {
            setShowConfirmPopup(false);
            handleDeleteAccount();
          }}
          onCancel={() => setShowConfirmPopup(false)}
        />
      )}

      <hr className="mt-2 mb-4 w-100 mx-auto border-t-1 border-gray-300" />

      <div className="mb-4 flex items-center justify-between">
        <h5 className="text-sm font-normal mr-2 text-red-500">
          تسجيل الخروج سيؤدي الى تحويلك الى صفحة تسجيل الدخول.
        </h5>{" "}
        <button
          onClick={handleLogout}
          className="shadow-sm bg-red-500 text-white p-1.5 rounded hover:bg-red-600 focus:outline-none"
        >
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
};

const SettingsPage = () => {
  return (
    <section
      dir="rtl"
      className="grid h-svh grid-rows-[5rem_1fr] grid-cols-[17rem_1fr] 2k:grid-cols-[19rem_1fr] fullhd:grid-cols-[19rem_1fr]"
    >
      <div className="bg-red-500">
        <SettingsNav />
      </div>
      <div className="col-start-1 row-start-1 row-end-3">
        <SettingsSideNav />
      </div>
      <div className="bg-[#F3F3F3] max-h-[100vh] overflow-y-auto">
        <h2 className="text-[20px] font-semibold font-cairo text-right pr-10 mt-6">
          تغيير الإعدادات الخاصة بمسؤول التطوع
        </h2>{" "}
        <hr className="mt-2 mb-6 w-11/12 mx-auto border-t-2 border-gray-300" />
        <Settings />
      </div>
    </section>
  );
};

export default SettingsPage;

// ConfirmationPopup Component
const ConfirmationPopup = ({ message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-xl shadow-md max-w-sm w-full text-center">
      <p className="text-lg mb-4 text-gray-700">{message}</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onConfirm}
          className="bg-red-500 text-white py-2 px-4 rounded-xl hover:bg-red-600 focus:outline-none"
        >
          تأكيد
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-400 focus:outline-none"
        >
          إلغاء
        </button>
      </div>
    </div>
  </div>
);
