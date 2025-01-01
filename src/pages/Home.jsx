import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
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
      <Link to="/login">
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
      <p className="text-white text-lg  text-center w-full sm:w-[70%]  lg:w-1/2">
        Already have an account? <Link href="/">Log in</Link>
      </p>
    </div>
  );
};

export default Home;
