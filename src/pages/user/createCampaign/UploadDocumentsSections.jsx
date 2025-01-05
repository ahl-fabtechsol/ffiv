import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import UploadDocumentsActionModal from "../../../modals/UploadDocumentsActionModal";

const UploadDocumentsSections = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [videoSrc, setVideoSrc] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [uploadDocumentsActionModal, setUploadDocumentsActionModal] =
    useState(false);

  const handleOnSave = (data) => {
    setImageSrc(URL.createObjectURL(data.imageFile));
    setVideoSrc(URL.createObjectURL(data.videoFile));
    setUploadDocumentsActionModal(false);
  };

  const handleUploadDocuments = () => {
    setModalType("new");
    setUploadDocumentsActionModal(true);
  };

  const handleEditDocuments = () => {
    setModalType("edit");
    setUploadDocumentsActionModal(true);
  };
  return (
    <Box className="  flex flex-col gap-6 bg-white rounded-lg border p-4">
      {uploadDocumentsActionModal && (
        <UploadDocumentsActionModal
          open={uploadDocumentsActionModal}
          onClose={() => setUploadDocumentsActionModal(false)}
          onSave={handleOnSave}
          type={modalType}
        />
      )}
      <p className="text-xl font-bold">Upload Doccuments </p>
      <p className="font-extralight text-sm">
        Upload an a Cover Image and Video to show your campign to the world.
      </p>
      {videoSrc && (
        <Box className="mt-4">
          <p className="mb-4 text-md">Video Preview:</p>
          <video
            controls
            src={videoSrc}
            className="w-full h-64 rounded-lg shadow-lg mb-4"
          />
        </Box>
      )}
      {imageSrc && (
        <Box className="mt-4">
          <p className="mb-4 text-md">Image Preview:</p>
          <img
            src={imageSrc}
            alt="preview"
            className="w-full h-64 object-contain rounded-lg shadow-lg mb-4"
          />
        </Box>
      )}
      <Button
        onClick={() => {
          videoSrc || imageSrc
            ? handleEditDocuments()
            : handleUploadDocuments();
        }}
        variant="contained"
        startIcon={<IoCloudUploadOutline />}
        sx={{
          textTransform: "none",
          backgroundColor: "#84cc16",
          color: "white",
          padding: "12px",
          width: "100%",
          borderRadius: "10px",
          "&:hover": {
            backgroundColor: "#6aa40f",
          },
        }}
      >
        {videoSrc || imageSrc ? "Change" : "Upload Documents"}
      </Button>
    </Box>
  );
};

export default UploadDocumentsSections;
