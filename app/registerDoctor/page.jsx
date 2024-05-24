"use client";
import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { collection, addDoc, query, getDocs, where } from "firebase/firestore";
import { auth, firestore } from "../../firebase";
import uploadImage from "../../config/uploadImage";
import { useRouter } from "next/navigation";

// import { auth, firestore } from "../../../firebase";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(3).label("Name"),
  description: Yup.string().min(10).label("Description"),
  images: Yup.array().required().min(1).label("Images"),
  bio: Yup.string().required().min(5).max(25).label("Bio"),
  registrationNumber: Yup.string()
    .required()
    .min(5)
    .label("Registration Number"),
  contact: Yup.string().required().min(11).label("Contact"),
});

const RegisterDoctor = () => {
  const router = useRouter();
  const [selectedGender, setSelectedGender] = useState("male");
  const [selectedSpeciality, setSelectedSpeciality] = useState("diabetes");

  const formik = useFormik({
    initialValues: {
      name: "",
      bio: "",
      registrationNumber: "",
      contact: "",
      description: "",
      images: [],
    },
    validationSchema,
    onSubmit: async (values) => {
      const uid = auth.currentUser?.uid;
      console.log(values);
      const downloadURLs = [];

      const doctorRef = collection(firestore, "doctors");
      const doctorQuery = await getDocs(
        query(doctorRef, where("userId", "==", uid))
      );
      if (!doctorQuery.empty) {
        alert("Doctor already registered");
        router.push("/account");
        return;
      }

      for (let i = 0; i < values.images.length; i++) {
        const uploadUri = values.images[i];
        let fileName = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
        const extension = fileName.split(".").pop();
        const name = fileName.split(".").slice(0, -1).join(".");
        fileName = name + Date.now() + "." + extension;

        try {
          const downloadURL = await uploadImage(
            uploadUri,
            fileName,
            "doctorImages/"
          );
          downloadURLs.push(downloadURL);
          downloadURL;
        } catch (e) {
          console.error("Error uploading image: ", e);
          // Handle error if image upload fails
        }
      }
      if (downloadURLs.length === 0) {
        alert("No images uploaded");
        return;
      }

      // Use the downloadURLs array as needed, e.g., store them in Firestore

      try {
        const collectionRef = collection(firestore, "doctors");
        const docRef = await addDoc(collectionRef, {
          profileImage: downloadURLs[0],
          name: values.name,
          bio: values.bio,
          registrationNumber: values.registrationNumber,
          contact: values.contact,
          description: values.description,
          createdAt: new Date(),
          userId: uid,
          gender: selectedGender,
          speciality: selectedSpeciality,
          rating: 4.5,
        });
        Alert.alert("Doctor registered successfully");
        navigation.goBack();
        return;
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-5">
      <form
        onSubmit={formik.handleSubmit}
        initialvalues={formik.initialValues}
        className="space-y-6 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div>
          <label
            htmlFor="images"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Your Doctor Image
          </label>
          <input
            id="images"
            name="images"
            type="file"
            onChange={(event) => {
              const files = event.currentTarget.files;
              const imagesArray = Array.from(files); // Convert FileList to an array
              formik.setFieldValue("images", imagesArray);
            }}
            className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            multiple
          />
          {formik.errors.images && formik.touched.images ? (
            <div className="text-red-500 text-xs">{formik.errors.images}</div>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            placeholder="Enter your name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="text-red-500 text-xs">{formik.errors.name}</div>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            placeholder="Describe your specialties"
            className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            rows="3"
          />
          {formik.errors.description && formik.touched.description ? (
            <div className="text-red-500 text-xs">
              {formik.errors.description}
            </div>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700"
          >
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.bio}
            placeholder="Tell us about yourself"
            className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            rows="3"
          />
          {formik.errors.bio && formik.touched.bio ? (
            <div className="text-red-500 text-xs">{formik.errors.bio}</div>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="registrationNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Registration Number
          </label>
          <input
            id="registrationNumber"
            name="registrationNumber"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.registrationNumber}
            placeholder="Enter your registration number"
            className="mt-1 block w-full px-3 text-black py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {formik.errors.registrationNumber &&
          formik.touched.registrationNumber ? (
            <div className="text-red-500 text-xs">
              {formik.errors.registrationNumber}
            </div>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="contact"
            className="block text-sm font-medium text-gray-700"
          >
            Contact
          </label>
          <input
            id="contact"
            name="contact"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.contact}
            placeholder="Enter your contact number"
            className="mt-1 block w-full px-3 text-black py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {formik.errors.contact && formik.touched.contact ? (
            <div className="text-red-500 text-xs">{formik.errors.contact}</div>
          ) : null}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Select Your Gender:
          </label>
          <select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Speciality:
          </label>
          <select
            value={selectedSpeciality}
            onChange={(e) => setSelectedSpeciality(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="diabetes">Diabetes</option>
            <option value="hypertension">HyperTension</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterDoctor;
