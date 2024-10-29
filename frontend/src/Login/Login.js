import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import emailIcon from "../assets/icon_email.svg";
import lockIcon from "../assets/icon_lock.svg";
import showPasswordIcon from "../assets/eye_closed.svg";
import hidePasswordIcon from "../assets/eye_opened.svg";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login successful!");
    navigate("/HomePage");
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset link sent!");
    // Additional logic to send reset link
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-1/2 bg-gradient-to-l from-cyan-50 to-blue-50 flex justify-center items-center">
      <div className="w-1/2 flex flex-col items-center p-4">
        <h1
          className="text-3xl font-medium mb-5"
          style={{ filter: "drop-shadow(12px 7px 8px rgba(0, 0, 0, 0.10))" }}
        >
          {isForgotPassword ? "إعادة تعيين كلمة المرور" : "تسجيل الدخول"}
        </h1>

        {/* Conditional rendering for welcome text */}
        {!isForgotPassword && (
          <h2
            className="text-xl font-medium mb-7"
            style={{ filter: "drop-shadow(12px 7px 8px rgba(0, 0, 0, 0.10))" }}
          >
            اهلًا بكم في <span className="text-[#3BCAD3]">تطوعي</span>
          </h2>
        )}

        {isForgotPassword ? (
          // Password Reset Form
          <form
            onSubmit={handleForgotPasswordSubmit}
            className="w-full max-w-sm"
          >
            <div className="mt-4 mb-8 relative">
              <input
                type="email"
                id="email"
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
            <button
              type="submit"
              className="shadow-lg shadow-cyan-500/50 bg-[#3BCAD3] hover:bg-[#3bc9d3ba] text-white font-bold py-2 px-6 rounded"
              style={{
                borderRadius: "15px",
                transition: "all 0.1s ease-in-out",
              }}
            >
              إرسال الرابط{" "}
            </button>
            <div className="mt-4 text-center">
              <button
                type="button"
                className="hover:scale-105 underline text-[#747272] text-sm"
                onClick={() => setIsForgotPassword(false)}
              >
                تسجيل الدخول
              </button>
            </div>
          </form>
        ) : (
          // Login Form
          <form onSubmit={handleLoginSubmit} className="w-full max-w-sm">
            <div className="mb-4 relative">
              <input
                type="input"
                id="username"
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
                className="absolute left-3 top-2 w-5 h-5 cursor-pointer opacity-50"
                onClick={togglePasswordVisibility}
              />
            </div>

            <div className="mb-4 text-left">
              <button
                type="button"
                className="text-left text-[#747272] text-sm hover:underline"
                onClick={() => setIsForgotPassword(true)}
              >
                هل نسيت كلمة المرور؟
              </button>
            </div>

            <div className="flex items-center justify-center mt-14">
              <button
                type="submit"
                className="shadow-lg shadow-cyan-500/50 bg-[#3BCAD3] hover:bg-[#3bc9d3ba] text-white font-bold py-2 px-6 rounded"
                style={{
                  borderRadius: "15px",
                  transition: "all 0.1s ease-in-out",
                }}
              >
                الدخول
              </button>
            </div>

            <div className="text-center mt-4">
              <Link
                to="/SignUpPage"
                className="underline text-[#747272] text-sm"
              >
                لاتملك حساب ؟ <span className="text-[#3BCAD3]">انشئ حساب</span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
// e.preventDefault();

// Create a FormData object and append the username and password
//   const formData = new FormData();
//   formData.append("username", username);
//   formData.append("password", password);

// Send POST request to FastAPI backend
// try {
//   const response = await fetch("http://localhost:8000/auth/token", {
//     method: "POST",
//     body: formData, // Send the formData object as the request body
//     credentials: "include", // Include credentials (cookies) with the request
//   });

//   if (response.ok) {
//     console.log("Login successful!");
//     // Navigate to HomePage
//     navigate("/HomePage");
//   } else {
//     console.error("Login failed!");
//     // Handle login failure (e.g., show an error message)
//   }
// } catch (error) {
//   console.error("Error during login:", error);
// }
// console.log("Email:", email);
// console.log("Password:", password);
// // Navigate to HomePage
// navigate("/HomePage");

//   return (
//     <div className="flex flex-col items-center p-4">
//       <h1 className="text-3xl font-medium mb-14">تسجيل الدخول</h1>
//       <form onSubmit={handleSubmit} className="w-full max-w-sm">
//         {/* Email Input */}
//         <div className="mb-4 relative">
//           <input
//             type="input"
//             id="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="shadow appearance-none border rounded w-full py-2 px-4 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             placeholder="البريد الالكتروني"
//             style={{ backgroundColor: "#F0EDFF" }}
//             dir="rtl" // Set direction to right-to-left
//           />
//           <img
//             src={broIcon}
//             alt="bro icon"
//             className="absolute right-3 top-2 w-5 h-5"
//           />
//         </div>

//         {/* Password Input */}
//         <div className="mb-4 relative">
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="shadow appearance-none border rounded w-full py-2 px-4 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             placeholder="كلمة المرور"
//             style={{ backgroundColor: "#F0EDFF" }}
//             dir="rtl" // Set direction to right-to-left
//           />
//           <img
//             src={lockIcon}
//             alt="lock icon"
//             className="absolute right-3 top-2 w-5 h-5"
//           />
//         </div>

//         {/* Forgot Password Link */}
//         <div className="mb-4">
//           <a
//             href="/forgot-password"
//             className="block text-left text-[#747272] text-sm"
//           >
//             هل نسيت كلمة المرور؟
//           </a>
//         </div>

//         {/* Submit Button */}
//         <div className="flex items-center justify-center mt-14">
//           <button
//             type="submit"
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
//             style={{ backgroundColor: "#53ADD4", borderRadius: "15px" }}
//           >
//             الدخول
//           </button>
//         </div>

//         {/* Sign Up Link */}
//         <div className="text-center mt-4">
//           <a href="/sign-up" className="underline text-[#747272] text-sm">
//             لاتملك حساب ؟ انشئ حساب
//           </a>
//         </div>
//       </form>
//     </div>
//   );
// };
