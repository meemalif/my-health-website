"use client";
import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDoc,
  getDocs,
  doc,
} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { auth, firestore } from "../../firebase";
import BlogCard from "../../components/blogCard";
import { useRouter } from "next/navigation";

export default function BlogScreen() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [doctor, setDoctor] = useState({});

  useEffect(() => {
    // Setup an observer on the Auth object to detect user state changes
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const uid = user.uid;
        console.log("User ID:", uid); // Consider removing or replacing with a debug level log
        const doctorRef = collection(firestore, "doctors");
        const doctorQuery = query(doctorRef, where("userId", "==", uid));
        const doctorSnapshot = await getDocs(doctorQuery);

        if (doctorSnapshot.empty) {
          console.log("No matching documents.");
          return;
        }
        const docData = doctorSnapshot.docs[0].data();
        setDoctor({ ...docData, id: doctorSnapshot.docs[0].id });
      }
    });

    const fetchBlogs = async () => {
      const blogsRef = collection(firestore, "blogs");
      const blogQuery = await getDocs(blogsRef);
      const blogPromises = blogQuery.docs.map(async (docu) => {
        const doctorId = docu.data()?.doctorId;
        if (!doctorId) {
          console.log("Doctor ID missing for blog:", docu.id);
          return null;
        }

        const doctorRef = doc(firestore, "doctors", doctorId);
        const doctorSnapshot = await getDoc(doctorRef);
        if (!doctorSnapshot.exists()) {
          console.log("No matching documents for doctor ID:", doctorId);
          return null;
        }
        return {
          id: docu.id,
          ...docu.data(),
          doctor: { ...doctorSnapshot.data(), id: doctorSnapshot.id },
        };
      });

      // Resolve all promises from the map
      const resolvedBlogs = await Promise.all(blogPromises);
      const filteredBlogs = resolvedBlogs.filter((blog) => blog !== null);
      setBlogs(filteredBlogs);
    };

    fetchBlogs();

    return () => unsubscribe(); // Cleanup the subscription
  }, []);

  return (
    <div className="h-full p-2 overflow-auto lg:mx-48 mx-5">
      <h2 className="text-lg font-bold text-gray-400 m-2">
        Blogs and Articles
      </h2>
      <div className="grid lg:grid-cols-3 grid-cols-2 space-x-2 space-y-2">
        {blogs.map((blog, index) => (
          <BlogCard
            key={blog.id}
            articleTitle={blog.title}
            doctorId={blog.doctor.id}
            blogId={blog.id}
            date={new Date(blog.createdAt.seconds * 1000).toDateString()}
            blogImage={blog.imageURL[0]}
            description={blog.description}
            authorImage={blog.doctor.profileImage}
            authorName={blog.doctor.name}
          />
        ))}
      </div>
      {doctor.id && (
        <button
          className="fixed right-4 top-20 bg-blue-500 rounded-full p-3 shadow-lg"
          onClick={() => {
            router.push(`/blogs/add-blog/${doctor.id}`);
          }}
        >
          <FontAwesomeIcon icon={faPlus} className="text-white text-xl" />
        </button>
      )}
    </div>
  );
}
