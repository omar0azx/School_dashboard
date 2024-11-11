import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // Import db from firebase.js
import { collection, getDocs, query, where } from "firebase/firestore";
import Opp_Icon from "../assets/icon_opp_card.svg";
import Stu_Icon from "../assets/icon_student_card.svg";
import Hours_Icon from "../assets/icon_hours_card.svg";

const Cards = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [schoolCode, setSchoolCode] = useState(null);

  // Get logged-in user's email from localStorage
  const loggedInEmail = localStorage.getItem("userEmail");

  // Fetch school code based on logged-in email
  useEffect(() => {
    const fetchSchoolCode = async () => {
      if (loggedInEmail) {
        // Query the `schools` collection
        const schoolsRef = collection(db, "schools");
        const querySnapshot = await getDocs(schoolsRef);

        let foundSchoolCode = null;

        // Iterate over all the schools and check the `school_officials` subcollection
        querySnapshot.forEach(async (doc) => {
          const schoolCode = doc.id; // Get the school code (document ID)
          const schoolOfficialsRef = collection(
            db,
            "schools",
            schoolCode,
            "school_officials"
          );
          const q = query(
            schoolOfficialsRef,
            where("email", "==", loggedInEmail)
          );

          const officialsSnapshot = await getDocs(q);

          if (!officialsSnapshot.empty) {
            console.log(
              "Found school for email:",
              loggedInEmail,
              "School Code:",
              schoolCode
            );
            foundSchoolCode = schoolCode; // Set the school code
            setSchoolCode(schoolCode); // Update state
          }
        });

        if (!foundSchoolCode) {
          console.log("No school found for email:", loggedInEmail);
        }
      }
    };

    fetchSchoolCode();
  }, [loggedInEmail]);

  // Fetch student count for the current school code, where `isStudentAccepted = 1`
  useEffect(() => {
    console.log("schoolCode:", schoolCode); // Log the schoolCode value
    const fetchStudentCount = async () => {
      if (schoolCode) {
        const studentsRef = collection(db, "schools", schoolCode, "students");
        const q = query(studentsRef, where("isStudentAccepted", "==", 1)); // Add the condition for accepted students
        const querySnapshot = await getDocs(q);
        console.log("Number of Accepted Students:", querySnapshot.size); // Log accepted student count
        setStudentCount(querySnapshot.size);
      }
    };

    if (schoolCode) {
      fetchStudentCount();
    } else {
      console.log("Waiting for schoolCode to be set...");
    }
  }, [schoolCode]);

  return (
    <div className="flex gap-4 p-4">
      {/* Volunteering Hours Card */}
      <div className="bg-[#FFE8E4] rounded-3xl drop-shadow-md m-3 p-5 flex-1 border border-gray-200 flex items-center justify-center text-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md">
        <div className="rounded-full h-16 w-16 flex items-center justify-center">
          <img src={Hours_Icon} alt="Hours Icon" className="w-7/12" />
        </div>
        <div className="pl-4 text-center">
          <span className="text-xl text-[#232323] font-bold">
            <span>1,250+</span>
            <br />
            ساعة تطوعية
          </span>
          <div className="flex items-center justify-center">
            <strong className="text-sm text-gray-700 font-light">
              العدد الإجمالي للساعات التطوعية.
            </strong>
          </div>
        </div>
      </div>

      {/* Students Card */}
      <div className="bg-[#FFF9E6] rounded-3xl drop-shadow-md m-3 p-5 flex-1 border border-gray-200 flex items-center justify-center text-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md">
        <div className="rounded-full h-16 w-16 flex items-center justify-center mb-4">
          <img src={Stu_Icon} alt="Student Icon" className="w-7/12" />
        </div>
        <div className="pl-4 text-center">
          <span className="text-xl text-[#232323] font-bold">
            <span>{studentCount > 0 ? studentCount : "0"}+</span>
            <br />
            طالب متطوع
          </span>
          <div className="flex items-center justify-center">
            <strong className="text-sm text-gray-700 font-light">
              العدد الإجمالي للطلاب المتطوعين.
            </strong>
          </div>
        </div>
      </div>

      {/* Opportunities Card */}
      <div className="bg-[#E8FCFB] rounded-3xl drop-shadow-md m-3 p-5 flex-1 border border-gray-200 flex items-center justify-center text-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md">
        <div className="rounded-full h-16 w-16 flex items-center justify-center m-2">
          <img src={Opp_Icon} alt="Opp Icon" className="w-7/12" />
        </div>
        <div className="pl-4 text-center">
          <span className="text-xl text-[#232323] font-bold">
            <span>1,250+</span>
            <br />
            فرصة تطوعية
          </span>
          <div className="flex items-center justify-center">
            <strong className="text-sm text-gray-700 font-light">
              العدد الإجمالي للفرص التطوعية.
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
