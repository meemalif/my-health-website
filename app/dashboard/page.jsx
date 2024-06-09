"use client";

import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  where,
  getFirestore,
} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import { auth, firestore } from "../../firebase";
import { useRouter } from "next/navigation";
import WelcomeCard from "../../components/welcomeCard";
import MeasurementCard from "../../components/MeasurementCard";
import DailyTasksCard from "../../components/DailyTaskCard";
import TestRecordsCard from "../../components/TestRecordCards";
import DailyReminderCard from "../../components/DailyRemindersCard";
import DailyExerciseCard from "../../components/DailyExerciseCard";
import DietPlanCard from "../../components/DietPlanCard";

function Dashboard() {
  const router = useRouter();
  const [bloodPressure, setBloodPressure] = useState([0, 0]);
  const [bloodSugar, setBloodSugar] = useState(0);
  const [loading, setLoading] = useState(false);
  const [diagnose, setDiagnose] = useState("Diabetes");
  const [user, setUser] = useState(null);

  // const db = getFirestore(); // Initialize Firestore

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const uid = user.uid; // Use optional chaining in case currentUser is null
        console.log("------->", uid);
        setLoading(true);

        try {
          const q = query(
            collection(firestore, "users"),
            where("userID", "==", uid)
          );
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0]; // Assuming 'userID' is unique and only one doc will be returned
            setUser(userDoc.data());
            setDiagnose(userDoc.data()?.diagnose || "Diabetes");
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
              console.log(bloodPressureDoc.data());
              setBloodPressure([
                bloodPressureDoc.data().systolic || 0,
                bloodPressureDoc.data().diastolic || 0,
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
      } else {
        router.push("/sign-in");
      }
    });
  }, []);
  return (
    <div className="lg:mx-56 mx-8 my-20">
      <div className="flex lg:flex-row space-x-5 justify-center my-5">
        <WelcomeCard userName={user?.name || "user"} />
        <MeasurementCard
          title={"Blood Pressure"}
          measurement={bloodPressure.join("/")}
          unit="mmHg"
          status="Normal"
        />
        <MeasurementCard
          title="Blood Sugar/Diabetes"
          measurement={bloodSugar}
          unit="mg/dL"
          status="High"
        />
      </div>
      <div className="flex lg:flex-row  space-x-3">
        <DailyTasksCard />
        <button
          onClick={() => router.push("/dashboard/add-measurement")}
          className="bg-slate-900 rounded-xl w-1/3 space-y-4"
        >
          <FontAwesomeIcon icon={faPlusCircle} color="white" size="3x" />
          <p>Add Measurement</p>
        </button>
      </div>
      <div className="mt-10 space-y-4">
        <TestRecordsCard />
        <div className="flex flex-row space-x-2 ">
          <DailyReminderCard />
          <DailyExerciseCard />
        </div>
        <DietPlanCard diagnose={diagnose} />
      </div>
    </div>
  );
}

export default Dashboard;
