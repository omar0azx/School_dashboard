import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoSchool from "../assets/logo_Tatawei.svg";
import blueBackground from "../assets/blueBackground.svg";
import broIcon from "../assets/icon_bro.svg";
import lockIcon from "../assets/icon_lock.svg";
import emailIcon from "../assets/icon_email.svg";
import showPasswordIcon from "../assets/eye_closed.svg";
import hidePasswordIcon from "../assets/eye_opened.svg";
import school from "../assets/icon_school.svg";
import checkedGif from "../assets/verified.gif";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../firebase.js";

const SignUp = () => {
  return (
    <div className="flex h-screen bg-cyan-100">
      {/* Left Side */}
      <SignUpContent />
      {/* Right Side */}
      <div
        className="w-1/2 flex justify-center items-center"
        style={{
          backgroundImage: `url(${blueBackground})`,
        }}
      >
        <img src={LogoSchool} alt="Tatawei School Logo" className="w-1/2" />
      </div>
    </div>
  );
};

const SignUpContent = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [schoolCode, setSchoolCode] = useState("");
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Clear any previous error messages
    const auth = getAuth(app); // Get the auth instance

    // Validate required fields
    if (!email || !password || !name || !schoolCode) {
      setError("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    if (password !== confirmPassword) {
      setError("كلمات المرور غير متطابقة");
      return;
    }

    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          password, // Include password in the request
          schoolCode,
          uid: user.uid,
        }),
      });

      const data = await response.json(); // Ensure this is parsed as JSON

      if (!response.ok) {
        throw new Error(data.error || "Failed to create user in Firestore");
      }

      // Show success modal
      setShowSuccessModal(true);

      // Redirect to home page after 3 seconds
      setTimeout(() => {
        setShowSuccessModal(false);
        localStorage.setItem("userEmail", email);
        navigate("/HomePage");
      }, 5000);
    } catch (error) {
      // Handle errors
      let errorMessage = "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى لاحقًا";
      if (error.code === "auth/invalid-email") {
        errorMessage =
          "عنوان البريد الإلكتروني غير صحيح. يرجى إدخال بريد إلكتروني صحيح";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "يجب أن تتكون كلمة المرور من 6 أحرف وأرقام على الأقل";
      } else if (error.code === "auth/email-already-in-use") {
        errorMessage =
          "البريد الإلكتروني مستخدم بالفعل. يرجى استخدام بريد إلكتروني آخر";
      }
      setError(errorMessage);
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-1/2 bg-gradient-to-l from-cyan-50 to-blue-50 flex justify-center items-center">
      <div className="w-1/2 flex flex-col items-center p-4">
        <h1 className="text-3xl font-medium mb-8">إنشاء حساب</h1>
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="mb-4 relative">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded-2xl w-full py-2 px-4 pr-10 text-gray-700 leading-tight focus:outline focus:shadow-outline"
              placeholder="الإسم الكامل"
              style={{ backgroundColor: "#9d9d9d12" }}
              dir="rtl"
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
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())} // Convert email to lowercase
              className="shadow appearance-none border rounded-2xl w-full py-2 px-4 pr-10 text-gray-700 leading-tight focus:outline focus:shadow-outline"
              placeholder="البريد الالكتروني"
              style={{ backgroundColor: "#9d9d9d12" }}
              dir="rtl"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              className="absolute left-3 top-2 w-5 h-5 cursor-pointer opacity-50"
              onClick={togglePasswordVisibility}
            />
          </div>

          {/* Confirm Password Input */}
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} // Update confirm password state
              className="shadow appearance-none border rounded-2xl w-full py-2 px-4 pr-10 text-gray-700 leading-tight focus:outline focus:shadow-outline"
              placeholder="تأكيد كلمة المرور"
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
              className="absolute left-3 top-2 w-5 h-5 cursor-pointer opacity-50"
              onClick={togglePasswordVisibility}
            />
          </div>

          {/* School Key */}
          <div className="mb-4 relative">
            <input
              type="text"
              id="school"
              value={schoolCode}
              onChange={(e) => setSchoolCode(e.target.value)}
              className="shadow appearance-none border rounded-2xl w-full py-2 px-4 pr-10 text-gray-700 leading-tight focus:outline focus:shadow-outline"
              placeholder="رمز المدرسة"
              style={{ backgroundColor: "#9d9d9d12" }}
              dir="rtl"
            />
            <img
              src={school}
              alt="School icon"
              className="absolute right-3 top-2 w-5 h-5"
            />
          </div>

          {/* Display error message */}
          {error && (
            <p className="bg-red-100 text-red-700 border border-red-400 rounded-xl p-3 m-4 shadow-md text-center font-semibold text-sm">
              {error}
            </p>
          )}

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
            <Link to="/loginPage" className="underline text-[#747272] text-sm">
              <Link
                to="/loginPage"
                className="underline text-[#747272] text-sm"
              >
                تملك حساب بالفعل ؟{" "}
                <span className="text-[#3BCAD3]">تسجيل الدخول</span>
              </Link>
            </Link>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal
          title="!تم إنشاء الحساب"
          message=".سيتم تحويلك الى الصفحة الرئيسية"
          onClose={() => setShowSuccessModal(false)}
        />
      )}
    </div>
  );
};

export default SignUp;

const SuccessModal = ({ title, message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 w-76 rounded-xl shadow-lg flex flex-col items-center">
        {" "}
        {/* Adjusted width */}
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <img src={checkedGif} alt="Checked" className="mb-4 w-16" />
        <p className="mb-4">{message}</p>
        {/* Arabic success message */}
        <button
          className="mt-4 bg-red-500 text-white font-semibold py-2 px-4 rounded"
          onClick={onClose}
        >
          إغلاق
        </button>
      </div>
    </div>
  );
};
