import React, { useState, useEffect, useRef, useCallback } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import editProfileIcon from "../assets/icon_edit.svg";
import emailIcon from "../assets/icon_email.svg";
import phoneIcon from "../assets/icon_phone.svg";
import locationIcon from "../assets/icon_location.svg";
import profileHeader from "../assets/header_profile.svg";
import profileIcon from "../assets/icon_profile.svg";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });
  const [originalUserInfo, setOriginalUserInfo] = useState(userInfo);
  const [userEmail, setUserEmail] = useState(null);
  const modalRef = useRef(null);

  // Fetch user info based on email
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
        setUserEmail(user.email);
        fetchUserInfo(user.email);
      } else {
        setUserEmail(null);
      }
    });
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    setOriginalUserInfo(userInfo);
  };

  const handleSaveClick = async () => {
    try {
      setIsEditing(false);

      // Prepare the data to update, setting undefined values to null
      const updatedData = {
        name: userInfo.name !== undefined ? userInfo.name : null,
        phone: userInfo.phone !== undefined ? userInfo.phone : null,
        location: userInfo.location !== undefined ? userInfo.location : null,
      };

      // Send the updated data to your backend API using the current user's email
      const response = await fetch(`http://localhost:5000/updateProfile`, {
        method: "POST", // Use POST to update
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail, // Use the logged-in user's email
          ...updatedData, // Spread the updated data
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      const fullName = userInfo.name;
      const firstNameOnly = fullName.split(" ")[0];
      localStorage.setItem("userFirstName", firstNameOnly); // Store first name in localStorage

      // Optionally, fetch updated user info
      fetchUserInfo(userEmail);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleChange = (e) =>
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });

  const handleCloseClick = useCallback(() => {
    setIsEditing(false);
    setUserInfo(originalUserInfo);
  }, [originalUserInfo]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseClick();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleCloseClick]);

  return (
    <div className="w-full m-0 2k:w-[100%] fullhd:w-[100%] relative">
      <div className="relative w-full h-40 fullhd:h-60 2k:h-72">
        <img
          src={profileHeader}
          alt="Profile Header"
          className="w-full h-full object-cover"
        />
        <div className="w-32 h-32 fullhd:w-32 fullhd:h-32 2k:w-48 2k:h-48 bg-[#F3F3F3] rounded-full absolute -bottom-12 right-[230px] flex items-center justify-center">
          <img
            src={profileIcon}
            alt="Profile Icon"
            className="w-40 h-40 fullhd:w-40 fullhd:h-40 2k:w-48 2k:h-48 rounded-full"
          />
        </div>
      </div>

      <section className="grid grid-cols-2 mt-24 mr-36 ml-40 2k:ml-72 grid-rows-[5rem_1fr_1fr] fullhd:grid-rows-[5rem_1fr_1fr] 2k:grid-rows-[7rem_1fr_1fr]">
        <div className="col-start-1 col-end-3 flex justify-between ml-20">
          <h1 className="text-3xl fullhd:text-3xl 2k:text-[3rem] text-[#3f3f3f]">
            {userInfo.name}
          </h1>
          <img
            src={editProfileIcon}
            alt="edit Icon"
            className="w-7 h-7 fullhd:w-7 fullhd:h-7 2k:w-10 2k:h-10 text-[#3f3f3f] mt-[7px] cursor-pointer"
            onClick={handleEditClick}
          />
        </div>
        <section className="col-start-1 col-end-2 text-right border-l-[2px] border-[#3f3f3f] text-[#3f3f3f]">
          <div className="flex items-center mb-5">
            <img
              src={emailIcon}
              alt="Email"
              className="w-6 h-6 fullhd:w-6 fullhd:h-6 2k:w-8 2k:h-8 ml-2"
            />
            <span className="text-[1rem] fullhd:text-[1rem] 2k:text-[1.5rem] font-cairo">
              {userInfo.email}
            </span>
          </div>
          <div className="flex items-center mb-5">
            <img
              src={phoneIcon}
              alt="Phone"
              className="w-6 h-6 fullhd:w-6 fullhd:h-6 2k:w-8 2k:h-8 ml-2"
            />
            <span className="text-[1rem] fullhd:text-[1rem] 2k:text-[1.5rem] font-cairo">
              {userInfo.phone}
            </span>
          </div>
          <div className="flex items-center">
            <img
              src={locationIcon}
              alt="Location"
              className="w-6 h-6 fullhd:w-6 fullhd:h-6 2k:w-8 2k:h-8 ml-2"
            />
            <span className="text-[1rem] fullhd:text-[1rem] 2k:text-[1.5rem] font-cairo">
              {userInfo.location}
            </span>
          </div>
        </section>
      </section>

      {isEditing && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center"
          onClick={handleCloseClick}
        >
          <div
            className="bg-white p-8 rounded-3xl shadow-lg max-w-md w-full relative"
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-4 text-gray-500 hover:text-red-500"
              onClick={handleCloseClick}
            >
              ✕
            </button>
            <h2 className="text-2xl font-semibold mb-4">تغيير بيانات الحساب</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-[#3f3f3f] text-right font-sans text-lg font-semibold mb-1">
                  الإسم الكامل:
                </label>
                <input
                  type="text"
                  name="name"
                  value={userInfo.name}
                  onChange={handleChange}
                  placeholder="مثال: نواف محمد"
                  className="w-full border p-2 rounded-xl bg-[#9d9d9d12]"
                />
              </div>
              <div>
                <label className="block text-[#3f3f3f] text-right font-sans text-lg font-semibold mb-1">
                  البريد الإلكتروني:
                </label>
                <input
                  type="text"
                  name="email"
                  value={userInfo.email}
                  readOnly // Make email read-only
                  className="w-full border p-2 rounded-xl bg-[#9d9d9d12]"
                />
              </div>
              <div>
                <label className="block text-[#3f3f3f] text-right font-sans text-lg font-semibold mb-1">
                  رقم الجوال:{" "}
                </label>
                <input
                  type="text"
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleChange}
                  placeholder="********05"
                  className="w-full border p-2 rounded-xl bg-[#9d9d9d12]"
                />
              </div>
              <div>
                <label className="block text-[#3f3f3f] text-right font-sans text-lg font-semibold mb-1">
                  الموقع:
                </label>
                <input
                  type="text"
                  name="location"
                  value={userInfo.location}
                  onChange={handleChange}
                  placeholder="مثال: الرياض"
                  className="w-full border p-2 rounded-xl bg-[#9d9d9d12]"
                />
              </div>
              <button
                type="button"
                onClick={handleSaveClick}
                className="w-3/4 bg-[#3f3f3f] text-white py-2 rounded-xl transition-all duration-300 ease-in-out transform hover:bg-[#5a5a5a] hover:scale-105 hover:shadow-lg"
              >
                حفظ
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
