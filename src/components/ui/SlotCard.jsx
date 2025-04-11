import React from "react";

const SlotCard = ({ slot }) => {
  return (
    <div
      className={`p-4 rounded-xl border ${
        slot.isBooked
          ? "bg-red-100 border-red-300"
          : "bg-green-100 border-green-300"
      } shadow-sm flex justify-between items-center`}
    >
      <div>
        <p className="text-sm font-semibold text-gray-700">{slot.date}</p>
        <p className="text-sm text-gray-600">{slot.time}</p>
      </div>
      <span
        className={`text-xs px-3 py-1 rounded-full font-semibold ${
          slot.isBooked ? "bg-red-600 text-white" : "bg-green-600 text-white"
        }`}
      >
        {slot.isBooked ? "Booked" : "Available"}
      </span>
    </div>
  );
};

export default SlotCard;
