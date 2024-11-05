import SideNav from "../components/sideNav.js";
import Nav from "../components/nav.js";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa"; // Import back icon
import maleIcon from "../assets/avatar_male.svg";

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
  // Extract opportunities from the student object
  const opportunities = student.opportunities || []; // Get opportunities or default to an empty array

  return (
    <div className="p-8 space-y-4">
      {/* Back Button with Icon */}
      <div className="flex justify-start">
        <button
          onClick={() => navigate("/StudentPage")}
          className="flex items-center text-[#3BCAD3] text-xl py-2 px-4 rounded-2xl focus:outline-none 
             hover:bg-[#3BCAD3] hover:text-white hover:shadow-lg transition-all duration-200"
        >
          <FaArrowRight className="mx-2" /> {/* Back Icon */}
          <span>العودة</span>
        </button>
      </div>

      <hr className="mt-2 mb-6 w-11/12 mx-auto border-t-2 border-gray-300" />

      {/* Student Name and Report Button in Row */}
      <div className="flex justify-between items-center mt-4 mx-20">
        <div className="flex items-center mr-4">
          <img src={maleIcon} alt="male student icon" />
          <h2 className="text-2xl font-semibold mr-4">
            {student.name || "N/A"}
          </h2>
        </div>
        <div className="text-center">
          <button
            className="bg-gray-300 text-white font-semibold py-2 px-6 rounded-2xl cursor-not-allowed"
            title="التقرير النهائي"
            disabled
          >
            التقرير النهائي
          </button>
          <p className="text-red-500 mt-2 font-medium text-sm">
            لايوجد تقرير نهائي لعدم اكمال 40 ساعة
          </p>
        </div>
      </div>

      {/* Volunteering Opportunities Table */}
      <div className="mt-4 mx-20 bg-white px-4 pt-3 pb-4 rounded-3xl border border-gray-200">
        <div className="max-h-64 lg:max-h-[75vh] overflow-y-auto">
          <table className="w-full text-[#718EBF] bg-white">
            <thead className="border-b-2 border-gray-300">
              <tr>
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
                    <td className="px-4 py-2">{opportunity}</td>
                    <td className="px-4 py-2">Unknown Organization</td>{" "}
                    {/* Placeholder for organization */}
                    <td className="px-4 py-2">0</td>{" "}
                    {/* Placeholder for earned hours */}
                    <td className="px-4 py-2">Unknown Date</td>{" "}
                    {/* Placeholder for date */}
                    <td className="px-4 py-3 flex justify-center items-center">
                      <button
                        className="shadow-lg shadow-[#23232355] bg-[#23232372] hover:bg-[#232323d2] text-white font-bold py-2 px-6 rounded-xl"
                        style={{
                          borderRadius: "15px",
                          transition: "all 0.1s ease-in-out",
                        }}
                      >
                        تنزيل
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-3">
                    لا توجد فرص تطوعية
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
