import { Box, LinearProgress, Button } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TeamCard from "../components/TeamCard";
import AnimatedTestimonials from "../components/AnimatedTestimonials";
import FaqAccordion from "../components/FaqAccordian";
import ProjectTimeline from "../components/ProjectTimeline";
import { Loader } from "../components/customLoader/Loader";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { testimonials } from "../lib/dummyData";
import apiClient from "../api/apiClient";

export default function Page() {
  const { id } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const data = location.state.active;
  const [teamData, setTeamData] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [projectTimelines, setProjectTimelines] = useState([]);
  const [backers, setBackers] = useState([]);
  const navigate = useNavigate();

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
            onClick={() =>
              navigate("/payment", {
                state: { rewards: rewards, campaignId: id },
              })
            }
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
                  onClick={() =>
                    navigate("/payment", {
                      state: { rewards: rewards, campaignId: id },
                    })
                  }
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
          onClick={() =>
            navigate("/payment", {
              state: { rewards: rewards, campaignId: id },
            })
          }
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
