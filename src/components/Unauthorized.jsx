import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold text-red-600">Unauthorized</h1>
      <p className="text-lg mt-4">
        You do not have permission to access this page.
      </p>
      <Button
        onClick={() => navigate("/")}
        className="bg_primary p-10  mt-4"
        sx={{
          textTransform: "none",
          color: "white",
          padding: "10px",
          width: "250px",
          borderRadius: "50px",
        }}
      >
        Go to Home
      </Button>
    </div>
  );
};

export default Unauthorized;
