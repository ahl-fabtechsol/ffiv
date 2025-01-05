import { Box } from "@mui/material";
import React from "react";
import BasicInfoSection from "./BasicInfoSection";
import UploadDocumentsSections from "./UploadDocumentsSections";
import TeamMembersSection from "./TeamMembersSection";
import BackersSection from "./BackersSection";
import FaqsSection from "./FaqsSection";
import ProjectTimeLineSection from "./ProjectTimeLineSection";
import RewardSection from "./RewardSection";

const CreateCampaign = () => {
  return (
    <Box className="p-8 flex flex-col gap-8">
      <Box className="flex flex-col gap-3">
        <p className="text-3xl font-bold">Create a Campaign</p>
        <p className="font-extralight text-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi
          voluptate, soluta ipsam tempora perspiciatis voluptates consectetur?
          Quidem, assumenda fuga. Quis placeat quae ad laudantium necessitatibus
          hic, nostrum explicabo dolorum quos. Dolorem quo dignissimos
          consequuntur perferendis, ut, nulla nam praesentium cupiditate omnis
          numquam, aliquid rem. Officiis nobis illo pariatur tenetur qui?
        </p>
      </Box>
      <BasicInfoSection />
      <UploadDocumentsSections />
      <TeamMembersSection />
      <BackersSection />
      <FaqsSection />
      <ProjectTimeLineSection />
      <RewardSection />
    </Box>
  );
};

export default CreateCampaign;
