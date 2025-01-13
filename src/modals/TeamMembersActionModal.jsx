import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Avatar, IconButton, TextField, Typography } from "@mui/material";
import { MdCancel, MdDelete } from "react-icons/md";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import imageCompression from "browser-image-compression";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import apiClient from "../api/apiClient";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "100%",
    sm: "80%",
    md: "70%",
  },
  maxHeight: {
    xs: "100vh",
    sm: "80vh",
  },
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  borderRadius: {
    sm: "0px",
    md: "10px",
  },
  p: 3,
  overflowY: "auto",
  "::-webkit-scrollbar": {
    width: "0px",
  },
  "-ms-overflow-style": "none",
  "scrollbar-width": "none",
};

const TeamMembersActionModal = (props) => {
  const { campaignId, type, data, setLoading } = props;
  const [previewUrl, setPreviewUrl] = useState("");
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
    const compressedFile = await compressImage(file);
    setFieldValue("image", compressedFile);
    const preview = URL.createObjectURL(compressedFile);
    setPreviewUrl(preview);
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    role: Yup.string().required("Role is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    if (!values.image) {
      setLoading(false);
      return toast.error("Please upload an image");
    }
    try {
      const formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }
      formData.append("campaignId", campaignId);
      const response = await apiClient.post("team-member", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (!response.ok) {
        setLoading(false);
        return toast.error(
          response?.data?.message || "Failed to add team member"
        );
      }
      setLoading(false);
      toast.success("Team member added successfully");
      props.onAction();
      props.onClose();
    } catch (error) {
      setLoading(false);
      toast.error("Failed to add team member");
    }
  };

  const handleEdit = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      for (let key in values) {
        if (key === "image") {
          if (values.image) {
            formData.append(key, values[key]);
          }
        } else {
          formData.append(key, values[key]);
        }
      }
      formData.append("campaignId", campaignId);
      const response = await apiClient.patch(
        `team-member/${data?._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (!response.ok) {
        setLoading(false);
        return toast.error(
          response?.data?.message || "Failed to update team member"
        );
      }
      setLoading(false);
      toast.success("Team member updated successfully");
      props.onAction();
      props.onClose();
    } catch (error) {
      setLoading(false);
      toast.error("Failed to update team member");
    }
  };

  useEffect(() => {
    if (type === "edit") {
      setPreviewUrl(data?.image);
    }
  }, [type, data]);

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box className="flex justify-between items-center">
          <p className="text-xl font-bold">
            {type === "edit" ? "Edit" : "Add"} Team Members
          </p>

          <IconButton onClick={props.onClose}>
            <MdCancel size={25} color="black" />
          </IconButton>
        </Box>
        <Formik
          initialValues={{
            name: type === "edit" ? data?.name : "",
            role: type === "edit" ? data?.role : "",
            email: type === "edit" ? data?.email : "",
            image: null,
          }}
          validationSchema={validationSchema}
          onSubmit={type === "edit" ? handleEdit : handleSubmit}
        >
          {({ values, handleChange, handleBlur, errors, setFieldValue }) => (
            <Form>
              <Box className="flex flex-col my-10 gap-6">
                <Box className="flex flex-col gap-3">
                  <p className="text-3xl font-bold">Team Members</p>
                  <p className="text-sm font-extralight">
                    You can customize the team members by adding or removing
                    them.
                  </p>
                </Box>
                <Box className="flex flex-col gap-6 p-6 border rounded-xl bg-white my-3">
                  <Box className="flex xs:flex-row flex-col items-center gap-6">
                    <Avatar
                      src={previewUrl}
                      sx={{
                        width: 100,
                        height: 100,
                        border: "3px solid #84cc16",
                      }}
                    />
                    <Box className="flex flex-col gap-2">
                      {values.image ? (
                        <Button
                          onClick={() => setFieldValue("image", null)}
                          startIcon={<MdDelete />}
                          variant="outlined"
                          color="error"
                          size="small"
                        >
                          Remove Image
                        </Button>
                      ) : (
                        <Button
                          component="label"
                          startIcon={<IoCloudUploadOutline />}
                          variant="contained"
                          sx={{
                            backgroundColor: "#84cc16",
                            "&:hover": { backgroundColor: "#6aa40f" },
                          }}
                        >
                          Upload Image
                          <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={(e) =>
                              handleImageChange(e, setFieldValue)
                            }
                          />
                        </Button>
                      )}
                      <Typography variant="caption" color="text.secondary">
                        Upload high-quality profile picture.
                      </Typography>
                    </Box>
                  </Box>

                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="name"
                    error={errors.name}
                    helperText={errors.name}
                    required
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
                    label="Role"
                    variant="outlined"
                    value={values.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="role"
                    error={errors.role}
                    helperText={errors.role}
                    required
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
                    label="Email"
                    variant="outlined"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="email"
                    error={errors.email}
                    helperText={errors.email}
                    required
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

                <Box className="flex justify-end gap-3 items-center mt-4">
                  <Button
                    onClick={props.onClose}
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      backgroundColor: "#B0B0B0",
                      color: "white",
                      padding: "12px",
                      width: "100px",
                      borderRadius: "10px",
                      "&:hover": {
                        backgroundColor: "#8C8C8C",
                      },
                    }}
                  >
                    Cancel
                  </Button>

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
      </Box>
    </Modal>
  );
};

export default TeamMembersActionModal;
