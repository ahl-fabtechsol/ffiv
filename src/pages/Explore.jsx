import { Box } from "@mui/material";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import apiClient from "../api/apiClient";
import { ExpandableCardGrid } from "../components/ExpandableCardGrid";
import { Loader } from "../components/customLoader/Loader";
import { contractABI, contractAddress } from "../lib/contract";

const Explore = () => {
  const account = useSelector((state) => state.auth.account);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [contractCampaigns, setContractCampaigns] = useState([]);
  const [localContractInstance, setLocalContractInstance] = useState(null);

  const getCampaigns = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(`campaign?name=${search}`);
      if (!response.ok) {
        setLoading(false);
        toast.error(response?.data?.message || "Something went wrong");
        return;
      }
      setLoading(false);
      const filteredCampaigns = response?.data?.campaigns.filter((campaign) => {
        if (campaign?.status === "A" || campaign?.status === "C")
          return campaign;
      });

      const dbCampaigns = filteredCampaigns;
      const mergedCampaigns = dbCampaigns.map((dbCamp) => {
        const onChainMatch = contractCampaigns.find(
          (contractCamp) => contractCamp.mongooseId === dbCamp._id
        );
        return {
          ...dbCamp,
          onChain: !!onChainMatch,
          chainId: onChainMatch ? onChainMatch.id : null,
        };
      });
      setCampaigns(mergedCampaigns);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  const fetchCampaigns = async (contractInstance) => {
    if (!contractInstance) {
      console.warn("Contract instance not available for fetching campaigns.");
      toast.error("Contract instance not available");
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
  }, [contractCampaigns]);

  return (
    <Box className="mt-2">
      <Loader loading={loading} />
      <Box className="py-4 xs:px-20 px-12 xs:py-10 sm:flex justify-between items-end border-b-2">
        <Box className="mb-5 sm:mb-0">
          <p className="text-3xl font-bold text-black">Explore</p>
          <p className="text-fdTextGray">Where do you want to help</p>
        </Box>
        {/* <Box className="relative">
          <TextField
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant="outlined"
            className="bg-transparent text-black placeholder:text-black w-[300px] "
            InputProps={{
              startAdornment: (
                <FiSearch className="text-black ml-1 me-4" size={25} />
              ),
            }}
          />
        </Box> */}
      </Box>

      <Box className="py-4 xs:px-20 px-8 xs:py-10 ">
        <ExpandableCardGrid cards={campaigns} />
      </Box>
    </Box>
  );
};

export default Explore;
