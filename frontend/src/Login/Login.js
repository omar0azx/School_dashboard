import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth"; // Import Firebase methods
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import app from "../firebase.js";
import emailIcon from "../assets/icon_email.svg";
import lockIcon from "../assets/icon_lock.svg";
import showPasswordIcon from "../assets/eye_closed.svg";
import hidePasswordIcon from "../assets/eye_opened.svg";
import Loader from "../components/Loader.js"; // Import the Loader component

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [error, setError] = useState(""); // State for error messages
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("يرجى إدخال بريدك الإلكتروني وكلمة المرور");
      return;
    }

    const auth = getAuth(app);
    const db = getFirestore(app); // Initialize Firestore

    try {
      setLoading(true); // Set loading to true

      // Step 1: Fetch the schools collection
      const schoolsCollection = collection(db, "schools");
      const schoolsSnapshot = await getDocs(schoolsCollection);

      let emailFound = false;

      // Step 2: Check each school's "school_officials" subcollection for the email
      for (const schoolDoc of schoolsSnapshot.docs) {
        const schoolOfficialsCollection = collection(
          schoolDoc.ref,
          "school_officials"
        );
        const officialQuery = query(
          schoolOfficialsCollection,
          where("email", "==", email)
        );
        const officialSnapshot = await getDocs(officialQuery);

        if (!officialSnapshot.empty) {
          emailFound = true;
          break;
        }
      }

      if (!emailFound) {
        setError("البريد الإلكتروني غير مصرح له بالدخول او غير صحيح");
        setLoading(false);
        return;
      }

      // If the email is found, proceed with Firebase Authentication login
      await signInWithEmailAndPassword(auth, email, password);
      console.log("تسجيل الدخول ناجح!");
      localStorage.setItem("userEmail", email);
      navigate("/HomePage");
    } catch (err) {
      setLoading(false); // Reset loading on error
      console.error("فشل تسجيل الدخول!", err);
      if (err.code === "auth/user-not-found") {
        setError(
          "لا يوجد مستخدم مسجل بهذا البريد الإلكتروني. يرجى التحقق من بريدك الإلكتروني أو التسجيل"
        );
      } else if (err.code === "auth/wrong-password") {
        setError(
          "كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى أو إعادة تعيين كلمة المرور"
        );
      } else if (err.code === "auth/invalid-email") {
        setError(
          "عنوان البريد الإلكتروني غير صحيح. يرجى إدخال بريد إلكتروني صحيح"
        );
      } else if (err.code === "auth/invalid-credential") {
        setError("يرجى التأكد من صحة بريدك الإلكتروني وكلمة المرور");
      } else {
        setError("حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى لاحقًا.");
      }
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();

    console.log("Attempting password reset for email:", email); // Debug log

    if (!email.trim()) {
      setError("يرجى إدخال بريد إلكتروني صالح.");
      return;
    }

    const auth = getAuth();

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(
        "تم إرسال بريد استعادة كلمة المرور. يرجى التحقق من بريدك الإلكتروني."
      );
      setError(""); // Clear any previous errors
    } catch (err) {
      console.error("Error in sendPasswordResetEmail:", err); // Log error details
      setMessage(""); // Clear any previous success message
      if (err.code === "auth/invalid-email") {
        setError("البريد الإلكتروني غير صالح.");
      } else if (err.code === "auth/user-not-found") {
        setError("لا يوجد مستخدم مرتبط بهذا البريد الإلكتروني.");
      } else {
        setError("حدث خطأ. حاول مرة أخرى.");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-1/2 bg-gradient-to-l from-cyan-50 to-blue-50 flex justify-center items-center">
      {loading ? ( // Show loader while loading
        <Loader />
      ) : (
        <div className="w-1/2 flex flex-col items-center p-4">
          <h1
            className="text-3xl font-medium mb-5"
            style={{
              filter: "drop-shadow(12px 7px 8px rgba(0, 0, 0, 0.10))",
            }}
          >
            {isForgotPassword ? "إعادة تعيين كلمة المرور" : "تسجيل الدخول"}
          </h1>

          {!isForgotPassword && (
            <h2
              className="text-xl font-medium mb-7"
              style={{
                filter: "drop-shadow(12px 7px 8px rgba(0, 0, 0, 0.10))",
              }}
            >
              اهلًا بكم في <span className="text-[#3BCAD3]">تطوعي</span>
            </h2>
          )}

          {isForgotPassword ? (
            <form
              onSubmit={handleForgotPasswordSubmit}
              className="w-full max-w-sm"
            >
              <div className="mt-4 mb-8 relative">
                <input
                  type="email"
                  id="email"
                  value={email} // Bind the email state
                  onChange={(e) => setEmail(e.target.value)} // Update the email state
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
              {message && (
                <p className="text-green-500 text-sm mb-4">{message}</p>
              )}
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
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
            <form onSubmit={handleLoginSubmit} className="w-full max-w-sm">
              <div className="mb-4 relative">
                <input
                  type="email" // Use type="email" for email input
                  id="username"
                  value={email} // Bind email state
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
              <div className="mb-4 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password} // Bind password state
                  onChange={(e) => setPassword(e.target.value)} // Update password state
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
              {/* Display error message */}

              {error && (
                <p className="bg-red-100 text-red-700 border border-red-400 rounded-xl p-3 m-4 shadow-md text-center font-semibold">
                  {error}
                </p>
              )}
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
                  لاتملك حساب ؟{" "}
                  <span className="text-[#3BCAD3]">انشئ حساب</span>
                </Link>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default Login;
