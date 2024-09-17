import React from "react";
import { Outlet } from "react-router-dom";
import UserLogin from "./components/UserLogin";
import AllBlogs from "./components/AlllBlogs";

function Layout() {
  return (
    <>
      <UserLogin />
      <AllBlogs />
      <Outlet />
    </>
  );
}

export default Layout;
