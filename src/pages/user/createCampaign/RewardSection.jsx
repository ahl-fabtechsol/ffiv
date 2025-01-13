import { Box, Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import RewardsActionModal from "../../../modals/RewardsActionModal";
import toast from "react-hot-toast";
import apiClient from "../../../api/apiClient";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const RewardSection = (props) => {
  const { campaignId, setLoading } = props;
  const [modalType, setModalType] = useState("");
  const [modalData, setModalData] = useState(null);
  const [onAction, setOnAction] = useState(false);
  const [rewards, setRewards] = useState([]);
  const [rewardsActionModal, setRewardsActionModal] = useState(false);

  const getRewards = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(`reward?campaignId=${campaignId}`);
      if (!response.ok) {
        setLoading(false);
        toast.error(response?.data?.message || "Error while featching data");
        return;
      }
      setLoading(false);
      setRewards(response?.data?.rewards);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  const deleteReward = async (id) => {
    setLoading(true);
    try {
      const response = await apiClient.delete(`reward/${id}`);
      if (!response.ok) {
        setLoading(false);
        toast.error(response?.data?.message || "Error while deleting ");
        return;
      }
      setLoading(false);
      toast.success("Deleted ");
      setOnAction(!onAction);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getRewards();
  }, [onAction]);

  return (
    <Box className="  flex flex-col gap-6 bg-white rounded-lg border p-4">
      {rewardsActionModal && (
        <RewardsActionModal
          open={rewardsActionModal}
          onClose={() => setRewardsActionModal(false)}
          onAction={() => setOnAction(!onAction)}
          campaignId={campaignId}
          type={modalType}
          data={modalData}
          setLoading={setLoading}
        />
      )}
      <p className="text-xl font-bold">Add Rewards for Peoples </p>
      <p className="font-extralight text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
        asperiores iste laboriosam commodi labore quibusdam unde nesciunt nobis
        quas cumque consectetur pariatur, odit reiciendis vitae.
      </p>

      <Box className="flex flex-wrap justify-center gap-6">
        {rewards.map((reward, index) => (
          <Box
            key={index}
            className="w-full sm:w-[48%] md:w-[30%] p-4 rounded-lg border shadow-lg bg-white"
          >
            <Box className="mb-4">
              <p className="text-lg font-bold">{reward?.title}</p>
              <p className="text-4xl font-bold text-fdPrimary">
                ${reward?.price}
              </p>
              <ul className="list-disc pl-5 mt-2">
                {reward?.features.map((feature, i) => {
                  if (
                    i === 0 &&
                    typeof feature === "string" &&
                    feature.includes(",")
                  ) {
                    return feature.split(",").map((item, subIndex) => (
                      <li key={`${i}-${subIndex}`} className="text-sm">
                        {item.trim()}{" "}
                      </li>
                    ));
                  }

                  return (
                    <li key={i} className="text-sm">
                      {feature}
                    </li>
                  );
                })}
              </ul>
            </Box>
            <Box className="flex items-center">
              <IconButton
                color="error"
                onClick={() => deleteReward(reward?._id)}
              >
                <MdDelete />
              </IconButton>
              <IconButton
                color="black"
                onClick={() => {
                  setModalData(reward);
                  setModalType("edit");
                  setRewardsActionModal(true);
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
          setRewardsActionModal(true);
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
        Add Rewards
      </Button>
    </Box>
  );
};

export default RewardSection;
