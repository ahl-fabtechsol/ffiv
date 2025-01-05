import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import BasicInfoActionModal from "../../../modals/BasicInfoActionModal";
import dayjs from "dayjs";

const BasicInfoSection = () => {
  const [basicInfoActionModal, setBasicInfoActionModal] = useState(false);
  const [formData, setFormData] = useState({
    campaignName: "",
    category: "",
    subCategory: "",
    campaignSummary: "",
    campaignDetail: "",
    startDate: dayjs(),
    endDate: dayjs(),
    fundingRequired: "",
  });

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleOnSave = () => {
    setBasicInfoActionModal(false);
  };
  return (
    <Box className="  flex flex-col gap-6 bg-white rounded-lg border p-4">
      {basicInfoActionModal && (
        <BasicInfoActionModal
          open={basicInfoActionModal}
          onClose={() => setBasicInfoActionModal(false)}
          onSave={handleOnSave}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      <p className="text-xl font-bold">Add Basic Info </p>
      <p className="font-extralight text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
        asperiores iste laboriosam commodi labore quibusdam unde nesciunt nobis
        quas cumque consectetur pariatur, odit reiciendis vitae.
      </p>

      {formData.campaignName && (
        <Box className="flex flex-wrap gap-6 justify-between">
          <Box className="w-full sm:w-[48%] p-4 rounded-lg border">
            <Box className="mb-4">
              <p className="text-md font-bold text-fdPrimary">Campaign Name</p>
              <p className="text-sm font-extralight">{formData.campaignName}</p>
            </Box>
          </Box>

          <Box className="w-full sm:w-[48%] p-4 rounded-lg border">
            <Box className="mb-4">
              <p className="text-md font-bold text-fdPrimary">Category</p>
              <p className="text-sm font-extralight">
                {formData.category || "Not Specified"}
              </p>
            </Box>
          </Box>

          <Box className="w-full sm:w-[48%] p-4 rounded-lg border">
            <Box className="mb-4">
              <p className="text-md font-bold text-fdPrimary">Subcategory</p>
              <p className="text-sm font-extralight">
                {formData.subCategory || "Not Specified"}
              </p>
            </Box>
          </Box>

          <Box className="w-full sm:w-[48%] p-4 rounded-lg border">
            <Box className="mb-4">
              <p className="text-md font-bold text-fdPrimary">
                Campaign Summary
              </p>
              <p className="text-sm font-extralight">
                {formData.campaignSummary || "Not Provided"}
              </p>
            </Box>
          </Box>

          <Box className="w-full sm:w-[48%] p-4 rounded-lg border">
            <Box className="mb-4">
              <p className="text-md font-bold text-fdPrimary">Start Date</p>
              <p className="text-sm font-extralight">
                {dateFormatter.format(formData.startDate) || "Not Provided"}
              </p>
            </Box>
          </Box>

          <Box className="w-full sm:w-[48%] p-4 rounded-lg border">
            <Box className="mb-4">
              <p className="text-md font-bold text-fdPrimary">End Date</p>
              <p className="text-sm font-extralight">
                {dateFormatter.format(formData.endDate) || "Not Provided"}
              </p>
            </Box>
          </Box>

          <Box className="w-full sm:w-[48%] p-4 rounded-lg border">
            <Box className="mb-4">
              <p className="text-md font-bold text-fdPrimary">
                Funding Required
              </p>
              <p className="text-sm font-extralight">
                {formData.fundingRequired || "Not Provided"}
              </p>
            </Box>
          </Box>
        </Box>
      )}
      <Button
        onClick={() => setBasicInfoActionModal(true)}
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
        {formData.campaignName ? "Edit Basic Info" : "Add Basic Info"}
      </Button>
    </Box>
  );
};

export default BasicInfoSection;
