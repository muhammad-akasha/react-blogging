import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  db,
  collection,
  addDoc,
  storage,
  ref,
  getDownloadURL,
  uploadBytes,
  onAuthStateChanged,
  auth,
} from "./../firebase/firebaseConfig";

function AddBlog() {
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addingBlog = async (data) => {
    console.log(data);

    const { blogImg, blogTitle, blogMessage } = data;

    try {
      const storageRef = ref(storage, `BlogImage/${blogImg[0].name}`); // create a ref in firebase storage

      // Uploading the image
      await uploadBytes(storageRef, blogImg[0]); // adding image in storage

      // Getting the URL of the profile picture
      const blogUrl = await getDownloadURL(storageRef); //getting url of profile picture

      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "blogs"), {
        blogUrl,
        blogTitle,
        blogMessage,
        uid: user.uid,
        userName: user.displayName,
        userPic: user.photoURL,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mt-[50px] shadow-lg w-[90%] sm:w-[500px]  md:w-[500px] p-[50px] rounded-md m-auto">
      <h2 className="text-center text-[26px] font-semibold">ADD BLOG</h2>
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit(addingBlog)}>
        <div className="mb-5">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="blogImg"
          >
            Upload blog image
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="user_avatar_help"
            id="user_avatar"
            type="file"
            {...register("blogImg")}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="blogTitle"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Blog Title
          </label>
          <input
            type="text"
            id="blogTitle"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="blog title"
            required=""
            {...register("blogTitle")}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your message
          </label>
          <textarea
            id="message"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Leave a comment..."
            defaultValue={""}
            {...register("blogMessage")}
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add Blog
        </button>
      </form>
    </div>
  );
}

export default AddBlog;
