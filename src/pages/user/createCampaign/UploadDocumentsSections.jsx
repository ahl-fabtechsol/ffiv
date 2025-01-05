import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import UploadDocumentsActionModal from "../../../modals/UploadDocumentsActionModal";

const UploadDocumentsSections = () => {
  const [uploadDocumentsActionModal, setUploadDocumentsActionModal] =
    useState(false);
  const handleOnSave = () => {
    setUploadDocumentsActionModal(false);
  };
  return (
    <Box className="  flex flex-col gap-6 bg-white rounded-lg border p-4">
      {uploadDocumentsActionModal && (
        <UploadDocumentsActionModal
          open={uploadDocumentsActionModal}
          onClose={() => setUploadDocumentsActionModal(false)}
          onSave={handleOnSave}
        />
      )}
      <p className="text-xl font-bold">Upload Doccuments </p>
      <p className="font-extralight text-sm">
        Upload an a Cover Image and Video to show your campign to the world.
      </p>
      <Button
        onClick={() => setUploadDocumentsActionModal(true)}
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
        Upload Documents
      </Button>
    </Box>
  );
};

export default UploadDocumentsSections;
