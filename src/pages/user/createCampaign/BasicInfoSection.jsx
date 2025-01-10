import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import BasicInfoActionModal from "../../../modals/BasicInfoActionModal";
import { Loader } from "../../../components/customLoader/Loader";
import toast from "react-hot-toast";
import apiClient from "../../../api/apiClient";

const BasicInfoSection = (props) => {
  const { setCampaignId } = props;
  const [loading, setLoading] = useState(false);
  const [basicInfoActionModal, setBasicInfoActionModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [formData, setFormData] = useState(null);

  const handleOnSave = (values) => {
    setBasicInfoActionModal(false);
    setCampaignId(values?._id);
    getCampaignData(values?._id);
  };

  const getCampaignData = async (id) => {
    setLoading(true);
    try {
      const response = await apiClient.get(`campaign/${id}`);
      if (!response.ok) {
        setLoading(false);
        toast.error(response?.data?.message || "Something went wrong");
        return;
      }
      setLoading(false);
      setFormData(response?.data?.campaign);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  const handleAdd = () => {
    setModalType("add");
    setBasicInfoActionModal(true);
  };

  const handleEdit = () => {
    setModalType("edit");
    setBasicInfoActionModal(true);
  };

  return (
    <Box className="  flex flex-col gap-6 bg-white rounded-lg border p-4">
      <Loader loading={loading} />
      {basicInfoActionModal && (
        <BasicInfoActionModal
          open={basicInfoActionModal}
          onClose={() => setBasicInfoActionModal(false)}
          onSave={handleOnSave}
          data={formData}
          type={modalType}
        />
      )}
      <p className="text-xl font-bold">Add Basic Info </p>
      <p className="font-extralight text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
        asperiores iste laboriosam commodi labore quibusdam unde nesciunt nobis
        quas cumque consectetur pariatur, odit reiciendis vitae.
      </p>

      {formData && (
        <Box className="flex flex-wrap gap-6 justify-between">
          <Box className="w-full sm:w-[48%] p-4 rounded-lg border">
            <Box className="mb-4">
              <p className="text-md font-bold text-fdPrimary">Campaign Name</p>
              <p className="text-sm font-extralight">{formData?.name}</p>
            </Box>
          </Box>

          <Box className="w-full sm:w-[48%] p-4 rounded-lg border">
            <Box className="mb-4">
              <p className="text-md font-bold text-fdPrimary">Category</p>
              <p className="text-sm font-extralight">
                {formData?.category || "Not Specified"}
              </p>
            </Box>
          </Box>

          <Box className="w-full sm:w-[48%] p-4 rounded-lg border">
            <Box className="mb-4">
              <p className="text-md font-bold text-fdPrimary">Subcategory</p>
              <p className="text-sm font-extralight">
                {formData?.subCategory || "Not Specified"}
              </p>
            </Box>
          </Box>

          <Box className="w-full sm:w-[48%] p-4 rounded-lg border">
            <Box className="mb-4">
              <p className="text-md font-bold text-fdPrimary">
                Campaign Summary
              </p>
              <p className="text-sm font-extralight">
                {formData?.shortSummary || "Not Provided"}
              </p>
            </Box>
          </Box>

          <Box className="w-full sm:w-[48%] p-4 rounded-lg border">
            <Box className="mb-4">
              <p className="text-md font-bold text-fdPrimary">
                Campaign Detail
              </p>
              <p className="text-sm font-extralight">
                {formData?.detail || "Not Provided"}
              </p>
            </Box>
          </Box>

          <Box className="w-full sm:w-[48%] p-4 rounded-lg border">
            <Box className="mb-4">
              <p className="text-md font-bold text-fdPrimary">Start Date</p>
              <p className="text-sm font-extralight">
                {new Date(formData?.startDate).toLocaleDateString() ||
                  "Not Provided"}
              </p>
            </Box>
          </Box>

          <Box className="w-full sm:w-[48%] p-4 rounded-lg border">
            <Box className="mb-4">
              <p className="text-md font-bold text-fdPrimary">End Date</p>
              <p className="text-sm font-extralight">
                {new Date(formData?.endDate).toLocaleDateString() ||
                  "Not Provided"}
              </p>
            </Box>
          </Box>

          <Box className="w-full sm:w-[48%] p-4 rounded-lg border">
            <Box className="mb-4">
              <p className="text-md font-bold text-fdPrimary">
                Funding Required
              </p>
              <p className="text-sm font-extralight">
                {formData?.funding || "Not Provided"}
              </p>
            </Box>
          </Box>
        </Box>
      )}
      <Button
        onClick={() => (formData ? handleEdit() : handleAdd())}
        variant="contained"
        startIcon={<IoMdAdd />}
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
        {formData ? "Edit Basic Info" : "Add Basic Info"}
      </Button>
    </Box>
  );
};

export default BasicInfoSection;
