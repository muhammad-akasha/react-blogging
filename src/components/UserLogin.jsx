import { onAuthStateChanged, auth, signOut } from "../firebase/firebaseConfig";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const userContext = createContext();

function UserLogin() {
  const navigate = useNavigate();
  const [currUser, setCurrUser] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setCurrUser(user);
        navigate("/");
        setLoading(true);
      } else {
        navigate("/login");
      }
    });
  }, [navigate]);

  const logout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addBlog = () => {
    navigate(`/addblog/${currUser.uid}`);
  };

  return (
    <>
      {loading ? (
        <div className="drawer">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            {/* Navbar */}
            <div className="navbar bg-[#494949] text-white w-full">
              <div className="flex-none lg:hidden">
                <label
                  htmlFor="my-drawer-3"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-6 w-6 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
              </div>
              <div className="mx-2 flex-1 px-2">React Blog App</div>
              <div className="hidden flex-none lg:block">
                <ul className="menu menu-horizontal items-center">
                  {/* Navbar menu content here */}
                  <li>
                    <div className="flex gap-2">
                      <img
                        className="rounded-[50%] size-[60px] bg-cover"
                        src={currUser.photoURL}
                        alt="profilepic"
                      />
                      <a>{currUser.displayName}</a>
                    </div>
                  </li>
                  <li>
                    <a onClick={addBlog}>Add Blogs</a>
                  </li>
                  <li>
                    <a onClick={logout}>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-3"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 min-h-full w-80 p-4">
              <li>
                <div className="flex gap-2">
                  <img
                    className="rounded-[50%] size-[40px] bg-cover"
                    src={currUser.photoURL}
                    alt="profilepic"
                  />
                  <a>{currUser.displayName}</a>
                </div>
              </li>
              <li>
                <a onClick={addBlog}>Add Blogs</a>
              </li>
              <li>
                <a onClick={logout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
}

export default UserLogin;
