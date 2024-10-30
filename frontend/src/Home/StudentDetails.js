import SideNav from "../components/sideNav.js";
import Nav from "../components/nav.js";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa"; // Import back icon

const StudentDetails = () => {
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
        <StudentContent />
      </div>
    </section>
  );
};
export default StudentDetails;

function StudentContent() {
  const navigate = useNavigate();

  // Mock data for volunteering opportunities
  const opportunities = [
    {
      title: "Community Cleanup",
      organization: "Local Community Center",
      earnedHours: "5",
      date: "01/05/2023",
    },
    {
      title: "Food Drive",
      organization: "Charity Group",
      earnedHours: "8",
      date: "15/06/2023",
    },
    {
      title: "Tree Planting",
      organization: "Green Earth Initiative",
      earnedHours: "6",
      date: "22/07/2023",
    },
    // ...other opportunities
  ];

  const studentName = "Student Name";

  return (
    <div className="p-8 space-y-4">
      {/* Back Button with Icon */}
      <div className="flex justify-start">
        <button
          onClick={() => navigate("/HomePage")}
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
          {/* {studentName}  */}
          عمر عبدالله{" "}
        </h2>
      </div>

      {/* Volunteering Opportunities Table */}
      <div className="mt-4 mx-20 bg-white px-4 pt-3 pb-4 rounded-3xl border border-gray-200">
        <div className="max-h-64 lg:max-h-[75vh] overflow-y-auto">
          <table className="w-full text-[#718EBF] bg-white">
            <thead className="border-b-2 border-gray-300">
              <tr>
                <th className="px-4 py-2">الفرصة</th>
                <th className="px-4 py-2">المنظمة</th>
                <th className="px-4 py-2">الساعات المكتسبة</th>
                <th className="px-4 py-2">التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {opportunities.map((opportunity, index) => (
                <tr
                  key={index}
                  className="bg-white text-[#232323] border-b hover:bg-gray-100"
                >
                  <td className="px-4 py-3">{opportunity.title}</td>
                  <td className="px-4 py-3">{opportunity.organization}</td>{" "}
                  {/* New column for organization */}
                  <td className="px-4 py-3">{opportunity.earnedHours}</td>{" "}
                  {/* New column for earned hours */}
                  <td className="px-4 py-3">{opportunity.date}</td>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
