"use client";
import * as tf from "@tensorflow/tfjs";
import { useEffect, useState } from "react";

function AIpage() {
  const [model, setModel] = useState(null);
  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    smokingHistory: "",
    bmi: "",
    hba1cLevel: "",
    bloodGlucoseLevel: "",
  });
  const [prediction, setPrediction] = useState(null);

  const loadModel = async () => {
    const loadedModel = await tf.loadLayersModel("/tfjs_model/model.json");
    setModel(loadedModel);
    console.log("Model loaded");
  };

  useEffect(() => {
    loadModel();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (model) {
      // Add pre-processing logic here
      const inputData = tf.tensor2d([
        [
          encodeGender(formData.gender),
          parseFloat(formData.age),
          encodeSmokingHistory(formData.smokingHistory),
          parseFloat(formData.bmi),
          parseFloat(formData.hba1cLevel),
          parseFloat(formData.bloodGlucoseLevel),
        ],
      ]);
      const results = model.predict(inputData);
      const prediction = results.dataSync()[0]; // Adjust based on your model output
      setPrediction(prediction);
      console.log("Prediction: ", prediction);
    }
  };

  return (
    <div
      className={
        prediction > 0.5
          ? "max-w-md mx-auto my-10 p-6 border rounded shadow-lg bg-red-500"
          : "max-w-md mx-auto my-10 p-6 border rounded shadow-lg bg-green-500"
      }
    >
      <h1 className="text-lg font-bold mb-5 text-center">
        AI based Diabetes Prediction
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded text-black"
          >
            <option value="">Select Gender</option>
            <option className="text-black" value="Male">
              Male
            </option>
            <option className="text-black" value="Female">
              Female
            </option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Age
          </label>
          <input
            name="age"
            type="number"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-black"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Smoking History
          </label>
          <select
            name="smokingHistory"
            value={formData.smokingHistory}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded text-black"
          >
            <option value="">Select Status</option>
            <option className="text-black" value="Never">
              Never
            </option>
            <option className="text-black" value="Current">
              Current
            </option>
            <option className="text-black" value="No Info">
              No Info
            </option>
            <option className="text-black" value="Former">
              Former
            </option>
            <option className="text-black" value="Not Current">
              Not Current
            </option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            BMI
          </label>
          <input
            name="bmi"
            type="number"
            placeholder="BMI"
            value={formData.bmi}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-black"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            HbA1c Level
          </label>
          <input
            name="hba1cLevel"
            type="number"
            placeholder="HbA1c Level"
            value={formData.hba1cLevel}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-black"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Blood Glucose Level
          </label>
          <input
            name="bloodGlucoseLevel"
            type="number"
            placeholder="Blood Glucose Level"
            value={formData.bloodGlucoseLevel}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-black"
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
        >
          Predict
        </button>
      </form>
      {prediction && (
        <p className="mt-4 text-center font-semibold">
          Prediction: {prediction > 0.5 ? "Positive" : "Negative"}
        </p>
      )}
    </div>
  );
}

export default AIpage;

function encodeGender(gender) {
  return gender === "Male" ? 1 : 0;
}

function encodeSmokingHistory(history) {
  switch (history) {
    case "Never":
      return 0;
    case "Current":
      return 1;
    case "No Info":
      return 2;
    case "Former":
      return 3;
    case "Not Current":
      return 4;
    default:
      return 2; // Assuming 'No Info' as default
  }
}
