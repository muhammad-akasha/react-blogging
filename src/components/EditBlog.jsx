import React, { useEffect, useState } from "react";
import BlogForm from "./BlogForm";
import { useForm } from "react-hook-form";
import {
  getSingleDoc,
  imageToUrl,
  updateSingleDoc,
} from "../firebase/firebaseFunc";
import { useNavigate, useParams } from "react-router-dom";
import { Triangle } from "react-loader-spinner";
import Swal from "sweetalert2";

function EditBlog() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the blog ID from the URL
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(true);

  async function getSingleBlog() {
    const singleBlog = await getSingleDoc(id, "blogs");
    // console.log(singleBlog);

    // Set all the default values at once using reset()
    reset({
      blogTitle: singleBlog.blogTitle,
      blogMessage: singleBlog.blogMessage,
    });
    setLoading(false);
  }

  useEffect(() => {
    getSingleBlog();
  }, [id, reset]); // Add reset and id as dependencies
  const addingBlog = async (data) => {
    const { blogImg, blogTitle, blogMessage } = data;
    setIsSubmitting(true);
    try {
      let url = ""; // Initialize URL

      // Check if blogImg exists and has files
      if (blogImg && blogImg.length > 0) {
        url = await imageToUrl(blogImg, "BlogImage"); // Access the first file
      }

      // Update the document, including url if it exists
      await updateSingleDoc(id, "blogs", blogTitle, blogMessage, url);
    } catch (error) {
      console.log(error);
    } finally {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Your Blog Has Been Edited",
        showConfirmButton: false,
        timer: 1500,
      });
      setIsSubmitting(false);
    }
    // Navigate to another page after updating
    navigate("/addblog");
  };

  return (
    <div>
      {loading ? (
        <div className="absolute top-0 flex justify-center items-center w-full h-full bg-black">
          <Triangle
            visible={true}
            height="100"
            width="100"
            color="#fff"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <BlogForm
          register={register}
          handleSubmit={handleSubmit}
          addingBlog={addingBlog}
          errors={errors}
          isRequired={false}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}

export default EditBlog;
