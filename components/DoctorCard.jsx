import React from "react";

const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-white rounded-lg p-4 mb-4 shadow">
      <div className="flex mb-4">
        <div className="flex-grow p-2">
          <p className="text-lg text-black font-bold">{doctor.name}</p>
          <p className="text-sm text-gray-600">{doctor.bio}</p>
          <p className="text-xs text-gray-800">{doctor.description?.slice(0, 100)}...</p>
        </div>
        <img
          src={
            doctor.profileImage ? doctor.profileImage :
            doctor.gender === "male" ?
            "https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg" :
            "https://img.freepik.com/premium-vector/flat-vector-illustration-woman-doctor_678069-78.jpg"
          }
          alt="Doctor"
          className="w-24 h-24 rounded-full"
        />
      </div>
      <div className="flex justify-start mb-4">
        {/* Simplified for demonstration */}
        <i className="fas fa-star text-yellow-400"></i>
        <i className="fas fa-star text-yellow-400"></i>
        <i className="fas fa-star text-yellow-400"></i>
        <i className="fas fa-star-half-alt text-yellow-400"></i>
        <i className="far fa-star text-yellow-400"></i>
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => {
            window.open(`https://wa.me/${doctor.contact}?text=hi, I came from TheHealthApp`);
            console.log(doctor.contact, "doctor contact number");
          }}
          className="rounded-full bg-orange-500 text-white py-2 px-4"
        >
          SEND REQUEST
        </button>
        <button className="rounded-full bg-blue-500 text-white py-2 px-4">
          CONTACT
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
