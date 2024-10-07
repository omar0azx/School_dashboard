import React, { useState } from "react";
import LogoSchool from "../assets/G123.svg";
import blueBackground from "../assets/Group_222.svg";
import broIcon from "../assets/bro.svg";
import lockIcon from "../assets/lock.svg";
import emailIcon from "../assets/email_icon.svg";
import showPasswordIcon from "../assets/closed_eye.svg";
import hidePasswordIcon from "../assets/opened_eye.svg";
import school from "../assets/ri--school-line.svg";

const SignUp = () => {
  return (
    <div className="flex h-screen" style={{ backgroundColor: "#F0FEFF" }}>
      {/* <BorderBeam /> */}
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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <div className="w-1/2 bg-white flex justify-center items-center">
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
              className="shadow appearance-none border rounded w-full py-2 px-4 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="الإسم الكامل"
              style={{ backgroundColor: "#e2f9ff" }}
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
              className="shadow appearance-none border rounded w-full py-2 px-4 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="البريد الالكتروني"
              style={{ backgroundColor: "#e2f9ff" }}
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
              className="shadow appearance-none border rounded w-full py-2 px-4 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="كلمة المرور"
              style={{ backgroundColor: "#e2f9ff" }}
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
              className="shadow appearance-none border rounded w-full py-2 px-4 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="تأكيد كلمة المرور"
              style={{ backgroundColor: "#e2f9ff" }}
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
              className="shadow appearance-none border rounded w-full py-2 px-4 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="رمز المدرسة"
              style={{ backgroundColor: "#e2f9ff" }}
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
              className=" bg-[#3BCAD3] hover:bg-[#3bc9d3ba] text-white font-bold py-2 px-6 rounded"
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
            <a href="/login" className="underline text-[#747272] text-sm">
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
