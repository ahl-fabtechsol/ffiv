import { Box, Button, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Paginate from "../../components/Paginate";
import TableMui from "../../components/TableMui";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import apiClient from "../../api/apiClient";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import BackerActionModal from "../../modals/BackerActionModal";
import UserChangeStatusModal from "../../modals/UserChangeStatusModal";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../../lib/contract";

const UserCampaign = () => {
  const [loading, setLoading] = useState(false);
  const account = useSelector((state) => state.auth.account);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [campaigns, setCampaigns] = useState([]);
  const [contractCampaigns, setContractCampaigns] = useState([]);
  const [count, setCount] = useState(0);
  const [showBackerModal, setShowBackerModal] = useState(false);
  const userId = useSelector((state) => state?.auth?.user?._id);
  const [campaignId, setCampaignId] = useState("");
  const [changeStatusModal, setChangeStatusModal] = useState(false);
  const [onAction, setOnAction] = useState(false);
  const [localContractInstance, setLocalContractInstance] = useState(null);

  const STATUS_COLORS = {
    A: "#02ad1d",
    I: "#e4812e",
    UR: "#fbc02d",
    C: "#1976d2",
    F: "#d32f2f",
  };

  const statusLabel = {
    A: "Active",
    I: "Inactive",
    UR: "Under Review",
    C: "Completed",
    F: "Failed",
  };

  const getCampaigns = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(
        `campaign?createdBy=${userId}&page=${page}&limit=10`
      );
      if (!response.ok) {
        setLoading(false);
        toast.error(response?.data?.message || "Failed to fetch campaigns");
        return;
      }
      setLoading(false);
      setCount(response?.data?.count);

      const dbCampaigns = response?.data?.campaigns;
      const mergedCampaigns = dbCampaigns.map((dbCamp) => {
        const onChainMatch = contractCampaigns.find(
          (contractCamp) => contractCamp.mongooseId === dbCamp._id
        );
        return {
          ...dbCamp,
          onChain: !!onChainMatch,
        };
      });
      setCampaigns(mergedCampaigns);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to fetch campaigns");
    }
  };

  const fetchCampaigns = async (contractInstance) => {
    if (!contractInstance) {
      console.warn("Contract instance not available for fetching campaigns.");
      return;
    }
    setLoading(true);
    try {
      const counter = await contractInstance.campaignIDCounter();
      const fetchedCampaigns = [];
      for (let i = Number(counter); i >= 1; i--) {
        const campaignData = await contractInstance.getCampaignDetails(i);
        fetchedCampaigns.push({
          id: i,
          creator: campaignData.creator,
          title: campaignData.title,
          description: campaignData.description,
          goalAmount: ethers.formatEther(campaignData.goalAmount),
          deadline: new Date(
            Number(campaignData.deadline) * 1000
          ).toLocaleString(),
          totalRaised: ethers.formatEther(campaignData.totalRaised),
          isWithdrawn: campaignData.isWithdrawn,
          mongooseId: campaignData.mongooseId,
        });
      }
      setContractCampaigns(fetchedCampaigns);
    } catch (err) {
      toast.error("Failed to fetch campaigns from contract");
      console.error("Error fetching contract campaigns:", err);
    } finally {
      setLoading(false);
    }
  };

  const putOnChain = async (values) => {
    setLoading(true);
    try {
      const goalAmount = ethers.parseEther(values.funding.toString());
      const title = values.name;
      const description = values.detail;
      const mongooseId = values._id;
      const startDate = new Date(values.startDate);
      const endDate = new Date(values.endDate);

      const diffTime = endDate.getTime() - startDate.getTime();
      const durationInSeconds = Math.max(0, Math.floor(diffTime / 1000));

      const tx = await localContractInstance.createCampaign(
        title,
        description,
        goalAmount,
        Number(durationInSeconds),
        mongooseId
      );
      await tx.wait();
      setLoading(false);
      toast.success("Campaign has been put on chain successfully");
      fetchCampaigns(localContractInstance);
      setOnAction(!onAction);
    } catch (error) {
      setLoading(false);
      console.error("Error creating campaign:", error);
      if (error.reason) {
        toast.error(`Failed to put campaign on chain: ${error.reason}`);
      } else {
        toast.error("Failed to put campaign on chain");
      }
    }
  };

  useEffect(() => {
    const initContract = async () => {
      if (typeof window.ethereum !== "undefined" && account) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const instance = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setLocalContractInstance(instance);
        } catch (err) {
          console.error("Failed to initialize contract in UserCampaign:", err);
          toast.error(
            "Failed to connect to blockchain. Please check MetaMask."
          );
        }
      } else if (!account) {
        setLocalContractInstance(null);
      }
    };
    initContract();
  }, [account]);

  useEffect(() => {
    if (localContractInstance) {
      fetchCampaigns(localContractInstance);
    }
  }, [localContractInstance]);

  useEffect(() => {
    if (contractCampaigns.length > 0 || !loading) {
      getCampaigns();
    }
  }, [page, onAction, contractCampaigns]);

  return (
    <Box className="p-4">
      {showBackerModal && (
        <BackerActionModal
          open={showBackerModal}
          onClose={() => setShowBackerModal(false)}
          campainId={campaignId}
        />
      )}
      {changeStatusModal && (
        <UserChangeStatusModal
          open={changeStatusModal}
          onClose={() => setChangeStatusModal(false)}
          campainId={campaignId}
          onAction={() => setOnAction(!onAction)}
        />
      )}
      <p className="text-3xl font-bold">My Campaigns</p>
      <Box className="mt-4 bg-white border rounded-xl p-3">
        <TableMui
          loading={loading}
          onSort={(field, direction) => {
            let value = direction === "asc" ? field : "-" + field;
          }}
          styleTableTh={{
            color: "white",
            fontWeight: "bold",
            whiteSpace: "nowrap",
            bgcolor: "#7fc415",
          }}
          th={{
            name: "Campaign Name",
            category: "Category",
            subCategory: "Sub Category",
            startDate: "Start Date",
            endDate: "End Date",
            funding: "Funding Required",
            funded: "Funded",
            status: "Status",
            onChainStatus: "On Chain",
            backers: "Backers",
            action: "Action",
          }}
          td={campaigns}
          customFields={[
            {
              name: "onChainStatus",
              data: (value, item) => {
                const isOnChain = item.onChain;
                return (
                  <Box
                    onClick={() => {
                      if (isOnChain) {
                        toast.success("Campaign is already on blockchain");
                      } else {
                        putOnChain(item);
                      }
                    }}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      backgroundColor: isOnChain ? "#4CAF50" : "#F44336",
                      color: "white",
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      boxShadow: isOnChain
                        ? "0 2px 4px rgba(76, 175, 80, 0.3)"
                        : "0 2px 4px rgba(244, 67, 54, 0.3)",
                      cursor: "pointer",
                    }}
                    title={
                      isOnChain
                        ? "Campaign is on blockchain"
                        : "Campaign is NOT on blockchain"
                    }
                  >
                    {isOnChain ? "✔" : "✘"}
                  </Box>
                );
              },
            },
            {
              name: "backers",
              data: (value, item) => {
                return (
                  <Button
                    onClick={() => {
                      setCampaignId(item._id);
                      setShowBackerModal(true);
                    }}
                    className="bg_primary p-10 "
                    sx={{
                      textTransform: "none",
                      color: "white",
                      padding: "10px",
                      width: "150px",
                      borderRadius: "50px",
                    }}
                  >
                    Backers
                  </Button>
                );
              },
            },
            {
              name: "funding",
              data: (value, item) => {
                return "$" + value;
              },
            },
            {
              name: "funded",
              data: (value, item) => {
                return "$" + value;
              },
            },
            {
              name: "startDate",
              data: (value, item) => {
                return new Date(value).toLocaleDateString();
              },
            },
            {
              name: "endDate",
              data: (value, item) => {
                return new Date(value).toLocaleDateString();
              },
            },
            {
              name: "status",
              data: (value, item) => {
                return (
                  <Box
                    onClick={() => {
                      if (value === "C" || value === "F" || value === "UR") {
                        toast.error("You can't change status of this campaign");
                        return;
                      }
                      setCampaignId(item._id);
                      setChangeStatusModal(true);
                    }}
                    className="px-5 py-2 rounded-3xl text-white cursor-pointer "
                    sx={{
                      backgroundColor: STATUS_COLORS[value] || "#9e9e9e",
                      display: "inline-block",
                    }}
                  >
                    <Typography>
                      {statusLabel[value] || "Unknown Status"}
                    </Typography>
                  </Box>
                );
              },
            },
            {
              name: "action",
              data: (value, item) => (
                <div className="flex justify-center">
                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{
                      backgroundColor: "#f9f9f9",
                      borderRadius: "10px",
                      border: "1px solid #e0e0e0",
                      padding: "5px 10px",
                    }}
                  >
                    <Button
                      onClick={() =>
                        navigate(`/explore/${item._id}`, {
                          state: { active: item },
                        })
                      }
                      sx={{
                        minWidth: 0,
                        padding: "5px",
                        borderRadius: "50%",
                        color: "#5c5c5c",
                      }}
                    >
                      <IoEyeOutline size={20} />
                    </Button>
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ marginX: 1, backgroundColor: "#e0e0e0" }}
                    />
                    <Button
                      onClick={() =>
                        navigate(`/user/edit-campaign/${item._id}`)
                      }
                      sx={{
                        minWidth: 0,
                        padding: "5px",
                        borderRadius: "0%",
                        color: "#5c5c5c",
                      }}
                    >
                      <FaRegEdit size={20} />
                    </Button>
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ marginX: 1, backgroundColor: "#e0e0e0" }}
                    />
                    <Button
                      sx={{
                        minWidth: 0,
                        padding: "5px",
                        borderRadius: "50%",
                        color: "#f44336",
                      }}
                    >
                      <FaRegTrashAlt size={20} />
                    </Button>
                  </Box>
                </div>
              ),
            },
          ]}
        />
      </Box>
      <Paginate count={count} limit={10} onChange={setPage} />
    </Box>
  );
};

export default UserCampaign;
