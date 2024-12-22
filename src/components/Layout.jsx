import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = ({ type }) => {
  return (
    <div>
      <Navbar type={type} />
      <Outlet />
    </div>
  );
};

export default Layout;
