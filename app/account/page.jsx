"use client";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  updateDoc,
  doc,
  deleteDoc,
  collection,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import { firestore, auth } from "../../firebase"; // Adjust path as needed
import uploadImage from "../../config/uploadImage";

function EditAccountScreen() {
  const [userId, setUserId] = useState("");
  const [image, setImage] = useState(null);
  const [user, setUser] = useState({});
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        // No user is signed in, redirect to login page
        router.push("/sign-in");
      } else {
        console.log("Logged in user email:", user.email);
        try {
          const userRef = collection(firestore, "users");
          const queryRef = query(userRef, where("email", "==", user.email));
          const userSnapshot = await getDocs(queryRef);

          if (userSnapshot.empty) {
            // No user found in Firestore with the given email, redirect to sign-up
            console.log("No matching documents, redirecting to sign-up.");
            router.push("/sign-up");
          } else {
            // User found, set the user ID
            console.log("User snapshot ID:", userSnapshot.docs[0].id);
            setUser(userSnapshot.docs[0].data());
            setUserId(userSnapshot.docs[0].id);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []); // Include router in the dependency array if its methods are used

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());
    console.log("Form values:", values);
    let downloadURL = null;

    if (values.profilePicture && values.profilePicture.length > 0) {
      const uploadUri = values.profilePicture;
      const fileName = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
      const extension = fileName.split(".").pop();
      const name = fileName.split(".").slice(0, -1).join(".");
      const finalFileName = `${name}${Date.now()}.${extension}`;

      downloadURL = await uploadImage(
        uploadUri,
        finalFileName,
        "userProfileImages/"
      );
    }

    const docRef = doc(firestore, "users", userId);
    const updatedFields = {};

    if (downloadURL) {
      updatedFields.profile = downloadURL;
    }
    if (values.bio) {
      updatedFields.bio = values.bio;
    }
    if (values.birthyear) {
      updatedFields.birthyear = values.birthyear;
    }
    if (values.blood) {
      updatedFields.blood = values.blood;
    }
    if (values.diagnose) {
      updatedFields.diagnose = values.diagnose;
    }
    if (values.stage) {
      updatedFields.stage = values.stage;
    }
    if (values.weight) {
      updatedFields.weight = values.weight;
    }

    // Add more fields as needed

    if (Object.keys(updatedFields).length > 0) {
      await updateDoc(docRef, updatedFields);
      alert("User profile updated successfully");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(firestore, "users", userId));
      const user = auth.currentUser;
      await user.delete();
      router.push("/sign-in");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  return (
    <div className="p-5 mt-6 lg:mx-56 md:mx-36 mx-10">
      <div className="flex flex-col items-center justify-center">
        <img
          className="w-32 h-32 rounded-full"
          src={
            user.profile
              ? user.profile
              : "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
          }
          alt="User Profile"
        />
        <h1 className="text-2xl font-bold text-center mt-4">
          Hello back, {user.name}
        </h1>
      </div>

      <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
        <label
          className="block mb-2 text-sm font-medium text-gray-200"
          htmlFor="profilePicture"
        >
          Upload file
        </label>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
          aria-describedby="profilePicture_help"
          id="profilePicture"
          name="profilePicture"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <p className="mt-1 text-sm text-gray-500" id="profilePicture_help">
          A profile picture is useful for verification and authorization.
        </p>
        <label
          htmlFor="diagnose"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Are You Diagnosed with anything
        </label>
        <select
          id="diagnose"
          name="diagnose"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option>No</option>
          <option>Diabetes</option>
          <option>Hypertension</option>
        </select>
        <label
          htmlFor="Blood"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select Your Blood type
        </label>
        <select
          id="Blood"
          name="Blood"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option>A+</option>
          <option>A-</option>
          <option>B+</option>
          <option>B-</option>
          <option>o+</option>
          <option>o-</option>
          <option>others</option>
        </select>

        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Description
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
          </span>
          <input
            type="text"
            id="description"
            name="description"
            className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Bonnie Green"
          />
        </div>

        <label
          htmlFor="bio"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          About Yourself
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
          </span>
          <input
            type="text"
            id="bio"
            name="bio"
            className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="i;e I am student of MBBS final year"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="weight"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Weight
          </label>
          <input
            type="numeric"
            name="weight"
            id="weight"
            placeholder={"55kg"}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-4"
        >
          Submit
        </button>
      </form>
      <div className="flex flex-col items-center justify-center">
        <button
          className="border border-blue-500 text-blue-500 p-2 rounded mt-4 mx-5"
          onClick={() => router.push("/registerDoctor")}
        >
          Register as a Doctor
        </button>
        <button
          className="border border-red-500 text-red-500 p-2 rounded mt-4"
          onClick={handleDelete}
        >
          Delete account
        </button>
      </div>
    </div>
  );
}

export default EditAccountScreen;
