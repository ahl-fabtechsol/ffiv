import { Box } from "@mui/material";
import React, { useState } from "react";
import UploadDocumentsSections from "./createCampaign/UploadDocumentsSections";
import TeamMembersSection from "./createCampaign/TeamMembersSection";
import FaqsSection from "./createCampaign/FaqsSection";
import ProjectTimeLineSection from "./createCampaign/ProjectTimeLineSection";
import RewardSection from "./createCampaign/RewardSection";
import { useParams } from "react-router-dom";
import EditBasicInfoSection from "./createCampaign/EditBasicInfoSection";

const EditCampaign = () => {
  const { id } = useParams();
  return (
    <Box className="p-8 flex flex-col gap-8">
      <Box className="flex flex-col gap-3">
        <p className="text-3xl font-bold">Edit Campaign</p>
        <p className="font-extralight text-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi
          voluptate, soluta ipsam tempora perspiciatis voluptates consectetur?
          Quidem, assumenda fuga. Quis placeat quae ad laudantium necessitatibus
          hic, nostrum explicabo dolorum quos. Dolorem quo dignissimos
          consequuntur perferendis, ut, nulla nam praesentium cupiditate omnis
          numquam, aliquid rem. Officiis nobis illo pariatur tenetur qui?
        </p>
      </Box>
      <EditBasicInfoSection campaignId={id} />

      <UploadDocumentsSections campaignId={id} />
      <TeamMembersSection campaignId={id} />
      <FaqsSection campaignId={id} />
      <ProjectTimeLineSection campaignId={id} />
      <RewardSection campaignId={id} />
    </Box>
  );
};

export default EditCampaign;
