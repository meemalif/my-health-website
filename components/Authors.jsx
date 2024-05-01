'use client'
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";
import Link from "next/link";
import AuthorCard from "./AuthorCard";


export default function Authors() {
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
    <div className="flex mt-5 mx-8">

      <div className="flex lg:grid-cols-3 grid-cols-2">
      {selectedDoctor.map((doctor, index) => (
        <Link href={`/doctors/${doctor.id}`}>
            <AuthorCard doctor={doctor}/>
        </Link>
      ))}
      </div>
    </div>
  );
}
