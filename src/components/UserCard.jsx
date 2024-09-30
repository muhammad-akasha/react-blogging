import React from "react";
import Swal from "sweetalert2";

function UserCard({
  id,
  blogTitle,
  blogUrl,
  deleteBlog,
  index,
  blogMessage,
  display,
  editBlog,
  date,
}) {
  const formatDate = () => {
    const firebaseDate = date.toDate(); // Convert Firestore Timestamp to Date object
    return firebaseDate.toLocaleDateString("en-US", {
      // Format the date
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const deletAlert = (id, index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Action to delete the blog
        deleteBlog(id, index);
        Swal.fire("Deleted!", "Your blog has been deleted.", "success");
      }
    });
  };
  return (
    <div className="card card-side bg-base-100 shadow-xl p-5 flex-col mx-auto mt-5 w-[90%] sm:w-[600px] md:w-[750px] items-start justify-center">
      <div className="sm:px-8">
        <figure className="w-[80%] sm:w-[400px] h-[250px] m-auto">
          <img
            className="w-full h-full object-fill"
            src={blogUrl}
            alt={blogTitle}
          />
        </figure>
      </div>
      <div className="card-body">
        <h6>{formatDate()}</h6>
        <h2 className="card-title">{blogTitle}</h2>
        <p>{blogMessage}</p>
        <div className="card-actions justify-start mt-3">
          <button
            onClick={() => editBlog(id)}
            className={`btn btn-primary ${display}`}
          >
            Edit
          </button>
          <button
            onClick={() => deletAlert(id, index)}
            className={`btn btn-error ${display}`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
