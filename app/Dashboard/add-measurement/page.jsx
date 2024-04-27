'use client'

import React, { useEffect, useState } from "react";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { auth, firestore } from "../../../firebase";
import { useRouter } from "next/navigation";

const AddMeasurement = ({ navigate }) => {
  const router = useRouter()
  const [selectedTest, setSelectedTest] = useState("bloodPressure");
  const [bloodPressure, setBloodPressure] = useState({ systolic: '', diastolic: '' });
  const [bloodSugar, setBloodSugar] = useState('');
  const [userId, setUserId] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged(async(user)=>{
      if (user){
        const uid = user.uid;
        console.log(uid)
        const q = query(collection(firestore, "users"), where("userID", "==", uid));
        try {
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            setUserId(userDoc.id);
          } else {
            console.log("No documents found");
          }
        } catch (error) {
          console.error("Error fetching user document:", error);
        }
      }
      else {
        router.push("/sign-in")
      }
    })

    

  }, []);

  const handleSubmit = async () => {
    if (selectedTest === "bloodPressure" && (bloodPressure.systolic === '' || bloodPressure.diastolic === '')) {
      alert("Please enter both systolic and diastolic values");
      return;
    } else if (selectedTest === "bloodSugar" && bloodSugar === '') {
      alert("Please enter blood sugar value");
      return;
    }

    const collectionRef = collection(firestore, "users", userId, selectedTest);
    const data = selectedTest === "bloodPressure" ? bloodPressure : { bloodSugar };
    try {
      await addDoc(collectionRef, {
        ...data,
        createdAt: new Date(),
      });
      alert("Measurement added successfully");
      router.back()
    } catch (error) {
      console.error("Failed to add document:", error);
    }
  };

  return (
    <div className="mt-4 p-5 mx-56">
      <label className="block text-lg mb-2">Select Test Type:</label>
      <select
        className="p-2 border text-black border-gray-300 rounded mb-4 w-full"
        value={selectedTest}
        onChange={(e) => setSelectedTest(e.target.value)}
      >
        <option value="bloodPressure">Blood Pressure</option>
        <option value="bloodSugar">Blood Sugar</option>
      </select>

      {selectedTest === "bloodPressure" && (
        <div>
          <label className="block text-lg mb-2">Blood Pressure (mmHg):</label>
          <input
            className="p-2 border text-gray-900 border-gray-300 rounded mb-2 w-full"
            type="number"
            value={bloodPressure.systolic}
            onChange={(e) => setBloodPressure({ ...bloodPressure, systolic: e.target.value })}
            placeholder="Systolic"
          />
          <input
            className="p-2 border text-gray-900 border-gray-300 rounded mb-4 w-full"
            type="number"
            value={bloodPressure.diastolic}
            onChange={(e) => setBloodPressure({ ...bloodPressure, diastolic: e.target.value })}
            placeholder="Diastolic"
          />
        </div>
      )}

      {selectedTest === "bloodSugar" && (
        <div>
          <label className="block text-lg mb-2">Blood Sugar (mg/dL):</label>
          <input
            className="p-2 border text-gray-900 border-gray-300 rounded mb-4 w-full"
            type="number"
            value={bloodSugar}
            onChange={(e) => setBloodSugar(e.target.value)}
            placeholder="Blood Sugar"
          />
        </div>
      )}

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default AddMeasurement;
