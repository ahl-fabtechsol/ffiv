import { Box, Button, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Paginate from "../../components/Paginate";
import TableMui from "../../components/TableMui";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { campaignsData } from "../../lib/dummyData";
import EditCampaignModal from "../../modals/EditCampaignModal";
import { Loader } from "../../components/customLoader/Loader";
import toast from "react-hot-toast";
import apiClient from "../../api/apiClient";
import { data, useNavigate } from "react-router-dom";

const UserCampaign = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [editCampaignModal, setEditCampaignModal] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [count, setCount] = useState(0);
  const getCampaigns = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(`campaign?page=${page}&limit=10`);
      if (!response.ok) {
        setLoading(false);
        toast.error(response?.data?.message || "Failed to fetch campaigns");
        return;
      }
      setLoading(false);
      setCount(response?.data?.count);
      setCampaigns(response?.data?.campaigns);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to fetch campaigns");
    }
  };

  useEffect(() => {
    getCampaigns();
  }, [page]);

  return (
    <Box className="p-4">
      {editCampaignModal && (
        <EditCampaignModal
          open={editCampaignModal}
          onClose={() => setEditCampaignModal(false)}
        />
      )}
      <p className="text-3xl font-bold">My Campains</p>
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
            action: "Action",
          }}
          td={campaigns}
          customFields={[
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
                    className="px-5 py-2 rounded-3xl text-white"
                    sx={{
                      backgroundColor: value === "A" ? "#02ad1d" : "#e4812e",
                    }}
                  >
                    <Typography>
                      {value === "A"
                        ? "Active"
                        : value === "I"
                        ? "Inactive"
                        : value === "C"
                        ? "Completed"
                        : value === "UR"
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
