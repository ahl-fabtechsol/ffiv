import React, { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { Avatar, Drawer } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { store } from "../redux/store";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const Navbar = ({ type }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const account = store?.getState()?.auth?.account;
  const dispatch = useDispatch();
  const txtColor = type === "other" ? "text-black" : "text-white";
  const userImage = store?.getState()?.auth?.user?.profilePicture;
  const isLoggedIn = store?.getState()?.auth?.isLoggedIn;
  const role = store?.getState()?.auth?.user?.role;
  const navigate = useNavigate();
  const toggleDrawer = (open) => {
    setOpenDrawer(open);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
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

          {isLoggedIn && (
            <Link
              to="/explore"
              className={`${txtColor} hover:text-fdPrimary hidden sm:block`}
            >
              Explore
            </Link>
          )}

          <Link
            to="/campaign"
            className={`${txtColor} hover:text-fdPrimary hidden sm:block`}
          >
            Campaigns
          </Link>

          {role === "AD" && (
            <Link
              to="/admin/dashboard"
              className={`${txtColor} hover:text-fdPrimary hidden sm:block`}
            >
              Admin
            </Link>
          )}
        </div>

        <div className="hidden md:flex flex-row gap-3 items-center">
          {account ? (
            <p className={` ${txtColor}`}>
              Connected:{" "}
              {`${account.substring(0, 6)}...${account.substring(
                account.length - 4
              )}`}
            </p>
          ) : (
            <p className="account-info">Not connected</p>
          )}
          {isLoggedIn ? (
            <>
              <Avatar
                className="flex items-center justify-center cursor-pointer"
                onClick={() => {
                  navigate("/user/dashboard");
                }}
              >
                <img
                  src={userImage || "/profileAvatar.svg"}
                  crossOrigin="anonymous"
                  alt="User Avatar"
                  className="w-10 h-10 object-cover rounded-full"
                />
              </Avatar>
              <IoLogOutOutline
                onClick={handleLogout}
                color={type === "home" ? "white" : "black"}
                size={23}
                className="cursor-pointer hover:text-gray-300"
                style={{ marginBottom: "0.5px" }}
              />
            </>
          ) : (
            <Link to="/login">
              <button className="text-white bg-fdPrimary px-3 py-1 rounded-md">
                Login
              </button>
            </Link>
          )}
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

                {isLoggedIn && (
                  <Link to="/explore" className="text-white text-lg">
                    Explore
                  </Link>
                )}
                <Link to="/campaign" className="text-white text-lg">
                  Campaigns
                </Link>
                {role === "AD" && (
                  <Link to="/admin/dashboard" className="text-white text-lg">
                    Admin
                  </Link>
                )}
              </nav>

              <div className="flex flex-row gap-3 items-center justify-start mt-4">
                {isLoggedIn ? (
                  <>
                    <Avatar
                      className="flex items-center justify-center"
                      onClick={() => {
                        navigate("/user/dashboard");
                      }}
                    >
                      <img
                        src={userImage || "/profileAvatar.svg"}
                        alt="User Avatar"
                        className="w-10 h-10 object-cover rounded-full"
                      />
                    </Avatar>
                    <IoLogOutOutline
                      onClick={handleLogout}
                      size={23}
                      className="cursor-pointer hover:text-gray-300"
                      style={{ marginBottom: "0.5px" }}
                    />
                  </>
                ) : (
                  <Link to="/login">
                    <button className="text-white bg-fdPrimary px-3 py-1 rounded-md">
                      Login
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </Drawer>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
