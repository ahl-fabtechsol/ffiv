import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { MdCancel } from "react-icons/md";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { useState } from "react";
import { Loader } from "../components/customLoader/Loader";
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

const BasicInfoActionModal = (props) => {
  const { type, data } = props;
  const [loading, setLoading] = useState(false);
  const handleSave = (values) => {
    props.onSave(values);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Campaign Name is required"),
    category: Yup.string().required("Category is required"),
    subCategory: Yup.string().required("Sub Category is required"),
    shortSummary: Yup.string().required("Campaign Short Summary is required"),
    detail: Yup.string().required("Campaign Detail is required"),
    startDate: Yup.string().required("Start Date is required"),
    endDate: Yup.string().required("End Date is required"),
    funding: Yup.string().required("Funding Required is required"),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await apiClient.post("campaign", values);
      if (!response.ok) {
        setLoading(false);
        toast.error(response?.data?.message || "Failed to save basic info");
        return;
      }
      setLoading(false);
      toast.success("Basic info saved successfully");
      handleSave(response?.data?.campaign);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to save basic info");
    }
  };

  const handleEdit = async (values) => {
    setLoading(true);
    try {
      const response = await apiClient.patch(`campaign/${data?._id}`, values);
      if (!response.ok) {
        setLoading(false);
        toast.error(response?.data?.message || "Failed to save basic info");
        return;
      }
      setLoading(false);
      toast.success("Basic info saved successfully");
      handleSave(response?.data?.campaign);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to save basic info");
    }
  };

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Loader loading={loading} />
        <Box className="flex justify-between items-center">
          <p className="text-xl font-bold">
            {type === "edit" ? "Edit" : "Add"} Basic Info
          </p>

          <IconButton onClick={props.onClose}>
            <MdCancel size={25} color="black" />
          </IconButton>
        </Box>
        <Formik
          initialValues={{
            name: type === "edit" ? data?.name : "",
            category: type === "edit" ? data?.category : "",
            subCategory: type === "edit" ? data?.subCategory : "",
            shortSummary: type === "edit" ? data?.shortSummary : "",
            detail: type === "edit" ? data?.detail : "",
            startDate:
              type === "edit"
                ? dayjs(data?.startDate).isValid()
                  ? dayjs(data?.startDate)
                  : dayjs()
                : dayjs(),
            endDate:
              type === "edit"
                ? dayjs(data?.endDate).isValid()
                  ? dayjs(data?.endDate)
                  : dayjs()
                : dayjs().add(1, "day"),
            funding: type === "edit" ? data?.funding : "",
          }}
          validationSchema={validationSchema}
          onSubmit={type === "edit" ? handleEdit : handleSubmit}
        >
          {({ values, errors, handleChange, setFieldValue, handleBlur }) => (
            <Form>
              <Box className="my-10 flex flex-col gap-6">
                <Box className="flex flex-col gap-2">
                  <p className="text-lg font-semibold">Campaign Name</p>
                  <TextField
                    fullWidth
                    label="Campaign Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.name ? true : false}
                    helperText={errors.name}
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
                </Box>
                <Box className="flex sm:flex-row flex-col gap-6 ">
                  <Box className="flex flex-col w-full">
                    <p className="text-lg font-semibold">Category</p>
                    <FormControl
                      fullWidth
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
                      <InputLabel id="campign-category">Category</InputLabel>
                      <Select
                        fullWidth
                        value={values.category}
                        name="category"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.category ? true : false}
                        helperText={errors.category}
                        className=" bg-white"
                        labelId="campaign-category"
                        label="Category"
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box className="flex flex-col w-full">
                    <p className="text-lg font-semibold">Sub Category</p>
                    <FormControl
                      fullWidth
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
                      <InputLabel id="campign-subCategory">
                        Sub Category
                      </InputLabel>
                      <Select
                        value={values.subCategory}
                        name="subCategory"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.subCategory ? true : false}
                        helperText={errors.subCategory}
                        fullWidth
                        className=" bg-white"
                        labelId="campaign-subCategory"
                        label="Sub Category"
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                <Box className="flex flex-col gap-2">
                  <p className="text-lg font-semibold">
                    Campaign Short Summary
                  </p>
                  <TextField
                    fullWidth
                    value={values.shortSummary}
                    name="shortSummary"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.shortSummary ? true : false}
                    helperText={errors.shortSummary}
                    label="Write a short detail"
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
                </Box>
                <Box className="flex flex-col gap-2">
                  <p className="text-lg font-semibold">Campaign Detail</p>
                  <TextField
                    rows={6}
                    multiline
                    value={values.detail}
                    name="detail"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.detail ? true : false}
                    helperText={errors.detail}
                    fullWidth
                    label="Write a short detail"
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
                </Box>
                <Box className="flex sm:flex-row flex-col gap-6 ">
                  <Box className="flex flex-col gap-2 w-full">
                    <p className="text-lg font-semibold">Start Date</p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={values.startDate}
                        name="startDate"
                        onChange={(date) => setFieldValue("startDate", date)}
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
                        className="w-full bg-white"
                        label="Start Date"
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            error={errors.startDate}
                            helperText={errors.startDate}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Box>
                  <Box className="flex flex-col gap-2 w-full">
                    <p className="text-lg font-semibold">End Date</p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={values.endDate}
                        name="endDate"
                        onChange={(date) => setFieldValue("endDate", date)}
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
                        className="w-full bg-white"
                        label="End Date"
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            error={errors.endDate}
                            helperText={errors.endDate}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Box>
                </Box>
                <Box className="flex flex-col gap-2">
                  <p className="text-lg font-semibold">Funding Required</p>
                  <TextField
                    value={values.funding}
                    name="funding"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.funding ? true : false}
                    helperText={errors.funding}
                    fullWidth
                    label="Funding Required"
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
                </Box>
                <Box className="flex justify-end gap-3 items-center">
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

export default BasicInfoActionModal;
