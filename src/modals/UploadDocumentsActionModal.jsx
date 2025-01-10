import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import { MdCancel } from "react-icons/md";
import VideoUpload from "../components/VideoUpload";
import ImageUpload from "../components/ImageUpload";
import { useEffect, useState } from "react";
import { Loader } from "../components/customLoader/Loader";
import toast from "react-hot-toast";
import apiClient from "../api/apiClient";
import axios from "axios";

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

const UploadDocumentsActionModal = (props) => {
  const { type, data, campaignId } = props;
  const [videoFile, setVideoFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSave = async () => {
    if (!videoFile || !imageFile) {
      toast.error("Both and image and video are required");
      return;
    }
    setLoading(true);
    try {
      const response = await apiClient.get("document/pre-signed", {
        fileName: videoFile.name,
        fileType: videoFile.type,
      });
      if (!response.ok) {
        setLoading(false);
        toast.error(
          response?.data?.message ||
            "An error occured while getting pre-signed url"
        );
        return;
      }
      const { url, fileKey } = response?.data;

      const config = {
        headers: {
          "Content-Type": videoFile.type,
        },
        onUploadProgress: (progressEvent) => {
          const percentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );

          toast.loading(`Uploading Video ... ${percentage}%`, { id: "upload" });

          if (percentage === 100) {
            toast.success("Upload complete!", { id: "upload" });
          }
        },
      };

      await axios.put(url, videoFile, config);

      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("videoKey", fileKey);
      formData.append("campaignId", campaignId);

      const documentResponse = await apiClient.post("document", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (!documentResponse.ok) {
        setLoading(false);
        toast.error(
          documentResponse?.data?.message ||
            "An error occured while saving documents"
        );
        return;
      }
      setLoading(false);
      toast.success("Documents uploaded successfully");
      props.onClose();
      props.onAction();
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("An error occured while uploading documents");
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
            {type === "edit" ? "Edit" : "Upload"} Doccuments
          </p>

          <IconButton onClick={props.onClose}>
            <MdCancel size={25} color="black" />
          </IconButton>
        </Box>
        <Box className="flex flex-col my-10 gap-6">
          <VideoUpload setVideoFile={setVideoFile} />
          <ImageUpload setImageFile={setImageFile} />
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

export default UploadDocumentsActionModal;
