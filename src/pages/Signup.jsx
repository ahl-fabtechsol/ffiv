import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const steps = ["Personal Info", "Contact Info", "Password Setup"];

const Signup = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    if (activeStep === 1 && formData.password !== formData.confirmPassword) {
      setPasswordError(true);
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = () => {
    navigate("/verify-email");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (e.target.id === "confirmPassword") {
      setPasswordError(false);
    }
  };

  return (
    <Box className="flex h-screen overflow-hidden">
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

          {activeStep === 0 && (
            <Box className="space-y-6 mt-8">
              <Box className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                <TextField
                  fullWidth
                  id="firstName"
                  label="First Name"
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
                <TextField
                  fullWidth
                  id="lastName"
                  label="Last Name"
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
                  className="w-full"
                  label="Date of Birth"
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
              <TextField
                fullWidth
                id="gender"
                label="Gender"
                select
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
                id="email"
                label="Email Address"
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
              <TextField
                fullWidth
                id="phone"
                label="Phone Number"
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
            </Box>
          )}

          {activeStep === 2 && (
            <Box className="space-y-6 mt-8">
              <TextField
                fullWidth
                id="password"
                label="Password"
                type="password"
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
              <TextField
                fullWidth
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                variant="outlined"
                required
                error={passwordError}
                helperText={passwordError ? "Passwords do not match" : ""}
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
              onClick={
                activeStep === steps.length - 1 ? handleFinish : handleNext
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
