import React from "react";

const Alert = ({ message, type, onClose }) => {
  const alertStyles = {
    success: "bg-[#abff8f] text-[#528741]",
    error: "bg-[#ff7979] text-[#7D2B2B]",
  };

  return (
    <div
      className={`flex justify-between items-center p-2 rounded-xl shadow ${alertStyles[type]} fixed bottom-4 left-4 max-w-[200px] z-50`}
      style={{ minWidth: "150px" }}
    >
      <span className="text-sm">{message}</span>
      <button onClick={onClose} className="font-bold text-lg mx-2">
        ×
      </button>
    </div>
  );
};

export default Alert;
