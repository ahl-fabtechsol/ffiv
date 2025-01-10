import { Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div
      className="min-h-screen bg-cover bg-center overflow-x-hidden flex flex-col gap-10 items-center justify-center p-6"
      style={{ backgroundImage: "url(/coverImage.jpg)" }}
    >
      <p className="text-white font-extrabold  text-4xl md:text-5xl w-full sm:w-[70%]  lg:w-1/2  text-center">
        Solve problems all around the world
      </p>
      <p className="text-white font-medium text-lg md:text-2xl  w-full sm:w-[70%]  lg:w-1/2 text-center">
        Fund and sign campaigns and missions in all the 234 countries
      </p>
      {isLoggedIn ? (
        <Link to="/explore">
          <Button
            className="bg_primary p-10 "
            sx={{
              textTransform: "none",
              color: "white",
              padding: "10px",
              width: "250px",
              borderRadius: "50px",
            }}
          >
            Explore
          </Button>
        </Link>
      ) : (
        <>
          <Link to="/signup">
            <Button
              className="bg_primary p-10 "
              sx={{
                textTransform: "none",
                color: "white",
                padding: "10px",
                width: "250px",
                borderRadius: "50px",
              }}
            >
              Get Started
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Home;
