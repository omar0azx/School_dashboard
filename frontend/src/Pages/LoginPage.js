// import React, { useState } from "react";
import Login from "../Login/Login.js";
import blueBackground from "../assets/blueBackground.svg";
import LogoSchool from "../assets/logo_Tatawei.svg";

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
