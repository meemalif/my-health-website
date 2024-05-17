"use client";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../firebase";

const BlogComponent = ({ blogID }) => {
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const blogRef = doc(firestore, "blogs", blogID); // Define the document reference
      const docSnap = await getDoc(blogRef);

      if (docSnap.exists()) {
        setBlog(docSnap.data()); // Set the blog state if the document exists
      } else {
        console.log("No such document!");
      }
    };

    fetchBlog();
  }, [blogID]); // Dependency array to re-run the effect if blogID changes

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
    </div>
  );
};

export default BlogComponent;
