import { Avatar, Box, Button, IconButton } from "@mui/material";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import TeamMembersActionModal from "../../../modals/TeamMembersActionModal";
import { MdDelete } from "react-icons/md";

const TeamMembersSection = (props) => {
  const { campaignId } = props;
  const [teamMembersActionModal, setTeamMembersActionModal] = useState(false);
  const [onAction, setOnAction] = useState(false);
  const [teamMembers, setTeamMembers] = useState([
    { id: Date.now(), name: "", role: "", picture: null },
  ]);
  return (
    <Box className="  flex flex-col gap-6 bg-white rounded-lg border p-4">
      {teamMembersActionModal && (
        <TeamMembersActionModal
          open={teamMembersActionModal}
          onClose={() => setTeamMembersActionModal(false)}
          onAction={() => setOnAction(!onAction)}
          campaignId={campaignId}
        />
      )}
      <p className="text-xl font-bold">Tell Us About Your Team Members </p>
      <p className="font-extralight text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
        asperiores iste laboriosam commodi labore quibusdam unde nesciunt nobis
        quas cumque consectetur pariatur, odit reiciendis vitae.
      </p>
      <Box className="grid sm:grid-cols-3 grid-cols-1  gap-4">
        {teamMembers.map(
          (member, index) =>
            member.name && (
              <Box
                className="col-span-1 rounded-lg border p-4 flex gap-3 items-center xs:flex-row flex-col"
                key={member.id}
              >
                <Avatar
                  src={
                    member.picture ? URL.createObjectURL(member?.picture) : ""
                  }
                  sx={{ width: 70, height: 70, border: "3px solid #84cc16" }}
                />
                <Box className="flex gap-2">
                  <Box>
                    <p className="text-md font-bold">{member?.name}</p>
                    <p className="font-extralight text-sm">{member?.role}</p>
                  </Box>
                  <IconButton color="error">
                    <MdDelete />
                  </IconButton>
                </Box>
              </Box>
            )
        )}
      </Box>
      <Button
        onClick={() => setTeamMembersActionModal(true)}
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
        {teamMembers[0].name ? "Edit" : "Add"} Team Members
      </Button>
    </Box>
  );
};

export default TeamMembersSection;
