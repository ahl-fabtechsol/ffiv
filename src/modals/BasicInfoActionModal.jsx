import * as React from "react";
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
  const { formData, setFormData } = props;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: date,
    }));
  };

  const handleSave = () => {
    props.onSave();
  };
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box className="flex justify-between items-center">
          <p className="text-xl font-bold">Add Basic Info</p>

          <IconButton onClick={props.onClose}>
            <MdCancel size={25} color="black" />
          </IconButton>
        </Box>
        <Box className="my-10 flex flex-col gap-6">
          <Box className="flex flex-col gap-2">
            <p className="text-lg font-semibold">Campaign Name</p>
            <TextField
              fullWidth
              label="Campaign Name"
              value={formData.campaignName}
              name="campaignName"
              onChange={handleChange}
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
                  value={formData.category}
                  name="category"
                  onChange={handleChange}
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
                <InputLabel id="campign-subCategory">Sub Category</InputLabel>
                <Select
                  value={formData.subCategory}
                  name="subCategory"
                  onChange={handleChange}
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
            <p className="text-lg font-semibold">Campaign Short Summary</p>
            <TextField
              fullWidth
              value={formData.campaignSummary}
              name="campaignSummary"
              onChange={handleChange}
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
              value={formData.campaignDetail}
              name="campaignDetail"
              onChange={handleChange}
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
                  value={formData.startDate}
                  name="startDate"
                  onChange={(date) => handleDateChange(date, "startDate")}
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
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Box>
            <Box className="flex flex-col gap-2 w-full">
              <p className="text-lg font-semibold">End Date</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={formData.endDate}
                  name="endDate"
                  onChange={(date) => handleDateChange(date, "endDate")}
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
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Box>
          </Box>
          <Box className="flex flex-col gap-2">
            <p className="text-lg font-semibold">Funding Required</p>
            <TextField
              value={formData.fundingRequired}
              name="fundingRequired"
              onChange={handleChange}
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
              onClick={handleSave}
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
      </Box>
    </Modal>
  );
};

export default BasicInfoActionModal;
