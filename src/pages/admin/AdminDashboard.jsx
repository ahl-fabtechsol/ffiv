import React, { useEffect, useState } from "react";
import {
  FaListAlt,
  FaDollarSign,
  FaPlayCircle,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaUsers,
} from "react-icons/fa";
import CountUp from "react-countup";
import { Box } from "@mui/material";
import { Loader } from "../../components/customLoader/Loader";
import toast from "react-hot-toast";
import apiClient from "../../api/apiClient";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [totalCampaigns, setTotalCampaigns] = useState(0);
  const [fundingCollected, setFundingCollected] = useState(0);
  const [activeCampaigns, setActiveCampaigns] = useState(0);
  const [completedCampaigns, setCompletedCampaigns] = useState(0);
  const [failedCampaigns, setFailedCampaigns] = useState(0);
  const [underReviewCampaigns, setUnderReviewCampaigns] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("dashboard/admin");
      if (!response.ok) {
        setLoading(false);
        toast.error(response?.data?.message || "Failed to fetch data");
        return;
      }
      setLoading(false);
      const data = response?.data?.data;
      setTotalCampaigns(data?.totalCampaigns);
      setFailedCampaigns(data?.failedCampaigns);
      setFundingCollected(data?.fundingCollected);
      setActiveCampaigns(data?.activeCampaigns);
      setCompletedCampaigns(data?.completedCampaigns);
      setUnderReviewCampaigns(data?.underReviewCampaigns);
      setTotalUsers(data?.totalUsers);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box className="p-6 ">
      <Loader loading={loading} />
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Box className="bg-blue-200 shadow-lg rounded-lg p-6 flex items-center space-x-6 hover:shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-105 text-gray-800">
          <Box className="text-4xl">
            <FaListAlt />
          </Box>
          <Box>
            <Box className="text-lg font-medium">Total Campaigns</Box>
            <Box className="text-3xl font-semibold text-gray-900">
              <CountUp end={totalCampaigns} duration={3} separator="," />
            </Box>
          </Box>
        </Box>

        <Box className="bg-green-200 shadow-lg rounded-lg p-6 flex items-center space-x-6 hover:shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-105 text-gray-800">
          <Box className="text-4xl">
            <FaDollarSign />
          </Box>
          <Box>
            <Box className="text-lg font-medium">Funding Collected</Box>
            <Box className="text-3xl font-semibold text-gray-900">
              <CountUp end={fundingCollected} duration={3} separator="," />
            </Box>
          </Box>
        </Box>

        <Box className="bg-orange-200 shadow-lg rounded-lg p-6 flex items-center space-x-6 hover:shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-105 text-gray-800">
          <Box className="text-4xl">
            <FaPlayCircle />
          </Box>
          <Box>
            <Box className="text-lg font-medium">Active Campaigns</Box>
            <Box className="text-3xl font-semibold text-gray-900">
              <CountUp end={activeCampaigns} duration={3} separator="," />
            </Box>
          </Box>
        </Box>

        <Box className="bg-purple-200 shadow-lg rounded-lg p-6 flex items-center space-x-6 hover:shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-105 text-gray-800">
          <Box className="text-4xl">
            <FaCheckCircle />
          </Box>
          <Box>
            <Box className="text-lg font-medium">Completed Campaigns</Box>
            <Box className="text-3xl font-semibold text-gray-900">
              <CountUp end={completedCampaigns} duration={3} separator="," />
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Box className="bg-red-100 border-l-4 border-red-500 shadow-lg rounded-lg p-6 flex items-center space-x-6 hover:shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-105">
          <Box className="text-red-500 text-4xl">
            <FaTimesCircle />
          </Box>
          <Box>
            <Box className="text-lg font-medium text-gray-700">
              Failed Campaigns
            </Box>
            <Box className="text-3xl font-semibold text-gray-900">
              <CountUp end={failedCampaigns} duration={3} separator="," />
            </Box>
          </Box>
        </Box>

        <Box className="bg-yellow-100 border-l-4 border-yellow-500 shadow-lg rounded-lg p-6 flex items-center space-x-6 hover:shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-105">
          <Box className="text-yellow-500 text-4xl">
            <FaExclamationTriangle />
          </Box>
          <Box>
            <Box className="text-lg font-medium text-gray-700">
              Under Review Campaigns
            </Box>
            <Box className="text-3xl font-semibold text-gray-900">
              <CountUp end={underReviewCampaigns} duration={3} separator="," />
            </Box>
          </Box>
        </Box>

        <Box className="bg-teal-200 shadow-lg rounded-lg p-6 flex items-center space-x-6 hover:shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-105 text-gray-800">
          <Box className="text-4xl">
            <FaUsers />
          </Box>
          <Box>
            <Box className="text-lg font-medium">Total Users</Box>
            <Box className="text-3xl font-semibold text-gray-900">
              <CountUp end={totalUsers} duration={3} separator="," />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
