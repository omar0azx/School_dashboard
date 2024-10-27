import React, { useState } from "react";
import SettingsSideNav from "../components/sideNav.js";
import SettingsNav from "../components/nav.js";
import { showSignOutAlert } from "../components/sideNav.js";
import { useNavigate } from "react-router-dom";

import showPasswordIcon from "../assets/eye_closed.svg";
import hidePasswordIcon from "../assets/eye_opened.svg";

const Settings = () => {
  const [isSchoolKeyVisible, setIsSchoolKeyVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Password visibility state
  const [schoolKey, setSchoolKey] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleChangeSchoolKey = () => {
    // Handle logic for changing the school key
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

  const handleDeleteAccount = () => {
    // Handle logic for deleting the account
    console.log("Account Deleted");
  };

  const handleLogout = () => {
    // Handle logout logic
    showSignOutAlert(navigate);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="p-4 m-20 mt-5 font-sans bg-[#FFFDFA] rounded-xl">
      <div className="mb-6 border rounded-xl bg-white shadow-sm">
        <button
          onClick={() => setIsSchoolKeyVisible(!isSchoolKeyVisible)}
          className="flex justify-between items-center w-full text-left text-black p-2 rounded-xl hover:bg-[#ffffffd4] focus:outline-none border bg-white shadow-md"
        >
          <span className="opacity-35">تغيير رمز المدرسة</span>
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
          onClick={handleDeleteAccount}
          className="shadow-sm bg-red-500 text-white p-1.5 rounded hover:bg-red-600 focus:outline-none"
        >
          حذف الحساب
        </button>
      </div>
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
          الإعدادات
        </h2>{" "}
        <hr className="mt-2 mb-6 w-11/12 mx-auto border-t-2 border-gray-300" />
        <Settings />
      </div>
    </section>
  );
};

export default SettingsPage;
