import { Box, Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import ProjectTimeLineActionModal from "../../../modals/ProjectTimeLineActionModal";
import { Loader } from "../../../components/customLoader/Loader";
import toast from "react-hot-toast";
import apiClient from "../../../api/apiClient";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const ProjectTimeLineSection = (props) => {
  const { campaignId } = props;
  const [onAction, setOnAction] = useState(false);
  const [phases, setPhases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalData, setModalData] = useState(null);
  const [projectTimeLineActionModal, setProjectTimeLineActionModal] =
    useState(false);

  const getTimeLines = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(`timeline?campaignId=${campaignId}`);
      if (!response.ok) {
        setLoading(false);
        toast.error(
          response?.data?.message || "Error while fetching timelines"
        );
        return;
      }
      setLoading(false);
      setPhases(response?.data?.timelines);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await apiClient.delete(`timeline/${id}`);
      if ((!response, ok)) {
        setLoading(false);
        toast.error(response?.data?.message || "Error while deleting ");
        return;
      }
      setLoading(false);
      toast.success("succesfully deleted");
      setOnAction(!onAction);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getTimeLines();
  }, [onAction]);

  return (
    <Box className="  flex flex-col gap-6 bg-white rounded-lg border p-4">
      <Loader loading={loading} />
      {projectTimeLineActionModal && (
        <ProjectTimeLineActionModal
          open={projectTimeLineActionModal}
          onClose={() => setProjectTimeLineActionModal(false)}
          onAction={() => setOnAction(!onAction)}
          campaignId={campaignId}
          data={modalData}
          type={modalType}
        />
      )}
      <p className="text-xl font-bold">What is Your Project TimeLine</p>
      <p className="font-extralight text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
        asperiores iste laboriosam commodi labore quibusdam unde nesciunt nobis
        quas cumque consectetur pariatur, odit reiciendis vitae.
      </p>

      <Box className="flex flex-col  gap-4">
        {phases.map((phase, index) => (
          <Box
            className="flex gap-3 min-w-100 rounded-lg border "
            key={phase._id}
          >
            <Box className="p-4 w-full">
              <p className="text-md font-bold">{phase?.title}</p>
              <p className="font-extralight text-sm">{phase?.goal}</p>
            </Box>
            <Box className="flex items-center">
              <IconButton
                color="error"
                onClick={() => handleDelete(phase?._id)}
              >
                <MdDelete />
              </IconButton>
              <IconButton
                color="black"
                onClick={() => {
                  setModalData(phase);
                  setModalType("edit");
                  setProjectTimeLineActionModal(true);
                }}
              >
                <FaRegEdit />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>
      <Button
        onClick={() => {
          setModalType("add");
          setProjectTimeLineActionModal(true);
        }}
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
        Add Project TimeLine
      </Button>
    </Box>
  );
};

export default ProjectTimeLineSection;
