import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { MdCancel } from "react-icons/md";
import toast from "react-hot-toast";
import apiClient from "../api/apiClient";
import { Loader } from "../components/customLoader/Loader";

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

const UserChangeStatusModal = (props) => {
  const { campainId } = props;
  const [status, setStatus] = useState("A");
  const [loading, setLoading] = useState(false);
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await apiClient.patch(`campaign/${campainId}`, {
        status: status,
      });
      if (!response.ok) {
        setLoading(false);
        toast.error(response?.data?.message || "Failed to change status");
        return;
      }
      setLoading(false);
      toast.success("Status changed successfully");
      props.onAction();
      props.onClose();
    } catch (error) {
      setLoading(false);
      toast.error("Failed to change status");
    }
  };

  useEffect(() => {
    setStatus(props?.status);
  }, []);

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
          <p className="text-xl font-bold">Change Status</p>
          <IconButton onClick={props.onClose}>
            <MdCancel size={25} color="black" />
          </IconButton>
        </Box>

        <Box className="flex flex-col my-10 gap-6">
          <Box>
            <label className="block mb-2 text-gray-700 font-semibold">
              Status
            </label>
            <Select
              value={status}
              onChange={handleStatusChange}
              fullWidth
              sx={{
                borderRadius: "10px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
            >
              <MenuItem value="A">Active</MenuItem>
              <MenuItem value="I">Inactive</MenuItem>
            </Select>
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

export default UserChangeStatusModal;
