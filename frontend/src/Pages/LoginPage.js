// import React, { useState } from "react";
import Login from "../Login/Login.js";
// import SignUp from "../Login/SignUp.js";
import blueBackground from "../assets/Group_222.svg";
import LogoSchool from "../assets/G123.svg";

// import DawaiWhite from "../assets/DawaiWhite.svg";

// const LoginPage = () => {
//   const [isLogin, setIsLogin] = useState(true);

//   const showLogin = () => setIsLogin(true);
//   const showSignIn = () => setIsLogin(false);

//   return (
//     <div className="flex h-screen">
//       {/* Left Side */}
//       <div className="w-1/2 bg-white flex justify-center items-center">
//         {<LoginPage />}
//       </div>
//       {/* Right Side */}
//       <div
//         className="w-1/2 flex justify-center items-center"
//         style={{
//           //   backgroundImage: `url(${blueBackground})`,
//           backgroundSize: "cover",
//         }}
//       >
//         {/* <img src={DawaiWhite} alt="Dawai White" className="w-1/2" /> */}
//       </div>
//     </div>
//   );
// };

function LoginPage() {
  return (
    <div className="flex h-screen bg-cyan-100">
      {/* Left Side */}
      <Login />
      {/* <SignUp /> */}

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
}
export default LoginPage;
