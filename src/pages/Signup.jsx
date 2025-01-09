import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  Avatar,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MdDelete } from "react-icons/md";
import { IoCloudUploadOutline } from "react-icons/io5";
import imageCompression from "browser-image-compression";
import toast from "react-hot-toast";
import { Loader } from "../components/customLoader/Loader";
import apiClient from "../api/apiClient";

const steps = ["Personal Info", "Contact Info", "Password Setup"];

const Signup = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleNext = async (values) => {
    if (activeStep === 0) {
      try {
        await validationSchema.validate(values, { abortEarly: false });
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } catch (errors) {
        const errorPaths = errors.inner.map((error) => error.path);
        const invalidFields = ["dob", "firstName", "lastName", "gender"];
        const hasError = invalidFields.some((field) =>
          errorPaths.includes(field)
        );
        if (hasError) {
          console.log(
            "Validation failed for one of the required fields.",
            hasError
          );
          return;
        }
      }
    }

    if (activeStep === 1) {
      try {
        await validationSchema.validate(values, { abortEarly: false });
      } catch (errors) {
        const errorPaths = errors.inner.map((error) => error.path);
        const invalidFields = ["country", "email", "phoneNumber"];
        const hasError = invalidFields.some((field) =>
          errorPaths.includes(field)
        );
        if (hasError) {
          console.log(
            "Validation failed for one of the required fields.",
            hasError
          );
          return;
        }
      }
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const compressImage = async (imageFile) => {
    const options = {
      maxSizeMB: 3,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(imageFile, options);
      const file = new File([compressedFile], compressedFile.name, {
        type: compressedFile.type,
      });
      return file;
    } catch (error) {
      console.error("Image compression failed:", error.message);
      return imageFile;
    }
  };

  const handleFinish = async (values) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
    } catch (errors) {
      const errorPaths = errors.inner.map((error) => error.path);
      const invalidFields = ["password", "confirmPassword"];
      const hasError = invalidFields.some((field) =>
        errorPaths.includes(field)
      );
      if (hasError) {
        console.log(
          "Validation failed for one of the required fields.",
          hasError
        );
        return;
      }
    }
  };

  const handleImageChange = async (event, setFieldValue) => {
    const file = event.target.files[0];
    console.log(file);
    const compressedFile = await compressImage(file);
    setFieldValue("profilePicture", compressedFile);
  };

  const handleRemovePicture = (setFieldValue) => {
    setFieldValue("profilePicture", null);
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    dob: Yup.date().required("Date of Birth is required"),
    gender: Yup.string().required("Date of Birth is Required"),
    country: Yup.string().required("Country is required"),
    phoneNumber: Yup.string()
      .required("Phone Number is required")
      .min(10, "Phone Number must be 10 digits")
      .max(15, "Phone Number must be 15 digits"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    console.log(values);
    try {
      const formData = new FormData();
      for (const key in values) {
        if (key === "profilePicture") {
          formData.append(key, values[key]);
        } else {
          formData.append(key, values[key]);
        }
      }

      const response = await apiClient.post("auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response.ok) {
        setLoading(false);
        toast.error(
          response?.data?.message ||
            "Something went wrong. Please try again later."
        );
        return;
      }
      setLoading(false);
      toast.success("Account created successfully.");
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error);
      setLoading(false);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <Box className="flex h-screen overflow-hidden">
      <Loader loading={loading} />
      <Box className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-gray-50 overflow-y-auto">
        <Box className="w-full p-8 shadow-lg bg-white rounded-lg">
          <h2 className="text-4xl font-bold text-center mb-8">Sign Up</h2>
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={{
              "& .MuiStepIcon-root": {
                color: "gray",
                "&.Mui-active": { color: "#84cc16" },
                "&.Mui-completed": { color: "#84cc16" },
              },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              dob: null,
              gender: "",
              country: "",
              email: "",
              phoneNumber: "",
              password: "",
              confirmPassword: "",
              profilePicture: null,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              setFieldValue,
              isSubmitting,
              touched,
              errors,
              handleChange,
              handleBlur,
            }) => (
              <Form>
                {activeStep === 0 && (
                  <Box className="space-y-6 mt-8">
                    <Box className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                      <TextField
                        fullWidth
                        label="First Name"
                        value={values.firstName}
                        name="firstName"
                        variant="outlined"
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.firstName && errors.firstName}
                        helperText={touched.firstName && errors.firstName}
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
                        value={values.lastName}
                        name="lastName"
                        label="Last Name"
                        variant="outlined"
                        error={touched.lastName && errors.lastName}
                        helperText={touched.lastName && errors.lastName}
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                    </Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
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
                        value={values.dob}
                        onChange={(newValue) => {
                          setFieldValue("dob", newValue);
                        }}
                        name="dob"
                        className="w-full"
                        label="Date of Birth"
                        renderInput={(params) => (
                          <TextField {...params} fullWidth />
                        )}
                      />
                    </LocalizationProvider>
                    <ErrorMessage
                      name="dob"
                      component="div"
                      className="text-red-500"
                    />
                    <TextField
                      fullWidth
                      id="gender"
                      label="Gender"
                      select
                      variant="outlined"
                      required
                      value={values.gender}
                      onBlur={handleBlur}
                      name="gender"
                      error={touched.gender && errors.gender}
                      helperText={touched.gender && errors.gender}
                      onChange={(e) => setFieldValue("gender", e.target.value)}
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
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </TextField>
                  </Box>
                )}

                {activeStep === 1 && (
                  <Box className="space-y-6 mt-8">
                    <TextField
                      fullWidth
                      id="country"
                      label="Country"
                      variant="outlined"
                      required
                      value={values.country}
                      name="country"
                      error={touched.country && errors.country}
                      helperText={touched.country && errors.country}
                      onChange={handleChange}
                      onBlur={handleBlur}
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
                      id="email"
                      label="Email Address"
                      onBlur={handleBlur}
                      variant="outlined"
                      required
                      value={values.email}
                      helperText={touched.email && errors.email}
                      name="email"
                      error={touched.email && errors.email}
                      onChange={handleChange}
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
                      id="phone"
                      label="Phone Number"
                      value={values.phoneNumber}
                      onBlur={handleBlur}
                      name="phoneNumber"
                      error={touched.phoneNumber && errors.phoneNumber}
                      helperText={touched.phoneNumber && errors.phoneNumber}
                      variant="outlined"
                      required
                      onChange={handleChange}
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
                    <Box className="flex flex-col items-center gap-6">
                      <Avatar
                        src={
                          values.profilePicture
                            ? URL.createObjectURL(values.profilePicture)
                            : ""
                        }
                        sx={{
                          width: 100,
                          height: 100,
                          border: "3px solid #84cc16",
                        }}
                      />
                      <Box className="flex flex-col gap-2">
                        {values.profilePicture ? (
                          <Button
                            onClick={() => handleRemovePicture(setFieldValue)}
                            startIcon={<MdDelete />}
                            variant="outlined"
                            color="error"
                            size="small"
                          >
                            Remove Image
                          </Button>
                        ) : (
                          <>
                            <Button
                              onClick={handleButtonClick}
                              component="label"
                              startIcon={<IoCloudUploadOutline />}
                              variant="contained"
                              sx={{
                                backgroundColor: "#84cc16",
                                "&:hover": { backgroundColor: "#6aa40f" },
                              }}
                            >
                              Upload Image
                            </Button>
                            <input
                              type="file"
                              hidden
                              accept="image/*"
                              ref={fileInputRef}
                              onChange={(e) =>
                                handleImageChange(e, setFieldValue)
                              }
                            />
                          </>
                        )}
                        <Typography variant="caption" color="text.secondary">
                          Upload high-quality profile picture.
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                )}

                {activeStep === 2 && (
                  <Box className="space-y-6 mt-8">
                    <TextField
                      fullWidth
                      id="password"
                      label="Password"
                      onBlur={handleBlur}
                      type="password"
                      variant="outlined"
                      required
                      value={values.password}
                      name="password"
                      error={touched.password && errors.password}
                      helperText={touched.password && errors.password}
                      onChange={handleChange}
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
                      id="confirmPassword"
                      label="Confirm Password"
                      value={values.confirmPassword}
                      name="confirmPassword"
                      error={touched.confirmPassword && errors.confirmPassword}
                      type="password"
                      variant="outlined"
                      required
                      onChange={handleChange}
                      helperText={
                        touched.confirmPassword && errors.confirmPassword
                      }
                      onBlur={handleBlur}
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
                  </Box>
                )}

                <Box className="flex justify-between mt-8">
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className="bg_primary p-10 "
                    sx={{
                      textTransform: "none",
                      color: "white",
                      padding: "10px",
                      borderRadius: "50px",
                    }}
                  >
                    Back
                  </Button>

                  <Button
                    type="submit"
                    onClick={
                      activeStep === steps.length - 1
                        ? () => handleFinish(values)
                        : () => handleNext(values)
                    }
                    className="bg_primary p-10 "
                    sx={{
                      textTransform: "none",
                      color: "white",
                      padding: "10px",
                      borderRadius: "50px",
                    }}
                  >
                    {activeStep === steps.length - 1 ? "Sign Up" : "Next"}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>

          <p className="text-center text-sm mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </Box>
      </Box>

      <Box className="w-1/2 h-screen hidden md:block relative overflow-hidden">
        <video autoPlay loop muted className="w-full h-full object-cover">
          <source src="/demoVideo.mp4" type="video/mp4" />
        </video>
        <Box className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></Box>
      </Box>
    </Box>
  );
};

export default Signup;
