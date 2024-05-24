'use client'
import React, { useState } from "react";
import { addDoc, collection, getDocs, where, query } from "firebase/firestore";
import { auth, firestore } from "../../firebase";
import { useRouter } from "next/navigation";
// import { auth, firestore } from "../../../firebase"; // Adjust path as needed


const AddMedicationMeasurement = () => {
  const router = useRouter()
  const [medicationName, setMedicationName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [selectedTest, setSelectedTest] = useState("tab");

  const handleSubmit = async () => {
    if (!medicationName || !dosage || !frequency) {
      alert("Please fill all the fields");
      return;
    }
    const uid = auth.currentUser?.uid;
    const q = query(collection(firestore, "users"), where("userID", "==", uid));

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const measurementRef = collection(
          firestore,
          "users",
          userDoc.id,
          "medicationMeasurement"
        );
        const docRef = await addDoc(measurementRef, {
          medicationName,
          dosage,
          frequency,
          type: selectedTest,
          createdAt: new Date(),
        });
        alert("Medication Measurement added successfully");
        router.back()
        
      } else {
        console.log("No documents found");
      }
    } catch (error) {
      console.error("Error adding medication measurement:", error);
    }
  };

  return (
    <div className="mt-5 p-5 lg:mx-56 md:mx-36 mx-10">
      <div>
        <label className="block text-lg font-bold mb-2">Medication Name</label>
        <input
          className="p-2 border border-gray-300 text-gray-800 rounded w-full mb-3"
          type="text"
          value={medicationName}
          onChange={(e) => setMedicationName(e.target.value)}
          placeholder="e.g., Aspirin, Insulin"
        />
        <label className="block text-lg font-bold mb-2">Dosage</label>
        <input
          className="p-2 border border-gray-300 text-gray-800 rounded w-full mb-3"
          type="text"
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
          placeholder="e.g., 5ml, 1 pill"
        />
        <label className="block text-lg  font-bold mb-2">Frequency</label>
        <input
          className="p-2 border border-gray-300 text-gray-800 rounded w-full mb-3"
          type="text"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          placeholder="e.g., 2 times a day"
        />
        <label className="block text-lg font-bold mb-2">Type of Medicine</label>
        <select
          className="p-2 border border-gray-300 text-gray-800 rounded w-full mb-4"
          value={selectedTest}
          onChange={(e) => setSelectedTest(e.target.value)}
        >
          <option value="tab">Tablet</option>
          <option value="injection">Injection</option>
          <option value="syrup">Syrup</option>
        </select>
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default AddMedicationMeasurement;
