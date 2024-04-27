import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRunning, faDumbbell, faBicycle, faPrayingHands } from '@fortawesome/free-solid-svg-icons';

// Define icon mapping for FontAwesome
const iconMapping = {
  run: faRunning,
  'weight-lifter': faDumbbell,
  bike: faBicycle,
  yoga: faPrayingHands
};

const TaskGoals = ({ iconName, color, title, progress }) => (
  <div className="w-2/5 mb-2.5 p-2.5 bg-gray-100 rounded-lg shadow-md flex flex-col items-center">
    <FontAwesomeIcon icon={iconMapping[iconName]} color={color} className={`text-${color} text-3xl`} />
    <p className="font-bold mt-2 text-black">{title}</p>
    <p className="text-gray-600">{progress}</p>
  </div>
);

const exercises = [
  {
    iconName: "run",
    color: "blue",
    title: "Running",
    progress: "30 mins",
  },
  {
    iconName: "weight-lifter",
    color: "red",
    title: "Weight Lifting",
    progress: "20 mins",
  },
  {
    iconName: "bike",
    color: "pink",
    title: "Cycling",
    progress: "15 mins",
  },
  {
    iconName: "yoga",
    color: "red",
    title: "Yoga",
    progress: "10 mins",
  },
];

const DailyExerciseCard = () => {
  return (
    <div className="bg-green-700 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-center mb-4">Daily Exercise</h2>
      <div className="flex flex-wrap justify-evenly mb-7.5">
        {exercises.map((exercise, index) => (
          <TaskGoals
            key={index}
            color={exercise.color}
            iconName={exercise.iconName}
            progress={exercise.progress}
            title={exercise.title}
          />
        ))}
      </div>
    </div>
  );
};

export default DailyExerciseCard;
