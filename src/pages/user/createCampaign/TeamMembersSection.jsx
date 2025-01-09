import { Avatar, Box, Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import TeamMembersActionModal from "../../../modals/TeamMembersActionModal";
import { MdDelete } from "react-icons/md";
import { Loader } from "../../../components/customLoader/Loader";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import apiClient from "../../../api/apiClient";

const TeamMembersSection = (props) => {
  const { campaignId } = props;
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState("");
  const [teamMembersActionModal, setTeamMembersActionModal] = useState(false);
  const [onAction, setOnAction] = useState(false);
  const [teamMembers, setTeamMembers] = useState(null);
  const [modalData, setModalData] = useState(null);

  const getTeamMembers = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(
        `team-member?campaignId=${campaignId}`
      );
      if (!response.ok) {
        setLoading(false);
        toast.error(response?.data?.message || "Something went wrong");
        return;
      }
      setLoading(false);
      setTeamMembers(response?.data?.teamMembers);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  const deleteTeamMember = async (id) => {
    setLoading(true);
    try {
      const response = await apiClient.delete(`team-member/${id}`);
      if (!response.ok) {
        setLoading(false);
        toast.error(response?.data?.message || "Something went wrong");
        return;
      }
      setLoading(false);
      toast.success("Team Member Deleted Successfully");
      setOnAction(!onAction);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  const addTeamMember = () => {
    setModalType("add");
    setTeamMembersActionModal(true);
  };

  const editTeamMember = () => {
    setModalType("edit");
    setTeamMembersActionModal(true);
  };

  useEffect(() => {
    getTeamMembers();
  }, [onAction]);

  return (
    <Box className="  flex flex-col gap-6 bg-white rounded-lg border p-4">
      <Loader loading={loading} />
      {teamMembersActionModal && (
        <TeamMembersActionModal
          open={teamMembersActionModal}
          onClose={() => setTeamMembersActionModal(false)}
          onAction={() => setOnAction(!onAction)}
          campaignId={campaignId}
          type={modalType}
          data={modalData}
        />
      )}
      <p className="text-xl font-bold">Tell Us About Your Team Members </p>
      <p className="font-extralight text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
        asperiores iste laboriosam commodi labore quibusdam unde nesciunt nobis
        quas cumque consectetur pariatur, odit reiciendis vitae.
      </p>
      <Box className="grid sm:grid-cols-3 grid-cols-1  gap-4">
        {teamMembers?.map((member, index) => (
          <Box
            className="col-span-1 rounded-lg border p-4 flex gap-3 items-center xs:flex-row flex-col"
            key={member?._id}
          >
            <Avatar
              src={member?.image ? member?.image : ""}
              sx={{ width: 70, height: 70, border: "3px solid #84cc16" }}
            />
            <Box className="flex gap-2">
              <Box>
                <p className="text-md font-bold">{member?.name}</p>
                <p className="font-extralight text-sm">{member?.role}</p>
              </Box>

              <Box>
                <IconButton
                  color="error"
                  onClick={() => deleteTeamMember(member?._id)}
                >
                  <MdDelete />
                </IconButton>
                <IconButton
                  color="black"
                  onClick={() => {
                    setModalData(member);
                    setModalType("edit");
                    setTeamMembersActionModal(true);
                  }}
                >
                  <FaRegEdit />
                </IconButton>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      {!teamMembers && (
        <Button
          onClick={addTeamMember}
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
          Add Team Members
        </Button>
      )}
    </Box>
  );
};

export default TeamMembersSection;
