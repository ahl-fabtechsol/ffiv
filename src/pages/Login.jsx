import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Box className="flex h-screen">
      <Box className="w-1/2 h-full hidden sm:block relative">
        <video autoPlay loop muted className="w-full h-full object-cover">
          <source src="/demoVideo.mp4" type="video/mp4" />
        </video>
        <Box className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></Box>
      </Box>

      <Box className="w-full sm:w-1/2 flex items-center justify-center p-12 bg-gray-50">
        <Box className="max-w-md w-full p-8 shadow-lg bg-white rounded-lg">
          <h2 className="text-4xl font-bold text-center mb-8">Welcome Back</h2>
          <p className="text-center text-gray-600 mb-10">
            Sign in to your account
          </p>

          <Box className="space-y-8">
            <TextField
              fullWidth
              id="email"
              label="Email Address"
              variant="outlined"
              required
              className="bg-white"
              sx={{
                "& label.Mui-focused": {
                  color: "#84cc16",
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#84cc16",
                  },
                },
              }}
            />
            <TextField
              fullWidth
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              required
              className="bg-white"
              sx={{
                "& label.Mui-focused": {
                  color: "#84cc16",
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#84cc16",
                  },
                },
              }}
            />

            <Box className="flex justify-between items-center">
              <Link className="text-blue-500 hover:underline">
                Forgot Password?
              </Link>
            </Box>

            <Box className="flex justify-center">
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
                <Link to="/">Log in</Link>
              </Button>
            </Box>

            <p className="text-center text-sm mt-6">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
