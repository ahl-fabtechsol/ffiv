import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import { MdCancel } from "react-icons/md";
import toast from "react-hot-toast";
import apiClient from "../api/apiClient";
import { useEffect, useState } from "react";
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

const BackerActionModal = (props) => {
  const { campainId } = props;
  const [backers, setBackers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getBackers = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(`backer?campaignId=${campainId}`);
      if (!response.ok) {
        setLoading(false);
        toast.error(response?.data?.message || "Failed to fetch backers");
        return;
      }
      setLoading(false);
      setBackers(response?.data?.backers);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to fetch backers");
    }
  };

  const handleSave = () => {};
  useEffect(() => {
    getBackers();
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
          <p className="text-xl font-bold">Backers</p>

          <IconButton onClick={props.onClose}>
            <MdCancel size={25} color="black" />
          </IconButton>
        </Box>
        <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-gray-50">
          {backers?.map((backer) => (
            <Box
              key={backer?._id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center"
            >
              <img
                src={backer?.createdBy?.profilePicture}
                alt={`${backer?.firstName}'s profile`}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                {backer?.createdBy?.firstName +
                  " " +
                  backer?.createdBy?.lastName}
              </h3>
              <p className="text-gray-600 text-sm mb-2">{backer?.comment}</p>
              <p className="text-gray-900 font-medium">
                Pledged:{" "}
                <span className="text-green-600">${backer?.moneyPledged}</span>
              </p>
            </Box>
          ))}
        </Box>
        <Box className="flex flex-col my-10 gap-6">
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

export default BackerActionModal;
