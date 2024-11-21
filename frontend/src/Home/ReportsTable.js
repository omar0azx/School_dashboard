import React, { useEffect, useState } from "react";
import maleIcon from "../assets/avatar_male.svg";
import femaleIcon from "../assets/avatar_female.svg";
import { generateReport } from "../components/generateReport.js"; // Import report generator
import Loader from "../components/Loader"; // Import a Loader component

const ReportsTable = ({ searchQuery }) => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        // Get the logged-in email from localStorage
        const email = localStorage.getItem("userEmail");

        if (!email) {
          throw new Error("Email not found in local storage");
        }

        // Fetch opportunities from the backend using email
        const response = await fetch(
          `http://localhost:5000/opportunities?email=${encodeURIComponent(
            email
          )}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Error fetching opportunities");
        }

        const opportunitiesData = await response.json();

        // Handle response when no opportunities are found
        if (opportunitiesData.length === 0) {
          throw new Error("No opportunities found.");
        }

        setOpportunities(opportunitiesData);
      } catch (error) {
        console.error("Error fetching opportunities:", error);
      } finally {
        setLoading(false); // Ensure loading state is set to false
      }
    };

    fetchOpportunities();
  }, []);

  // Filter opportunities only if searchQuery is provided
  const displayedOpportunities =
    searchQuery.trim() === ""
      ? opportunities
      : opportunities.filter((opportunity) =>
          Object.values(opportunity).some((value) =>
            String(value).toLowerCase().includes(searchQuery.toLowerCase())
          )
        );

  const headers = [
    "",
    "اسم الطالب",
    "المستوى",
    "اسم الفرصة",
    "الساعات المكتسبة",
    "التاريخ",
    "التقرير",
  ];

  return loading ? (
    <Loader /> // Show the loader while data is being fetched
  ) : (
    <div className="mt-4 mx-20 bg-white px-4 pt-3 pb-4 rounded-3xl border border-gray-200 flex-1">
      <div className="max-h-64 lg:max-h-[75vh] overflow-y-auto">
        <table className="w-full text-[#718EBF] bg-white">
          <thead className="border-b-2 border-gray-300">
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="px-4 py-2">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayedOpportunities.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-5 font-semibold">
                  لا توجد فرص حالياً.
                </td>
              </tr>
            ) : (
              displayedOpportunities.map((opportunity, index) => (
                <tr
                  className="bg-white text-[#232323] border-b hover:bg-gray-100"
                  key={index}
                >
                  <td className="py-3">
                    <img
                      src={
                        opportunity.studentGender === "انثى"
                          ? femaleIcon
                          : maleIcon
                      }
                      alt={
                        opportunity.studentGender === "انثى"
                          ? "female student icon"
                          : "male student icon"
                      }
                    />{" "}
                  </td>
                  <td className="px-3 py-3">{opportunity.studentName}</td>
                  <td className="px-3 py-3">{opportunity.level}</td>
                  <td className="px-3 py-3">{opportunity.opportunityName}</td>
                  <td className="px-3 py-3">{opportunity.hour}</td>
                  <td className="px-3 py-3">{opportunity.date}</td>
                  <td className="px-4 py-3 flex justify-center items-center">
                    <button
                      className="shadow-lg shadow-[#23232355] bg-[#23232372] hover:bg-[#232323d2] text-white font-bold py-2 px-6 rounded-xl"
                      style={{
                        borderRadius: "15px",
                        transition: "all 0.1s ease-in-out",
                      }}
                      onClick={() => {
                        console.log("Opportunity:", opportunity);
                        generateReport(opportunity); // Pass opportunity for the report
                      }}
                    >
                      تنزيل
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsTable;
