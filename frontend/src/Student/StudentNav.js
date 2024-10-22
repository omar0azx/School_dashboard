import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { showSignOutAlert } from "../components/sideNav.js";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Create a ref for the dropdown

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    // Perform any logout operations here
    showSignOutAlert(navigate);
  };

  // Close dropdown if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false); // Close the dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <nav className="grid grid-cols-3 items-center h-20 bg-white shadow-md px-6">
      <div className="flex justify-start">
        <span className="text-[25px] font-semibold text-black font-cairo">
          إدارة الطلاب
        </span>
      </div>
      <div className="flex justify-center relative w-full max-w-md">
        <input
          type="text"
          placeholder="بحث..."
          className="w-full h-10 pl-10 pr-4 py-2 border border-gray-500 rounded-full focus:outline-none focus:ring focus:border-gray-300 bg-[#dfdfdf5e]"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.1042 0.125C10.3084 0.125 8.58624 0.838353 7.31646 2.10813C6.04669 3.37791 5.33333 5.1001 5.33333 6.89583C5.33333 8.57292 5.94792 10.1146 6.95833 11.3021L6.67708 11.5833H5.85417L0.645832 16.7917L2.20833 18.3542L7.41667 13.1458V12.3229L7.69792 12.0417C8.9267 13.0901 10.4889 13.6662 12.1042 13.6667C13.8999 13.6667 15.6221 12.9533 16.8919 11.6835C18.1616 10.4138 18.875 8.69157 18.875 6.89583C18.875 5.1001 18.1616 3.37791 16.8919 2.10813C15.6221 0.838353 13.8999 0.125 12.1042 0.125ZM12.1042 2.20833C14.7083 2.20833 16.7917 4.29167 16.7917 6.89583C16.7917 9.5 14.7083 11.5833 12.1042 11.5833C9.5 11.5833 7.41667 9.5 7.41667 6.89583C7.41667 4.29167 9.5 2.20833 12.1042 2.20833Z"
            fill="#6A6A6A"
          />
        </svg>
      </div>

      <div className="flex items-center justify-end relative">
        <svg
          className="w-10 h-10 ml-3"
          viewBox="0 0 45 45"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.5 0C10.08 0 0 10.08 0 22.5C0 34.92 10.08 45 22.5 45C34.92 45 45 34.92 45 22.5C45 10.08 34.92 0 22.5 0ZM22.5 9C26.8425 9 30.375 12.5325 30.375 16.875C30.375 21.2175 26.8425 24.75 22.5 24.75C18.1575 24.75 14.625 21.2175 14.625 16.875C14.625 12.5325 18.1575 9 22.5 9ZM22.5 40.5C17.9325 40.5 12.5325 38.655 8.685 34.02C12.4875 31.05 17.28 29.25 22.5 29.25C27.72 29.25 32.5125 31.05 36.315 34.02C32.4675 38.655 27.0675 40.5 22.5 40.5Z"
            fill="#6A6A6A"
          />
        </svg>

        <button onClick={toggleDropdown} className="focus:outline-none ">
          <h3 className="text-[18px] font-semibold text-black font-cairo cursor-pointer transition-all duration-300 ease-in-out hover:scale-105">
            أهلًا أ.نواف,
          </h3>
        </button>

        {dropdownOpen && (
          <div
            ref={dropdownRef} // Attach the ref to the dropdown
            className="absolute top-full mt-2 w-48 bg-white border border-gray-300 rounded shadow z-10"
          >
            <Link
              to="/ProfilePage"
              onClick={() => setDropdownOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 font-cairo text-[20px]"
            >
              معلومات شخصية
            </Link>
            <hr />
            <Link
              onClick={handleLogout}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 font-cairo text-[20px]"
            >
              خروج
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
