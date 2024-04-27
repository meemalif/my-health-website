import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Ensure you have '@fortawesome/react-fontawesome' and '@fortawesome/free-solid-svg-icons' installed
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const MeasurementCard = ({ title, measurement, unit }) => {
  let status = "Normal";
  // Logic to determine status remains the same
  if (title === "Blood Pressure") {
    const [systolic, diastolic] = measurement.split("/");
    if (systolic >= 120 && systolic <= 129 && diastolic < 80) {
      status = "Elevated";
    } else if (systolic >= 130 && systolic <= 139) {
      status = "High";
    } else if (systolic >= 140 || diastolic >= 90) {
      status = "VHigh";
    }
  } else if (title === "Blood Sugar/Diabetes") {
    if (measurement < 70) {
      status = "Low";
    } else if (measurement >= 70 && measurement <= 99) {
      status = "Normal";
    } else if (measurement >= 100 && measurement <= 125) {
      status = "Elevated";
    } else if (measurement >= 126 && measurement <= 180) {
      status = "High";
    } else {
      status = "VHigh";
    }
  }

  // Status color mapping
  const statusColor = {
    Low: "bg-green-600",
    Normal: "bg-blue-500",
    Elevated: "bg-yellow-400",
    High: "bg-orange-500",
    VHigh: "bg-red-600",
  }[status];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-2.5 flex flex-col items-center">
      <div className="flex justify-between w-full items-center mb-4">
        <p className="text-lg font-bold text-black">{title}</p>
        <FontAwesomeIcon icon={faQuestionCircle} className="text-gray-400" size="lg" />
      </div>
      <div className="flex items-baseline">
        <p className="text-5xl font-bold mr-1 text-gray-500" >{measurement}</p>
        <p className="text-2xl text-gray-700">{unit}</p>
      </div>
      <div className={`${statusColor} text-white font-bold text-lg rounded-full py-2 px-4 mt-2.5`}>
        <p>{status}</p>
      </div>
    </div>
  );
};

export default MeasurementCard;
