"use client";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../firebase";
import ImageTitle from "./ImageTitle";
import parse from "html-react-parser";

const BlogComponent = ({ params }) => {
  const { blogID } = params;
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogRef = doc(firestore, "blogs", blogID);
        const docSnap = await getDoc(blogRef);

        if (docSnap.exists()) {
          setBlog(docSnap.data());
          console.log("Document data:", docSnap.data());
        } else {
          console.log("No such document!");
          setBlog({}); // Optionally set blog to an empty object or appropriate error state
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        // Handle or log error appropriately
      }
    };

    fetchBlog();
  }, [blogID]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="lg:mx-48 bg-white px-10 rounded-lg">
      <ImageTitle
        author={blog!.author_name}
        date={new Date(blog.created_at).toLocaleDateString()}
        image={blog.imageURL[0]}
        tag={"Health"}
        title={blog.title}
      />
      <h1>{blog.title}</h1>
      {parse(blog.content)}
    </div>
  );
};

export default BlogComponent;
