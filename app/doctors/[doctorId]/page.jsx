'use client'

import React, { useEffect, useState } from "react";
import { query, collection, where, getDoc, getDocs, doc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faContactCard, faStar, faStarHalfAlt,   } from "@fortawesome/free-solid-svg-icons";
import { firestore } from "@/firebase";
import Card from "@/components/Card";
import BlogCard from "@/components/blogCard";

const DoctorProfile = ({ params }) => {
  const doctorId = params.doctorId
  const [doctor, setDoctor] = useState({});
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async (doctorId) => {
      const blogsRef = collection(firestore, "blogs");
      const qSnapshot = await getDocs(query(blogsRef, where("doctorId", "==", doctorId)));
      const blogs = qSnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setBlogs(blogs);
    };

    const fetchDoctor = async () => {
      const doctorRef = collection(firestore, "doctors");
      const doctorDoc = doc(doctorRef, doctorId);
      const doctorSnapshot = await getDoc(doctorDoc);
      if (!doctorSnapshot.exists()) {
        console.log("No such document!");
        return;
      }
      setDoctor({ ...doctorSnapshot.data(), id: doctorSnapshot.id });
      fetchBlogs(doctorId);
    };

    fetchDoctor();
  }, [doctorId]);

  return (
    <div>
    <div className="flex flex-col items-center p-5 bg-sky-900 rounded-b-3xl mb-8">
      <img
        src={doctor.profileImage || "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"}
        alt="Doctor Profile"
        className="w-36 h-36 rounded-full mb-5"
      />
      <p className="text-xl font-bold text-white mb-2">{doctor.name}</p>
      <p className="text-lg text-white mb-1">speciality: {doctor.speciality}</p>
      <p className="text-white text-sm mb-4">{doctor.description}</p>
      {(doctor.contact || doctor.rating) && (
        <div className="flex justify-center items-center mt-2 bg-white rounded-full py-3 px-6 shadow-lg">
          {doctor.contact && (
            <button
              onClick={() => window.open(`https://wa.me/${doctor.contact}?text=hi, I came from TheHealthApp`)}
              className="mx-2 text-blue-500"
            >
              <FontAwesomeIcon icon={faContactCard} color="green" size="lg" />
            </button>
          )}
          {doctor.rating && (
            <div className="flex">
              <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
              <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
              <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
              <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
              <FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-400" />
            </div>
          )}
        </div>
      )}
     
    </div>
    <div className="mx-20">
    <p className="font-bold text-xl self-center mt-8">
        Blogs by {doctor.name}
      </p>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2">
        {blogs.map((item) => (
          <BlogCard
            key={item.id}
            articleTitle={item.data?.title}
            description={item.data?.description || "Description Loading"}
            blogImage={item.data?.imageURL}
            date={new Date(item.data?.createdAt.seconds * 1000).toDateString()}
            // authorName={"self help"}
          />
        ))}
      </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
