'use client'

import { auth, firestore } from '@/firebase';
import React, {useState, useEffect} from 'react'
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  where,
} from "firebase/firestore";


function Dashboard() {
    const [bloodPressure, setBloodPressure] = useState([0, 0]);
    const [bloodSugar, setBloodSugar] = useState(0);
    const [loading, setLoading] = useState(false);
  
    const fetchData = async () => {
      const uid = auth.currentUser?.uid; // Use optional chaining in case currentUser is null
      setLoading(true);
      const q = query(collection(firestore, "users"), where("userID", "==", uid));
  
      try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0]; // Assuming 'userID' is unique and only one doc will be returned
          const bloodPressureRef = collection(
            firestore,
            "users",
            userDoc.id,
            "bloodPressure"
          );
          const bloodSugarRef = collection(
            firestore,
            "users",
            userDoc.id,
            "bloodSugar"
          );
          const bloodPressureQuery = query(
            bloodPressureRef,
            orderBy("createdAt", "desc"),
            limit(1)
          );
          const bloodSugarQuery = query(
            bloodSugarRef,
            orderBy("createdAt", "desc"),
            limit(1)
          );
          const bloodPressureSnapshot = await getDocs(bloodPressureQuery);
          const bloodSugarSnapshot = await getDocs(bloodSugarQuery);
          if (!bloodPressureSnapshot.empty) {
            const bloodPressureDoc = bloodPressureSnapshot.docs[0];
            setBloodPressure([
              bloodPressureDoc.data().systolic,
              bloodPressureDoc.data().diastolic,
            ]);
          }
          if (!bloodSugarSnapshot.empty) {
            const bloodSugarDoc = bloodSugarSnapshot.docs[0];
            setBloodSugar(bloodSugarDoc.data().bloodSugar);
          }
  
          console.log(userDoc.id);
          setLoading(false);
        } else {
          // Handle the case where no documents are found
          console.log("No documents found");
        }
      } catch (error) {
        // Handle any errors that occur during the fetch
        console.error("Error fetching user document:", error);
      }
      setLoading(false);
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard