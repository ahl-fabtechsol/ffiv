import { Box, Button, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Paginate from "../../components/Paginate";
import TableMui from "../../components/TableMui";
import { IoEyeOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import apiClient from "../../api/apiClient";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Backed = () => {
  const [loading, setLoading] = useState(false);
  const userId = useSelector((state) => state?.auth?.user?._id);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [campaigns, setCampaigns] = useState([]);
  const [count, setCount] = useState(0);
  const getCampaigns = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(
        `backer?createdBy=${userId}&page=${page}&limit=10`
      );
      if (!response.ok) {
        setLoading(false);
        toast.error(response?.data?.message || "Failed to fetch campaigns");
        return;
      }
      setLoading(false);
      setCount(response?.data?.count);
      setCampaigns(response?.data?.backers);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to fetch campaigns");
    }
  };

  const handleViewCampaign = async (id) => {
    setLoading(true);
    try {
      const response = await apiClient.get(`campaign?_id=${id}`);
      if (!response.ok) {
        setLoading(false);
        toast.error(response?.data?.message || "Failed to fetch campaign");
        return;
      }
      setLoading(false);
      navigate(`/explore/${id}`, {
        state: { active: response?.data?.campaigns[0] },
      });
    } catch (error) {
      setLoading(false);
      toast.error("Failed to fetch campaign");
    }
  };

  useEffect(() => {
    getCampaigns();
  }, [page]);

  return (
    <Box className="p-4">
      <p className="text-3xl font-bold">Backed Campains</p>
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
            moneyPledged: "Money Pledged",
            funding: "Funding Required",
            funded: "Funded",
            startDate: "Start Date",
            endDate: "End Date",
            status: "Status",
            action: "Action",
          }}
          td={campaigns}
          customFields={[
            {
              name: "name",
              data: (value, item) => {
                return item?.campaign[0]?.name;
              },
            },
            {
              name: "moneyPledged",
              data: (value, item) => {
                return "$" + value;
              },
            },
            {
              name: "funding",
              data: (value, item) => {
                return "$" + item?.campaign[0]?.funding;
              },
            },
            {
              name: "funded",
              data: (value, item) => {
                return "$" + item?.campaign[0]?.funded;
              },
            },
            {
              name: "startDate",
              data: (value, item) => {
                return new Date(
                  item?.campaign[0]?.startDate
                ).toLocaleDateString();
              },
            },
            {
              name: "endDate",
              data: (value, item) => {
                return new Date(
                  item?.campaign[0]?.endDate
                ).toLocaleDateString();
              },
            },
            {
              name: "status",
              data: (value, item) => {
                return (
                  <Box
                    className="px-5 py-2 rounded-3xl text-white"
                    sx={{
                      backgroundColor:
                        item?.campaign[0]?.status === "A"
                          ? "#02ad1d"
                          : "#e4812e",
                    }}
                  >
                    <Typography>
                      {item?.campaign[0]?.status === "A"
                        ? "Active"
                        : item?.campaign[0]?.status === "I"
                        ? "Inactive"
                        : item?.campaign[0]?.status === "C"
                        ? "Completed"
                        : item?.campaign[0]?.status === "UR"
                        ? "Under Review"
                        : "Failed"}
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
                      onClick={() => handleViewCampaign(item?.campaign[0]?._id)}
                      sx={{
                        minWidth: 0,
                        padding: "5px",
                        borderRadius: "50%",
                        color: "#5c5c5c",
                      }}
                    >
                      <IoEyeOutline size={20} />
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

export default Backed;
