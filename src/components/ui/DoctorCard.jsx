import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 p-6 flex flex-col justify-between h-full">
      <div className="text-left ">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800  mb-2 break-words">
          Dr. {doctor.name}
        </h2>
        <div className="flex ">
          <span className="text-sm inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            {doctor.specialization}
          </span>
        </div>
        <p className=" text-gray-600 text-sm mt-3">
          {doctor.experience}+ years of experience
        </p>
      </div>
      <button
        className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition duration-200"
        onClick={() => navigate(`/doctor/${doctor._id}`)}
      >
        View Profile
      </button>
    </div>
  );
};

export default DoctorCard;
