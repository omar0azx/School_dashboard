import SideNav from "../components/sideNav.js";
import Nav from "../components/nav.js";
import Loader from "../components/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa"; // Import back icon
import maleIcon from "../assets/avatar_male.svg";
import { useEffect, useState } from "react";
import {
  collectionGroup,
  getFirestore,
  query,
  where,
  getDocs,
} from "firebase/firestore"; // Import Firestore methods
import { getStorage, ref, getDownloadURL } from "firebase/storage"; // Import Storage functions
import { finalReportGen } from "../components/finalReportGen.js";
import DownloadIcon from "../assets/icon_download_file.svg";

const StudentDetails = () => {
  const location = useLocation();
  const student = location.state?.student || {}; // Get the student data passed from the AllStudentsTable
  const navigate = useNavigate();

  return (
    <section
      dir="rtl"
      className="grid h-svh grid-rows-[5rem_1fr] grid-cols-[17rem_1fr] 2k:grid-cols-[19rem_1fr] fullhd:grid-cols-[19rem_1fr]"
    >
      <div className="bg-red-500">
        <Nav />
      </div>
      <div className="col-start-1 row-start-1 row-end-3 bg-black w-full">
        <SideNav />
      </div>
      <div className="bg-[#F3F3F3] max-h-[100vh] overflow-y-auto">
        <StudentContent student={student} navigate={navigate} />
      </div>
    </section>
  );
};

export default StudentDetails;

