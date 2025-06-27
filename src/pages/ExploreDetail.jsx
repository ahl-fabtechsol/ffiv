import { Box, Button, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import apiClient from "../api/apiClient";
import AnimatedTestimonials from "../components/AnimatedTestimonials";
import FaqAccordion from "../components/FaqAccordian";
import ProjectTimeline from "../components/ProjectTimeline";
import TeamCard from "../components/TeamCard";
import { Loader } from "../components/customLoader/Loader";
import PaymentSelectionModal from "../modals/PaymentSelectionModal";
import BlockChainPaymentModal from "../modals/BlockchainPaymentModal";
import { contractABI, contractAddress } from "../lib/contract";
import { ethers } from "ethers";
import { useSelector } from "react-redux";

export default function Page() {
  const { id } = useParams();
  const account = useSelector((state) => state.auth.account);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const data = location.state.active;
  console.log("data", data);
  const [teamData, setTeamData] = useState([]);
  const [paymentSelectionModal, setPaymentSelectionModal] = useState(false);
  const [blockchainModal, setBlockchainModal] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [projectTimelines, setProjectTimelines] = useState([]);
  const [backers, setBackers] = useState([]);
  const navigate = useNavigate();
  const [localContractInstance, setLocalContractInstance] = useState(null);

  const getTeamData = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(`team-member?campaignId=${id}`);
      if (!response.ok) {
        setLoading(false);
        toast.error(response?.data?.message || "Something went wrong");
        return;
      }
      setLoading(false);
      setTeamData(response?.data?.teamMembers);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  const getFaqs = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(`faq?campaignId=${id}`);
      if (!response.ok) {
        setLoading(false);
        toast.error(response?.data?.message || "Something went wrong");
        return;
      }
      setLoading(false);
      setFaqs(response?.data?.faqs);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  const getRewards = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(`reward?campaignId=${id}`);
      if (!response.ok) {
        setLoading(false);
        toast.error(response?.data?.message || "Something went wrong");
        return;
      }
      setLoading(false);
      setRewards(response?.data?.rewards);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  const getProjectTimelines = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(`timeline?campaignId=${id}`);
      if (!response.ok) {
        setLoading(false);
        toast.error(response?.data?.message || "Something went wrong");
        return;
      }
      setLoading(false);
      setProjectTimelines(response?.data?.timelines);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  const getBackers = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(`backer?campaignId=${id}`);
      if (!response.ok) {
        setLoading(false);
        toast.error(response?.data?.message || "Something went wrong");
        return;
      }
      setLoading(false);
      setBackers(response?.data?.backers);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  const handleContribute = async (contribution) => {
    if (!contribution || isNaN(contribution) || parseFloat(contribution) <= 0) {
      toast.error("Please enter a valid contribution amount.");
      return;
    }
    setLoading(true);
    try {
      const toString = String(contribution);
      const value = ethers.parseEther(toString);
      const tx = await localContractInstance.contribute(data.chainId, {
        value,
      });
      await tx.wait();
      const response = await apiClient.post("backer/blockchain", {
        campaignId: id,
        message: "Good work",
        moneyPledged: contribution,
      });
      if (!response.ok) {
        setLoading(false);
        toast.error(response?.data?.message || "Something went wrong");
        return;
      }
      setLoading(false);
      toast.success("Contribution successful!");
    } catch (err) {
      toast.error("Contribution failed. See console.");
      console.error(err);
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
    getTeamData();
    getFaqs();
    getRewards();
    getProjectTimelines();
    getBackers();
  }, []);

  return (
    <Box>
      <Loader loading={loading} />
      {paymentSelectionModal && (
        <PaymentSelectionModal
          open={paymentSelectionModal}
          onClose={() => setPaymentSelectionModal(false)}
          onBank={() =>
            navigate("/payment", {
              state: { rewards: rewards, campaignId: id },
            })
          }
          onBlockchain={() => setBlockchainModal(true)}
        />
      )}
      {blockchainModal && (
        <BlockChainPaymentModal
          open={blockchainModal}
          onClose={() => setBlockchainModal(false)}
          onSave={handleContribute}
        />
      )}
      <Box className="relative min-h-screen w-full ">
        <video
          preload="auto"
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source
            src={data?.campaignDocument?.video || "/demoVideo.mp4"}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <Box className="relative z-10 min-h-screen flex flex-col md:gap-10 gap-6 items-center justify-center p-20 text-center glass-blur">
          <p className="md:text-5xl text-3xl font-extrabold text-white">
            {data?.name || "Project Title"}
          </p>
          <p className="md:text-xl text-lg text-white font-medium">
            {data?.shortSummary || "An innovative project changing the world."}
          </p>
          <Button
            onClick={() => setPaymentSelectionModal(true)}
            className="bg_primary p-10 "
            sx={{
              textTransform: "none",
              color: "white",
              padding: "10px",
              width: "250px",
              borderRadius: "50px",
            }}
          >
            Back this Project
          </Button>
        </Box>
      </Box>
      <Box className="p-10">
        <Box className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <Box className="col-span-2">
            <p className="text-3xl font-bold">Project Details</p>
            <p className="text-md mt-4">
              {data?.detail ||
                "This project aims to revolutionize the way crowdfunding platforms operate by..."}
            </p>
          </Box>
          <Box className="flex flex-col items-center">
            <p className="text-3xl font-bold">Funding Progress</p>
            <p className="text-md mt-4">
              ${data?.funded || 0} / ${data?.funding || 10000}
            </p>
            <LinearProgress
              variant="determinate"
              value={(data?.funded / data?.funding) * 100 || 0}
              className="w-full mt-4"
            />
            <p className="text-md mt-4">
              {((data?.funded / data?.funding) * 100 || 0).toFixed(2)}% funded
            </p>
          </Box>
        </Box>
      </Box>
      <Box className="p-10 flex flex-col items-center">
        <p className="text-3xl font-bold text-center mb-10">Meet the Team</p>
        <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 justify-center">
          {teamData?.map((member) => (
            <TeamCard key={member?._id} member={member} />
          ))}
        </Box>
      </Box>

      <Box className="p-10 ">
        <p className="text-3xl font-bold text-center ">
          What Backers Are Saying
        </p>

        <AnimatedTestimonials backers={backers} autoplay={true} />
      </Box>

      <Box className="p-10 ">
        <FaqAccordion faqs={faqs} />
      </Box>

      <ProjectTimeline timeline={projectTimelines} />

      <Box component={"section"}>
        <Box className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-12">
            Rewards You Can Claim
          </h2>
          <p className="text-lg text-gray-600 mb-16 max-w-2xl mx-auto">
            Support our project and unlock exclusive rewards as a thank you for
            your contribution.
          </p>
          <Box className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {rewards?.map((reward, index) => (
              <Box
                key={index}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl p-8 transform hover:-translate-y-2 transition-all duration-300"
              >
                <h3 className="text-3xl font-semibold text-gray-800 mb-4">
                  {reward?.title}
                </h3>
                <p className="text-5xl font-bold text_primary mb-6">
                  ${reward?.price}
                </p>
                <ul className="text-left space-y-3 mb-8">
                  {reward?.features.map((feature, i) => {
                    if (
                      i === 0 &&
                      typeof feature === "string" &&
                      feature.includes(",")
                    ) {
                      return feature.split(",").map((item, subIndex) => (
                        <li
                          key={`${i}-${subIndex}`}
                          className="flex items-center"
                        >
                          <svg
                            className="w-6 h-6 text_primary mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {item.trim()}
                        </li>
                      ));
                    }

                    return (
                      <li key={i} className="flex items-center">
                        <svg
                          className="w-6 h-6 text_primary mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    );
                  })}
                </ul>
                <button
                  onClick={() => setPaymentSelectionModal(true)}
                  className="w-full bg_primary hover:bg_primary text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out"
                >
                  Claim Reward
                </button>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box className="p-10 text-center">
        <p className="text-3xl mb-4 font-bold">Ready to make a difference?</p>
        <Button
          onClick={() => setPaymentSelectionModal(true)}
          className="bg_primary p-10 "
          sx={{
            textTransform: "none",
            color: "white",
            padding: "10px",
            width: "250px",
            borderRadius: "50px",
          }}
        >
          Support Now
        </Button>
      </Box>
    </Box>
  );
}
