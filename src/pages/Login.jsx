import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Loader } from "../components/customLoader/Loader";
import toast from "react-hot-toast";
import apiClient from "../api/apiClient";
import { useDispatch } from "react-redux";
import { login, setContract } from "../redux/authSlice";
import { contractABI, contractAddress } from "../lib/contract";
import { ethers } from "ethers";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is Required"),
    password: Yup.string().required("Password is required"),
  });

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contractInstance = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        dispatch(
          setContract({
            contract: contractInstance,
            provider: provider,
            account: accounts[0],
          })
        );
      } catch (err) {
        toast.error("Failed to connect wallet");
        console.error(err);
      }
    } else {
      setError("Please install MetaMask to use this application.");
    }
  };
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await apiClient.post("/auth/login", values);
      if (!response.ok) {
        setLoading(false);
        toast.error(response?.data?.message || "Something went wrong");
        return;
      }
      await connectWallet();
      setLoading(false);
      dispatch(
        login({
          accessToken: response?.data?.accessToken,
          refreshToken: response?.data?.refreshToken,
          role: response?.data?.user?.role,
          user: response?.data?.user,
          isLoggedIn: true,
        })
      );

      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };
  return (
    <Box className="flex h-screen">
      <Loader loading={loading} />
      <Box className="w-1/2 h-full hidden sm:block relative">
        <video autoPlay loop muted className="w-full h-full object-cover">
          <source src="/demoVideo.mp4" type="video/mp4" />
        </video>
        <Box className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></Box>
      </Box>

      <Box className="w-full sm:w-1/2 flex items-center justify-center sm:p-12 p-0 bg-white  sm:bg-gray-50">
        <Box className="max-w-md w-full p-8 sm:shadow-lg bg-white rounded-lg">
          <h2 className="text-4xl font-bold text-center mb-8">Welcome Back</h2>
          <p className="text-center text-gray-600 mb-10">
            Sign in to your account
          </p>

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleBlur, errors }) => (
              <Form>
                <Box className="space-y-8">
                  <TextField
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.email}
                    helperText={errors.email}
                    name="email"
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
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.password}
                    helperText={errors.password}
                    name="password"
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
                      type="submit"
                      className="bg_primary p-10 "
                      sx={{
                        textTransform: "none",
                        color: "white",
                        padding: "10px",
                        width: "250px",
                        borderRadius: "50px",
                      }}
                    >
                      Log in
                    </Button>
                  </Box>

                  <p className="text-center text-sm mt-6">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="text-blue-500 hover:underline"
                    >
                      Sign up
                    </Link>
                  </p>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