function StudentContent({ student, navigate }) {
  const [opportunities, setOpportunities] = useState([]);
  const [imageUrls, setImageUrls] = useState({}); // State to store organization image URLs
  const db = getFirestore(); // Firestore instance
  const storage = getStorage(); // Firebase storage instance
  const [loading, setLoading] = useState(true); // Loading state
  const [displayedProgress, setDisplayedProgress] = useState(0); // Track the animated progress bar

  useEffect(() => {
    const fetchOpportunities = async () => {
      if (
        student.opportunities &&
        Object.keys(student.opportunities).length > 0
      ) {
        try {
          // Extract the opportunity IDs from the keys of the opportunities map
          const opportunityIds = Object.keys(student.opportunities);

          const opportunitiesQuery = query(
            collectionGroup(db, "opportunities"),
            where("id", "in", opportunityIds), // Use opportunity IDs from the keys
            where("status", "==", "finished")
          );

          const querySnapshot = await getDocs(opportunitiesQuery);
          const fetchedOpportunities = querySnapshot.docs.map((doc) =>
            doc.data()
          );

          const imageUrls = {};
          for (const opportunity of fetchedOpportunities) {
            if (opportunity.organizationID) {
              const imageRef = ref(
                storage,
                `organisations_icons/${opportunity.organizationID}.jpg`
              );

              try {
                const url = await getDownloadURL(imageRef);
                imageUrls[opportunity.organizationID] = url;
              } catch (error) {
                console.error("Error fetching image URL:", error);
              }
            }
          }

          setImageUrls(imageUrls);
          setOpportunities(fetchedOpportunities);
        } catch (error) {
          console.error("Error fetching opportunities:", error);
        } finally {
          setLoading(false); // Data has been fetched, stop loading
        }
      } else {
        setLoading(false); // No opportunities, stop loading
      }
    };

    fetchOpportunities();
  }, [student.opportunities, db, storage]);
  const handleGenerateReport = () => {
    finalReportGen(student, opportunities);
  };
  // Calculate progress dynamically
  const totalHoursRequired = 40;
  const progressPercentage =
    student.hoursCompleted && totalHoursRequired
      ? Math.min((student.hoursCompleted / totalHoursRequired) * 100, 100)
      : 0;

  // Animate progress bar
  useEffect(() => {
    const animateProgress = () => {
      if (displayedProgress < progressPercentage) {
        setDisplayedProgress((prev) => Math.min(prev + 1, progressPercentage)); // Increment progress
      }
    };

    // Use setInterval to animate the progress
    const interval = setInterval(animateProgress, 30); // Controls the speed of the animation

    // Clear interval when animation completes
    if (displayedProgress >= progressPercentage) {
      clearInterval(interval);
    }

    // Cleanup on component unmount or when progressPercentage changes
    return () => clearInterval(interval);
  }, [progressPercentage, displayedProgress]);

  // Function to create the circular progress bar (SVG)
  const CircularProgressBar = ({ progress, hoursCompleted }) => {
    const radius = 35; // Radius of the circle
    const strokeWidth = 6; // Stroke width of the circle
    const circumference = 2 * Math.PI * radius; // Total circumference of the circle
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    // Rotate the circle to start from the top (12 o'clock position)
    const rotation = -90; // Rotate counterclockwise by 90 degrees to start from the top

    return (
      <svg width="90" height="90" className="transform rotate-0">
        {/* Background circle */}
        <circle
          cx="45"
          cy="45"
          r={radius}
          stroke="#e6e6e6"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle with gradient and shadow */}
        <circle
          cx="45"
          cy="45"
          r={radius}
          stroke="url(#gradient)" // Apply gradient for dynamic color
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transition="stroke-dashoffset 1s ease"
          transform={`rotate(${rotation} 45 45)`} // Apply rotation here
          className="shadow-xl" // Add shadow effect
        />
        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3BCAD3" />
            <stop offset="100%" stopColor="#6d98c1" />
          </linearGradient>
        </defs>
        {/* Progress text */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy="7px"
          fontSize="16"
          fontWeight="600" // Semibold
          fill="#333" // Darker text for better contrast
        >
          {hoursCompleted > 40 ? hoursCompleted : `${hoursCompleted} / 40`}
        </text>
      </svg>
    );
  };

  return (
    <div className="p-8 space-y-4">
      {/* Back Button */}
      <div className="flex justify-start">
        <button
          onClick={() => navigate("/StudentPage")}
          className="flex items-center text-[#3BCAD3] text-xl py-2 px-4 rounded-2xl focus:outline-none 
             hover:bg-[#3BCAD3] hover:text-white hover:shadow-lg transition-all duration-200"
        >
          <FaArrowRight className="mx-2" />
          <span>العودة</span>
        </button>
      </div>

      <hr className="mt-2 mb-6 w-11/12 mx-auto border-t-2 border-gray-300" />

      {/* Student Name and Report Button */}
      <div className="flex justify-between items-center mt-4 mx-20">
        <div className="flex items-center mr-4">
          <img src={maleIcon} alt="male student icon" />
          <h2 className="text-2xl font-semibold mr-4">
            {student.name || "N/A"}
          </h2>
        </div>

        {/* Circular Progress Bar */}
        <div className="flex flex-col items-center justify-center mx-4">
          {student.hoursCompleted >= 40 && student.hoursCompleted <= 50 ? (
            <div className="text-green-500 flex flex-col items-center justify-center">
              {/* Check Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <circle cx="8" cy="8" r="8" fill="currentColor" />
                <path
                  fill="#fff"
                  d="M12.146 5.854a.5.5 0 0 1 0 .707l-4.5 4.5a.5.5 0 0 1-.707 0l-2-2a.5.5 0 1 1 .707-.707l1.646 1.647 4.146-4.147a.5.5 0 0 1 .707 0z"
                />
              </svg>

              <p className="font-medium text-sm mt-2">
                تم إكمال 40 ساعة تطوعية!
              </p>
            </div>
          ) : (
            <>
              <CircularProgressBar
                progress={displayedProgress}
                hoursCompleted={student.hoursCompleted || 0}
              />
              <p className="font-medium text-sm">ساعة تطوعية</p>
            </>
          )}
        </div>

        <div className="text-center">
          <div className="text-center w-full px-4">
            <button
              className={`${
                student.hoursCompleted >= 40
                  ? "w-full bg-[#3BCAD3] text-white p-2 mt-3 rounded-xl transition-all duration-300 ease-in-out transform hover:bg-[#3bc9d3ba] hover:scale-105 hover:shadow-lg"
                  : "w-full bg-gray-300 text-gray-500 p-2 mt-3 rounded-xl cursor-not-allowed opacity-50"
              } flex items-center justify-center`}
              title="التقرير النهائي"
              onClick={
                student.hoursCompleted >= 40 ? handleGenerateReport : null
              }
              disabled={student.hoursCompleted < 40}
            >
              التقرير النهائي
              <img
                src={DownloadIcon}
                alt="Download Icon"
                className="w-5 h-5 mr-2"
              />
            </button>
          </div>

          {/* Conditionally render the message if hoursCompleted is less than 40 */}
          {student.hoursCompleted < 40 && (
            <p className="text-red-500 mt-2 font-medium text-sm">
              لايوجد تقرير نهائي لعدم اكمال 40 ساعة
            </p>
          )}
        </div>
      </div>

      {/* Volunteering Opportunities Table */}
      {loading ? (
        <Loader />
      ) : (
        <div className="mt-4 mx-20 bg-white px-4 pt-3 pb-4 rounded-3xl border border-gray-200">
          <div className="max-h-64 lg:max-h-[75vh] overflow-y-auto">
            <table className="w-full text-[#718EBF] bg-white">
              <thead className="border-b-2 border-gray-300">
                <tr>
                  <th className=""></th>
                  <th className="px-4 py-2">اسم الفرصة</th>
                  <th className="px-4 py-2">الجهة</th>
                  <th className="px-4 py-2">الساعات المكتسبة</th>
                  <th className="px-4 py-2">التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {opportunities.length > 0 ? (
                  opportunities.map((opportunity, index) => (
                    <tr key={index} className="border-b hover:bg-gray-100">
                      <td className="">
                        {imageUrls[opportunity.organizationID] ? (
                          <img
                            src={imageUrls[opportunity.organizationID]}
                            alt={opportunity.organizationName}
                            className="w-12 h-12 object-cover rounded-full"
                          />
                        ) : (
                          <span>Image not available</span>
                        )}
                      </td>
                      <td className="px-4 py-2">{opportunity.name || "N/A"}</td>
                      <td className="px-4 py-2">
                        {opportunity.organizationName || "N/A"}
                      </td>
                      <td className="px-4 py-2">
                        {opportunity.hour || "N/A"} س
                      </td>
                      <td className="px-4 py-2">{opportunity.date || "N/A"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      لا توجد فرص تطوعية
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
