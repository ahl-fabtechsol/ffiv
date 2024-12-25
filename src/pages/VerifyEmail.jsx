import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const VerifyEmail = () => {
  const [code, setCode] = useState(Array(6).fill(""));

  const handleChange = (e, index) => {
    const newCode = [...code];
    newCode[index] = e.target.value.slice(0, 1);
    setCode(newCode);

    if (e.target.value && index < 5) {
      const nextInput = document.getElementById(`input-${index + 1}`);
      nextInput.focus();
    }
  };

  return (
    <Box className="min-h-screen bg-gray-50 flex justify-center items-center">
      <Box className="w-full sm:w-96 bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-center font-semibold text-2xl text-gray-800 mb-6">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Enter the 6-digit verification code we sent to your email.
        </p>

        <Box className="flex justify-between mb-4">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`input-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              maxLength="1"
              className="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="-"
            />
          ))}
        </Box>

        <Box className="flex justify-center">
          <Link to="/">
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
              Verify Code
            </Button>
          </Link>
        </Box>
        <Box className="text-center mt-4">
          <p className="text-gray-600">
            Didn't receive a code?{" "}
            <span className="text-blue-500 cursor-pointer">Resend</span>
          </p>
        </Box>
      </Box>
    </Box>
  );
};

export default VerifyEmail;
