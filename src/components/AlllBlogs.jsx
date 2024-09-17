import React, { useEffect, useState } from "react";
import { collection, db, getDocs } from "../firebase/firebaseConfig";
import Card from "./card";

function AllBlogs() {
  const [blogs, setBlogs] = useState([]);

  const getAllBlogs = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const blogsData = [];
      querySnapshot.forEach((doc) => {
        blogsData.push({ ...doc.data(), id: doc.id });
        console.log(doc.id, " => ", doc.data()); // Log each document's data
      });
      setBlogs(blogsData); // Update state with the collected data
    } catch (error) {
      console.error("Error fetching blogs:", error); // Error handling
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div>
      {blogs.length > 0 ? (
        <div className="flex justify-center gap-3 flex-wrap">
          {blogs.map((item, index) => (
            <div key={item.id}>
              <Card title={item.blogTitle} img={item.blogUrl} />
            </div>
          ))}
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}

export default AllBlogs;
