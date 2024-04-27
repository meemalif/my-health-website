'use client'
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import DoctorCard from "../../components/DoctorCard";
import { firestore } from "../../firebase";
import Link from "next/link";


export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [value, setValue] = useState("diabetes");
  const [doctors, setDoctors] = useState([]);
  const [filterDoctors, setFilteredDoctors] = useState([]);

  useEffect(() => {
    const filterData = () => {
      if (searchQuery.length > 0) {
        const filteredData = doctors.filter(
          (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.speciality.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredDoctors(filteredData);
      } else {
        setFilteredDoctors(doctors);
      }
    };
    filterData();
  }, [searchQuery, doctors]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorsRef = collection(firestore, "doctors");
        const querySnapshot = await getDocs(doctorsRef);
        const doctors = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDoctors(doctors);
        setFilteredDoctors(doctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  const selectedDoctor = filterDoctors.filter(
    (doc) => doc.speciality === value
  );

  return (
    <div className="flex flex-col mt-5 lg:mx-56 md:mx-36 mx-8">
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded text-black"
      />
      <div className="flex flex-row mb-4">
        <button
          className={`mr-2 p-2 rounded ${value === 'diabetes' ? 'bg-blue-500 text-white' : 'bg-white border text-black'}`}
          onClick={() => setValue('diabetes')}
        >
          Diabetes
        </button>
        <button
          className={`p-2 rounded ${value === 'hypertension' ? 'bg-blue-500 text-white' : 'bg-white border text-black'}`}
          onClick={() => setValue('hypertension')}
        >
          Hypertension
        </button>
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-2">
      {selectedDoctor.map((doctor, index) => (
        <Link href={`/doctors/${doctor.id}`}>
        <DoctorCard key={index} doctor={doctor} />
        </Link>
      ))}
      </div>
    </div>
  );
}
