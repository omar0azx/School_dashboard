import SideNav from "../components/sideNav.js";
import Nav from "../components/nav.js";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa"; // Import back icon

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
          className="flex items-center text-[#3BCAD3] text-2xl py-2 px-4 rounded focus:outline-none 
             hover:bg-[#3BCAD3] hover:text-white hover:shadow-lg transition-all duration-200"
        >
          <FaArrowRight className="mx-2" /> {/* Back Icon */}
          <span>العودة</span>
        </button>
      </div>

      {/* Student Name and Record Label */}
      <div className="text-center mt-4">
        <h2 className="text-2xl font-semibold">
          {student.name || "N/A"} {/* Display student name or "N/A" */}
        </h2>
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
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2">{opportunity}</td>
                    <td className="px-4 py-2">Unknown Organization</td>{" "}
                    {/* Placeholder for organization */}
                    <td className="px-4 py-2">0</td>{" "}
                    {/* Placeholder for earned hours */}
                    <td className="px-4 py-2">Unknown Date</td>{" "}
                    {/* Placeholder for date */}
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
