import React from "react";
import Image from "next/image";
// import doctorImage from '/assets/doctor.png'; // Update the import based on your project structure

const WelcomeCard = ({ userName }) => {

  return (
    <div className="bg-gray-50 p-5 rounded-lg shadow-md"> {/* Equivalent to cardContainer */}
      <div className="flex items-center mb-2.5"> {/* Equivalent to cardHeader */}
        <div className="w-3/5">
          <p className="text-lg font-bold text-black">Welcome {userName}!</p> {/* Equivalent to welcomeText */}
          <p className="text-base text-gray-500 mt-1 wrap">
            Step into Your Personal Health Hub – Where Your Wellness Journey Begins with Ease and Insight.
          </p> {/* Equivalent to subtitle */}
        </div>
        <div className="w-2/5 flex justify-end">
          <Image
            src={"/assets/doctor.png"}
            alt="Doctor"
            width={90} // You might want to adjust this size
            height={90} // and this as per your design requirement
            className="rounded-full" // If you want rounded Avatar, otherwise remove
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
