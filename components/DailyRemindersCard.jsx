import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
// import { auth, firestore } from "../../firebase"; // Adjust the path as necessary
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPills, faSyringe, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { auth, firestore } from "../firebase";
import { useRouter } from "next/navigation";

// A single task item component
const TaskItem = ({ iconName, color, title, reminder }) => (
  <div className="flex items-center mb-2.5 p-2.5 bg-gray-600 rounded-lg shadow">
    <FontAwesomeIcon icon={iconName} color={color} className={` text-2xl mr-2.5`} />
    <div className="ml-2.5">
      <p className="font-bold">{title}</p>
      <p>{reminder}</p>
    </div>
  </div>
);

const DailyReminderCard = ({ navigate }) => {
    const router = useRouter()
  const [medication, setMedication] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const uid = auth.currentUser?.uid;
      const q = query(collection(firestore, "users"), where("userID", "==", uid));
      try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const measurementRef = collection(firestore, "users", userDoc.id, "medicationMeasurement");
          const docRef = await getDocs(measurementRef);
          const data = docRef.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setMedication(data);
        }
      } catch (error) {
        console.error("Error fetching medication data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-center mb-4 text-gray-900">Medication</h2>
      {medication.map(data => (
        <TaskItem
          key={data.id}
          iconName={data.type === "tab" ? faPills : faSyringe}
          color="skyblue"
          title={data.medicationName}
          reminder={`${data.dosage} - ${data.frequency}`}
        />
      ))}
      <button
        className="mx-auto my-2.5 px-4 py-2.5 border border-transparent rounded-lg shadow text-white bg-blue-500 hover:bg-blue-700"
        onClick={()=>router.push('/dashboard/add-medication')}
      >
        <FontAwesomeIcon icon={faPlusCircle} className="mr-2" /> Add Measurement
      </button>
    </div>
  );
};

export default DailyReminderCard;
