import Opp_Icon from "../assets/icon_opp_card.svg";
import Stu_Icon from "../assets/icon_student_card.svg";
import Hours_Icon from "../assets/icon_hours_card.svg";

const cards = () => {
  return (
    <div className="flex gap-4 p-4">
      {/* Volunteering Hours Card ------------------------------------------------ */}
      <div className="bg-[#FFE8E4] rounded-3xl drop-shadow-md m-3 p-5 flex-1 border border-gray-200 flex items-center ">
        <div className="rounded-full h-16 w-16 flex items-center justify-center">
          {/* <IoPieChart className="text-xl text-white" /> */}
          <img src={Hours_Icon} alt="Hours Icon" className="w-7/12" />
        </div>
        <div className="pl-4">
          <span className="text-xl text-[#232323] font-bold">
            <span>1,250+</span>
            <br />
            ساعة تطوعية
          </span>
          <div className="flex items-center">
            <strong className="text-sm text-gray-700 font-light">
              العدد الإجمالي للفرص التطوعية.
            </strong>
            {/* <span className="text-sm text-red-500 pl-2">-30</span> */}
          </div>
        </div>
      </div>
      {/* Students Card ------------------------------------------------ */}
      <div className="bg-[#FFF9E6] rounded-3xl drop-shadow-md m-3 p-5 flex-1 border border-gray-200 flex items-center">
        <div className="rounded-full h-16 w-16 flex items-center justify-center">
          {/* <IoPieChart className="text-xl text-white" /> */}
          <img src={Stu_Icon} alt="Student Icon" className="w-7/12" />
        </div>
        <div className="pl-4">
          <span className="text-xl text-[#232323] font-bold">
            <span>1,250+</span>
            <br />
            طالب متطوع
          </span>
          <div className="flex items-center">
            <strong className="text-sm text-gray-700 font-light">
              العدد الإجمالي للفرص التطوعية.
            </strong>
            {/* <span className="text-sm text-red-500 pl-2">-30</span> */}
          </div>
        </div>
      </div>
      {/* Opportunities Card ------------------------------------------------*/}
      <div className="bg-[#E8FCFB] rounded-3xl drop-shadow-md m-3 p-5 flex-1 border border-gray-200 flex items-center">
        <div className="rounded-full h-16 w-16 flex items-center justify-center m-2">
          {/* <IoPeople className="text-xl text-white" /> */}
          <img src={Opp_Icon} alt="Opp Icon" className="w-7/12" />
        </div>
        <div className="pl-4">
          <span className="text-xl text-[#232323] font-bold">
            <span>1,250+</span>
            <br />
            فرصة تطوعية
          </span>
          <div className="flex items-center">
            <strong className="text-sm text-gray-700 font-light">
              العدد الإجمالي للفرص التطوعية.
            </strong>
            {/* <span className="text-sm text-red-500 pl-2">-30</span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default cards;

// function BoxWrapper({ children }) {
//   return (
//     <div className="bg-white rounded-3xl drop-shadow-md m-4 p-5 flex-1 border border-gray-200 flex items-center">
//       {children}
//     </div>
//   );
// }
