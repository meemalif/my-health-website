'use client'
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";
import Link from "next/link";
import AuthorCard from "./AuthorCard";


export default function Authors() {
  const [doctors, setDoctors] = useState([]);
  const [filterDoctors, setFilteredDoctors] = useState([]);


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


  return (
    <div className="flex mt-5 mx-8">

      <div className="grid lg:grid-cols-3 space-x-2 grid-cols-2">
      {doctors.map((doctor, index) => (
        <Link key={index} href={`/doctors/${doctor.id}`}>
            <AuthorCard doctor={doctor}/>
        </Link>
      ))}
      </div>
    </div>
  );
}
