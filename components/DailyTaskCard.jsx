import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs, orderBy, Timestamp } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faCheckCircle, faPills, faHeartPulse, faHeart, faAppleAlt } from '@fortawesome/free-solid-svg-icons';
import { auth, firestore, } from "../firebase";

// Task item component with Tailwind CSS
const TaskItem = ({ iconName, color, title, progress }) => (
  <div className={`flex items-center mb-2.5 p-2.5 bg-gray-100 rounded-lg shadow`}>
    <FontAwesomeIcon icon={iconName} color={color} className={`text-${color} text-2xl mr-2.5`} />
    <p className="flex-1 text-lg ml-2.5 text-gray-600">{title}</p>
    <p className="text-lg font-bold text-black">{progress}</p>
  </div>
);

// Task goals component with Tailwind CSS
const TaskGoals = ({ iconName, color, title, progress }) => (
  <div className={`mb-2.5 p-2.5 bg-gray-100 rounded-lg shadow`}>
    <FontAwesomeIcon icon={iconName} color="green" className={`text-${color} text-2xl mr-2.5`} />
    <p className="text-lg text-black font-bold">{progress}</p>
    <p className="text-black">{title}</p>
  </div>
);

const DailyTasksCard = () => {
  const [todaysBloodPressureReadings, setTodaysBloodPressureReadings] = useState([]);
  const [todaysBloodSugarReadings, setTodaysBloodSugarReadings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {

      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);
      const startOfTodayTimestamp = Timestamp.fromDate(startOfToday);
      console.log(startOfTodayTimestamp);
      console.log(startOfToday);
      const uid = auth.currentUser?.uid;
      const userQuery = query(
        collection(firestore, "users"),
        where("userID", "==", uid)
      );
      const userSnapshot = await getDocs(userQuery);
      const userDoc = userSnapshot.docs[0];
      const userID = userDoc.id;
      console.log(userID);
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
      const checkQuery = getDocs(bloodPressureRef);
      console.log((await checkQuery).docs[0]?.data());

      const q = query(
        bloodPressureRef,
        where("createdAt", ">=", startOfTodayTimestamp)
      );

      try {
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot.docs[0]?.data());
        const readings = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTodaysBloodPressureReadings(readings);
      } catch (error) {
        console.error("Error fetching today's blood pressure readings:", error);
      }

      const bloodSugarQuery = query(
        bloodSugarRef,
        where("createdAt", ">=", startOfTodayTimestamp)
      );

      try {
        const querySnapshot = await getDocs(bloodSugarQuery);
        const readings = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTodaysBloodSugarReadings(readings);
      } catch (error) {
        console.error("Error fetching today's blood sugar readings:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-green-600 p-2.5 rounded-lg shadow-md mb-2.5 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Daily Tasks</h2>
      <div className="flex justify-evenly w-full mb-7.5 space-x-2">
        <TaskGoals
          iconName={faTrophy}
          color="yellow"
          title="Completion Rate"
          progress={`${((todaysBloodPressureReadings.length + todaysBloodSugarReadings.length) / 4) * 100}%`}
        />
        <TaskGoals
          iconName={faCheckCircle}
          color="red"
          title="Measurements"
          progress={`${todaysBloodPressureReadings.length + todaysBloodSugarReadings.length}`}
        />
         <TaskItem
        iconName={faHeartPulse}
        color="red"
        title="Blood Pressure"
        progress={`${todaysBloodPressureReadings.length}/2 measurements`}
      />
      <TaskItem
        iconName={faHeart}
        color="pink"
        title="Blood Sugar"
        progress={`${todaysBloodSugarReadings.length}/2 measurements`}
      />
      </div>
      <div className="flex flex-wrap space-x-3">
      <TaskItem
        iconName={faPills}
        color="blue"
        title="Losartan"
        progress="1/2 Intakes"
      />
     
      <TaskItem
        iconName={faAppleAlt}
        color="green"
        title="Meal"
        progress="866/1200 calories"
      />
      </div>
    </div>
  );
};

export default DailyTasksCard;
