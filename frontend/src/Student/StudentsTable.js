import { useState } from "react";
import maleIcon from "../assets/avatar_male.svg";

const StudentsTable = () => {
  // Table headers
  const headers = [
    "",
    "اسم الطالب",
    "المستوى",
    "البريد الإلكتروني",
    "رقم الجوال",
    "",
    "",
  ];

  const rows = [
    ["محمد أحمد", "الثالث", "hind.saeed@example.com", "0554433221", "", ""],
    ["أحمد علي", "الثاني", "ahmed.ali@example.com", "0551234567", "", ""],
    ["سعيد محمد", "الرابع", "mohamed.ahmed@example.com", "0557654321", "", ""],
    ["علي سعيد", "الأول", "sara.mohammed@example.com", "0559876543", "", ""],
    ["خالد سالم", "الثالث", "fatima.hassan@example.com", "0556543210", "", ""],
    ["نواف حسن", "الثاني", "khaled.salem@example.com", "0554321098", "", ""],
    ["محمد أحمد", "الثالث", "ali.saeed@example.com", "0553210987", "", ""],
    ["أحمد علي", "الثاني", "reem.abdullah@example.com", "0558765432", "", ""],
    ["سعيد محمد", "الرابع", "nora.youssef@example.com", "0555678901", "", ""],
    ["علي سعيد", "الأول", "abdullah.khaled@example.com", "0550987654", "", ""],
    ["خالد سالم", "الثالث", "ameera.hassan@example.com", "0552345678", "", ""],
    ["نواف حسن", "الثاني", "youssef.ahmed@example.com", "0553456789", "", ""],
    [
      "محمد أحمد",
      "الثالث",
      "salman.abdullah@example.com",
      "0554567890",
      "",
      "",
    ],
    ["أحمد علي", "الثاني", "layla.mahmoud@example.com", "0555678902", "", ""],
    ["سعيد محمد", "الرابع", "faisal.salem@example.com", "0556789012", "", ""],
    ["علي سعيد", "الأول", "manal.youssef@example.com", "0557890123", "", ""],
    ["خالد سالم", "الثالث", "turki.nasser@example.com", "0558901234", "", ""],
    [
      "نواف حسن",
      "الثاني",
      "khadija.mohammed@example.com",
      "0559012345",
      "",
      "",
    ],
    ["محمد أحمد", "الثالث", "ayman.saeed@example.com", "0550123456", "", ""],
    ["أحمد علي", "الثاني", "lian.fahd@example.com", "0551234500", "", ""],
  ];

  return (
    <div className="mt-4 mx-20 bg-white px-4 pt-3 pb-4 rounded-3xl border border-gray-200 flex-1">
      {/* <div className="border-x border-gray-200 rounded mt-3 bg-black p-5"> */}
      {/* Add a wrapper div with max-height and overflow-y-auto */}
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
            {rows.map((row, rowIndex) => (
              <tr className="bg-white text-[#232323] border-b" key={rowIndex}>
                <td className="py-3">
                  <img src={maleIcon} alt="male student icon" />
                </td>
                {row.map((cell, cellIndex) => (
                  <td className="px-3 py-3" key={cellIndex}>
                    {cell}
                  </td>
                ))}
                <td className="px-4 py-3 flex justify-center items-center">
                  <button
                    className="shadow shadow-[#23232355] bg-[#abff8f] hover:bg-[#abff8faa] text-[#528741] py-2 px-6"
                    style={{
                      borderRadius: "15px",
                      transition: "all 0.1s ease-in-out",
                    }}
                  >
                    قبول
                  </button>
                </td>
                <td className="py-3">
                  <button
                    className="shadow shadow-[#23232355] bg-[#ff7979] hover:bg-[#ff7979aa] text-[#7D2B2B] py-2 px-6"
                    style={{
                      borderRadius: "15px",
                      transition: "all 0.1s ease-in-out",
                    }}
                  >
                    رفض
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* </div> */}
    </div>
  );
};

export default StudentsTable;
