import React, { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { FiSearch } from "react-icons/fi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { Avatar, Input, Drawer } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = ({ type }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const txtColor = type === "other" ? "text-black" : "text-white";

  // Function to toggle the drawer
  const toggleDrawer = (open) => {
    setOpenDrawer(open);
  };

  return (
    <nav
      className={
        type === "home"
          ? "absolute top-0 left-0 w-full z-50 bg-transparent"
          : "bg-white shadow-md"
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="text-white flex flex-row gap-6 items-center">
          <div className="flex flex-row gap-2 items-center">
            <img src="/mainLogo.svg" alt="FundFiesta" className="w-8 h-8" />
            <Link
              to="/"
              className={`${txtColor} hover:text-fdPrimary hidden xs:block`}
            >
              FundFiesta
            </Link>
          </div>

          <Link
            to="/"
            className={`${txtColor} hover:text-fdPrimary hidden sm:block`}
          >
            Home
          </Link>
          <Link
            to="/explore"
            className={`${txtColor} hover:text-fdPrimary hidden sm:block`}
          >
            Explore
          </Link>
          <Link
            to="/campaign"
            className={`${txtColor} hover:text-fdPrimary hidden sm:block`}
          >
            Campaigns
          </Link>
        </div>

        <div className="hidden md:flex flex-row gap-3 items-center">
          {type === "home" ? (
            <div className="relative">
              <Input
                type="text"
                placeholder="Search"
                className="pl-8 bg-transparent text-white placeholder:text-white"
              />
              <span className="absolute inset-y-0 left-0 flex items-center pr-3">
                <FiSearch className="text-white ml-3" />
              </span>
            </div>
          ) : (
            ""
          )}
          <IoIosAddCircleOutline
            size={25}
            className={`cursor-pointer hover:text-fdPrimary ${txtColor}`}
          />
          <Avatar className="flex items-center justify-center">
            <img
              src="/profileAvatar.svg"
              alt="User Avatar"
              className="w-8 h-8"
            />
          </Avatar>
          <IoSettingsOutline
            size={23}
            className={`cursor-pointer hover:text-fdPrimary ${txtColor}`}
            style={{ marginBottom: "0.5px" }}
          />
        </div>

        <div className="md:hidden">
          <button className={`${txtColor}`} onClick={() => toggleDrawer(true)}>
            <IoMdMenu className="h-6 w-6" />
          </button>

          <Drawer
            anchor="right"
            open={openDrawer}
            onClose={() => toggleDrawer(false)}
          >
            <div className="bg-black text-white p-6 w-64 h-screen">
              <div className="flex justify-end mb-4">
                <button onClick={() => toggleDrawer(false)}>
                  <RxCross1 className="h-6 w-6 text-white" />
                </button>
              </div>
              <nav className="flex flex-col space-y-4 mt-8">
                <Link
                  to="/"
                  className="text-white hover:text-gray-300 xs:hidden text-3xl"
                >
                  FundFiesta
                </Link>
                <Link to="/" className="text-white text-lg">
                  Home
                </Link>
                <Link to="/explore" className="text-white text-lg">
                  Explore
                </Link>
                <Link to="/campaign" className="text-white text-lg">
                  Campaigns
                </Link>
              </nav>

              <div className="flex flex-row gap-3 items-center justify-end mt-4">
                <IoIosAddCircleOutline
                  color="white"
                  size={25}
                  className="cursor-pointer hover:text-gray-300"
                />
                <Avatar className="flex items-center justify-center">
                  <img
                    src="/profileAvatar.svg"
                    alt="User Avatar"
                    className="w-8 h-8"
                  />
                </Avatar>
                <IoSettingsOutline
                  color="white"
                  size={23}
                  className="cursor-pointer hover:text-gray-300"
                  style={{ marginBottom: "0.5px" }}
                />
              </div>
            </div>
          </Drawer>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
