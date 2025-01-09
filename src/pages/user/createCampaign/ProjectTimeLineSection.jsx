import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import ProjectTimeLineActionModal from "../../../modals/ProjectTimeLineActionModal";

const ProjectTimeLineSection = (props) => {
  const { campaignId } = props;
  const [onAction, setOnAction] = useState(false);
  const [phases, setPhases] = useState([
    { id: Date.now(), phaseName: "", completionDetails: "" },
  ]);

  const [projectTimeLineActionModal, setProjectTimeLineActionModal] =
    useState(false);
  const handleOnSave = () => {
    setProjectTimeLineActionModal(false);
  };
  return (
    <Box className="  flex flex-col gap-6 bg-white rounded-lg border p-4">
      {projectTimeLineActionModal && (
        <ProjectTimeLineActionModal
          open={projectTimeLineActionModal}
          onClose={() => setProjectTimeLineActionModal(false)}
          onAction={() => setOnAction(!onAction)}
          campaignId={campaignId}
        />
      )}
      <p className="text-xl font-bold">What is Your Project TimeLine</p>
      <p className="font-extralight text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
        asperiores iste laboriosam commodi labore quibusdam unde nesciunt nobis
        quas cumque consectetur pariatur, odit reiciendis vitae.
      </p>

      <Box className="flex flex-col  gap-4">
        {phases.map(
          (phase, index) =>
            phase?.phaseName && (
              <Box className="rounded-lg border p-4">
                <p className="text-md font-bold">{phase?.phaseName}</p>
                <p className="font-extralight text-sm">
                  {phase?.completionDetails}
                </p>
              </Box>
            )
        )}
      </Box>
      <Button
        onClick={() => setProjectTimeLineActionModal(true)}
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
        {phases[0]?.phaseName ? "Edit" : "Add"} Project TimeLine
      </Button>
    </Box>
  );
};

export default ProjectTimeLineSection;
