import React, { useState } from "react";
import LogoSchool from "../assets/logo_Tatawei.svg";
import blueBackground from "../assets/blueBackground.svg";
import broIcon from "../assets/icon_bro.svg";
import lockIcon from "../assets/icon_lock.svg";
import emailIcon from "../assets/icon_email.svg";
import showPasswordIcon from "../assets/eye_closed.svg";
import hidePasswordIcon from "../assets/eye_opened.svg";
import school from "../assets/icon_school.svg";

const SignUp = () => {
  return (
    <div className="flex h-screen bg-cyan-100">
      {/* Left Side */}
      <SignUpContent />
      {/* Right Side */}
      <div
        className="w-1/2 flex justify-center items-center"
        style={{
          //   backgroundColor: "#F0FEFF",
          backgroundImage: `url(${blueBackground})`,
          //   backgroundSize: "cover",
        }}
      >
        {/* <h1>Login Page - 2</h1> */}
        {/* <div
            className="w-1/2 flex justify-center items-center"
            style={{
              backgroundImage: `url(${blueBackground})`,
              backgroundSize: "cover",
            }}
          ></div> */}
        <img src={LogoSchool} alt="Tatawei School Logo" className="w-1/2" />
      </div>
    </div>
  );
};

const SignUpContent = () => {
  const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // const toggleConfirmPasswordVisibility = () => {
  //   setShowConfirmPassword(!showConfirmPassword);
  // };
  return (
    <div className="w-1/2 bg-gradient-to-l from-cyan-50 to-blue-50 flex justify-center items-center">
      <div className="w-1/2flex flex-col items-center p-4">
        <h1 className="text-3xl font-medium mb-8">إنشاء حساب</h1>
        <form className="w-full max-w-sm">
          {/* Name Input */}
          <div className="mb-4 relative">
            <input
              type="name"
              id="name"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded-2xl w-full py-2 px-4 pr-10 text-gray-700 leading-tight focus:outline focus:shadow-outline"
              placeholder="الإسم الكامل"
              style={{ backgroundColor: "#9d9d9d12" }}
              dir="rtl" // Set direction to right-to-left
            />
            <img
              src={broIcon}
              alt="bro icon"
              className="absolute right-3 top-2 w-5 h-5"
            />
          </div>
          {/* Email Input */}
          <div className="mb-4 relative">
            <input
              type="email"
              id="email"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded-2xl w-full py-2 px-4 pr-10 text-gray-700 leading-tight focus:outline focus:shadow-outline"
              placeholder="البريد الالكتروني"
              style={{ backgroundColor: "#9d9d9d12" }}
              dir="rtl" // Set direction to right-to-left
            />
            <img
              src={emailIcon}
              alt="email icon"
              className="absolute right-3 top-2 w-5 h-5"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="shadow appearance-none border rounded-2xl w-full py-2 px-4 pr-10 text-gray-700 leading-tight focus:outline focus:shadow-outline"
              placeholder="كلمة المرور"
              style={{ backgroundColor: "#9d9d9d12" }}
              dir="rtl"
            />
            <img
              src={lockIcon}
              alt="lock icon"
              className="absolute right-3 top-2 w-5 h-5"
            />
            <img
              src={showPassword ? hidePasswordIcon : showPasswordIcon}
              alt="toggle password visibility"
              className="absolute left-3 top-2 w-5 h-5 cursor-pointer opacity-50 "
              onClick={togglePasswordVisibility}
            />
          </div>

          {/* Confirm Password Input */}
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              id="confirm-password"
              // value={confirmPassword}
              // onChange={(e) => setConfirmPassword(e.target.value)}
              className="shadow appearance-none border rounded-2xl w-full py-2 px-4 pr-10 text-gray-700 leading-tight focus:outline focus:shadow-outline"
              placeholder="تأكيد كلمة المرور"
              style={{ backgroundColor: "#9d9d9d12" }}
              dir="rtl" // Set direction to right-to-left
            />
            <img
              src={lockIcon}
              alt="lock icon"
              className="absolute right-3 top-2 w-5 h-5"
            />
            <img
              src={showPassword ? hidePasswordIcon : showPasswordIcon}
              alt="toggle password visibility"
              className="absolute left-3 top-2 w-5 h-5 cursor-pointer opacity-50 "
              onClick={togglePasswordVisibility}
            />
          </div>

          {/* School Key */}
          <div className="mb-4 relative">
            <input
              type="School"
              id="School"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded-2xl w-full py-2 px-4 pr-10 text-gray-700 leading-tight focus:outline focus:shadow-outline"
              placeholder="رمز المدرسة"
              style={{ backgroundColor: "#9d9d9d12" }}
              dir="rtl" // Set direction to right-to-left
            />
            <img
              src={school}
              alt="School icon"
              className="absolute right-3 top-2 w-5 h-5"
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-center mt-14">
            <button
              type="submit"
              className="shadow-lg shadow-cyan-500/50 bg-[#3BCAD3] hover:bg-[#3bc9d3ba] text-white font-bold py-2 px-6 rounded"
              style={{
                borderRadius: "15px",
                transition: "all 0.1s ease-in-out",
              }}
            >
              إنشاء حساب
            </button>
          </div>

          {/* Already Have Account Link */}
          <div className="text-center mt-4">
            <a href="/loginPage" className="underline text-[#747272] text-sm">
              تملك حساب بالفعل ؟{" "}
              <span className="text-[#3BCAD3]">تسجيل الدخول</span>
            </a>
          </div>
        </form>
        {/* Right Side */}
      </div>
    </div>
  );
};

export default SignUp;
