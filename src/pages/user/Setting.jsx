import {
  Avatar,
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import imageCompression from "browser-image-compression";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { Loader } from "../../components/customLoader/Loader";
import dayjs from "dayjs";
import apiClient from "../../api/apiClient";
import toast from "react-hot-toast";

const Setting = () => {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [previewUrl, setPreviewUrl] = useState(null);
  const userId = useSelector((state) => state?.auth?.user?._id);
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
  const handleImageChange = async (event, setFieldValue) => {
    const file = event.target.files[0];
    console.log(file);
    const compressedFile = await compressImage(file);
    setFieldValue("profilePicture", compressedFile);
    setPreviewUrl(URL.createObjectURL(compressedFile));
  };

  const handleRemovePicture = (setFieldValue) => {
    setFieldValue("profilePicture", null);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
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
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      for (const key in values) {
        if (key === "profilePicture") {
          if (values[key]) {
            formData.append(key, values[key]);
          }
        } else {
          formData.append(key, values[key]);
        }
      }

      const response = await apiClient.patch(
        `auth/user/${userData?._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.ok) {
        setLoading(false);
        toast.error(
          response?.data?.message ||
            "Something went wrong. Please try again later."
        );
        return;
      }
      setLoading(false);
      toast.success("Settings updated.");
    } catch (error) {
      console.error("Signup failed:", error);
      setLoading(false);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const getUserData = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(`auth/user/${userId}`);
      if (!response.ok) {
        setLoading(false);
        toast.error(response?.data?.message || "Failed to fetch user data");
        return;
      }
      setLoading(false);
      setUserData(response?.data?.user);
      setPreviewUrl(response?.data?.user?.profilePicture);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to fetch user data");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Box className="p-4">
      <p className="text-3xl font-bold">Setting</p>
      {userData && (
        <Formik
          enableReinitialize
          initialValues={{
            firstName: userData?.firstName || "",
            lastName: userData?.lastName || "",
            dob: userData?.dob
              ? dayjs(userData?.dob).isValid()
                ? dayjs(userData?.dob)
                : dayjs()
              : null,
            gender: userData?.gender || "",
            country: userData?.country || "",
            email: userData?.email || "",
            phoneNumber: userData?.phoneNumber || "",
            profilePicture: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
          }) => (
            <Form>
              <Box className="mt-4 bg-white rounded-xl p-6 flex flex-col gap-6">
                <Loader loading={loading} />
                <Box className="flex flex-col items-center gap-6">
                  <Avatar
                    src={previewUrl ? previewUrl : ""}
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
                          onChange={(e) => handleImageChange(e, setFieldValue)}
                        />
                      </>
                    )}
                    <Typography variant="caption" color="text.secondary">
                      Upload high-quality profile picture.
                    </Typography>
                  </Box>
                </Box>
                <Box className="flex sm:flex-row flex-col items-center gap-6">
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
                <Box className="flex sm:flex-row flex-col items-center gap-6">
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
                  <Box className="w-full">
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
                  </Box>
                </Box>
                <Box className="flex sm:flex-row flex-col items-center gap-6">
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
                </Box>
                <Box className="flex items-center gap-6">
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
                </Box>
                <Box className="flex justify-end gap-3 items-center">
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      backgroundColor: "#84cc16",
                      color: "white",
                      padding: "12px",
                      width: "100px",
                      borderRadius: "10px",
                      "&:hover": {
                        backgroundColor: "#6aa40f",
                      },
                    }}
                  >
                    Save
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      )}
    </Box>
  );
};

export default Setting;
