import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import RewardsActionModal from "../../../modals/RewardsActionModal";

const RewardSection = (props) => {
  const { campaignId } = props;
  const [onAction, setOnAction] = useState(false);
  const [rewards, setRewards] = useState([
    {
      id: Date.now(),
      name: "",
      price: "",
      features: [],
    },
  ]);
  const [rewardsActionModal, setRewardsActionModal] = useState(false);

  return (
    <Box className="  flex flex-col gap-6 bg-white rounded-lg border p-4">
      {rewardsActionModal && (
        <RewardsActionModal
          open={rewardsActionModal}
          onClose={() => setRewardsActionModal(false)}
          onAction={() => setOnAction(!onAction)}
          campaignId={campaignId}
        />
      )}
      <p className="text-xl font-bold">Add Rewards for Peoples </p>
      <p className="font-extralight text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
        asperiores iste laboriosam commodi labore quibusdam unde nesciunt nobis
        quas cumque consectetur pariatur, odit reiciendis vitae.
      </p>

      <Box className="flex flex-wrap justify-center gap-6">
        {rewards.map(
          (reward, index) =>
            reward?.name && (
              <Box
                key={index}
                className="w-full sm:w-[48%] md:w-[30%] p-4 rounded-lg border shadow-lg bg-white"
              >
                <Box className="mb-4">
                  <p className="text-lg font-bold">{reward.name}</p>
                  <p className="text-4xl font-bold text-fdPrimary">
                    ${reward.price}
                  </p>
                  <ul className="list-disc pl-5 mt-2">
                    {reward.features.map((feature, i) => (
                      <li key={i} className="text-sm">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Box>
              </Box>
            )
        )}
      </Box>

      <Button
        onClick={() => setRewardsActionModal(true)}
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
        {rewards[0].name ? "Edit" : "Add"} Rewards
      </Button>
    </Box>
  );
};

export default RewardSection;
