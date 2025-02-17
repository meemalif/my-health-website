import React from "react";
import {diabetesMealPlan, hypertensionMealPlan} from "../config/meal-plan";

const MealCard = ({ meal, description }) => {
  return (
    <div className="border border-gray-300 bg-gray-100 rounded p-2 w-1/3 my-1">
      <p className="bg-green-600 text-white font-bold p-2 w-full text-center">{meal}</p>
      <p className="text-xs p-2 text-gray-600">{description}</p>
    </div>
  );
};

const DayMealCard = ({ title, data }) => {
  return (
    <div>
      <h3 className="font-bold bg-gray-200 text-green-600 p-2 rounded-md text-lg my-2">{title}</h3>
      <div className="flex justify-between">
        {data.map((item, index) => (
          <MealCard key={index} meal={item.meal} description={item.description} />
        ))}
      </div>
    </div>
  );
};



const DietPlanCard = ({diagnose}) => {
  const data = diagnose?.toLowerCase() === "hypertension" ? hypertensionMealPlan : diabetesMealPlan;
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-center text-green-600 mb-4">Diet Plan</h2>
      {data.map((day, index) => (
        <DayMealCard key={index} title={day.title} data={day.data} />
      ))}
    </div>
  );
};

export default DietPlanCard;
