// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBq2y40HpCohUqJhgwTU9m9bDWMh_RmFvI",
  authDomain: "healthkit-b1940.firebaseapp.com",
  projectId: "healthkit-b1940",
  storageBucket: "healthkit-b1940.appspot.com",
  messagingSenderId: "638553398255",
  appId: "1:638553398255:web:77f5f5d3a580a101f5b41a",
  measurementId: "G-K6T86EBL1H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);
