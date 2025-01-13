import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import UploadDocumentsActionModal from "../../../modals/UploadDocumentsActionModal";
import toast from "react-hot-toast";
import apiClient from "../../../api/apiClient";
import { MdDelete } from "react-icons/md";

const UploadDocumentsSections = (props) => {
  const { campaignId, setLoading } = props;
  const [onAction, setOnAction] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [videoSrc, setVideoSrc] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [documentData, setDocumentData] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [uploadDocumentsActionModal, setUploadDocumentsActionModal] =
    useState(false);

  const handleOnSave = (data) => {
    setImageSrc(URL.createObjectURL(data.imageFile));
    setVideoSrc(URL.createObjectURL(data.videoFile));
    setUploadDocumentsActionModal(false);
  };

  const handleUploadDocuments = () => {
    setModalType("add");
    setUploadDocumentsActionModal(true);
  };

  const getData = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(`document?campaignId=${campaignId}`);
      if (!response.ok) {
        setLoading(false);
        toast.error(response?.data?.message || "Something went wrong");
        return;
      }
      setLoading(false);
      setDocumentData(response?.data?.documents[0]);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  const deleteDocument = async (id) => {
    setLoading(true);
    try {
      const response = await apiClient.delete(`document/${id}`);
      if (!response.ok) {
        setLoading(false);
        toast.error(response?.data?.message || "Something went wrong");
        return;
      }
      setLoading(false);
      setOnAction(!onAction);
      toast.success(response?.data?.message || "Document deleted successfully");
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getData();
  }, [onAction]);

  return (
    <Box className="  flex flex-col gap-6 bg-white rounded-lg border p-4">
      {uploadDocumentsActionModal && (
        <UploadDocumentsActionModal
          open={uploadDocumentsActionModal}
          onClose={() => setUploadDocumentsActionModal(false)}
          onAction={() => setOnAction(!onAction)}
          type={modalType}
          campaignId={campaignId}
          data={modalData}
          setLoading={setLoading}
        />
      )}
      <p className="text-xl font-bold">Upload Doccuments </p>
      <p className="font-extralight text-sm">
        Upload an a Cover Image and Video to show your campign to the world.
      </p>
      {documentData?.video && (
        <Box className="mt-4">
          <p className="mb-4 text-md">Video Preview:</p>
          <video
            controls
            src={documentData?.video}
            className="w-full h-64 rounded-lg shadow-lg mb-4"
          />
        </Box>
      )}
      {documentData?.image && (
        <Box className="mt-4">
          <p className="mb-4 text-md">Image Preview:</p>
          <img
            src={documentData?.image}
            alt="preview"
            className="w-full h-64 object-contain rounded-lg shadow-lg mb-4"
          />
        </Box>
      )}
      {!documentData?.image ? (
        <Button
          onClick={() => {
            handleUploadDocuments();
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
          Upload Documents
        </Button>
      ) : (
        <Box>
          <Button
            onClick={() => {
              deleteDocument(documentData?._id);
            }}
            variant="contained"
            startIcon={<MdDelete />}
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
            Delete Document
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default UploadDocumentsSections;
