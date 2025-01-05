import { Box, Button, Divider, Typography } from "@mui/material";
import React, { useState } from "react";
import Paginate from "../../components/Paginate";
import TableMui from "../../components/TableMui";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { campaignsData } from "../../lib/dummyData";
import EditCampaignModal from "../../modals/EditCampaignModal";

const UserCampaign = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [editCampaignModal, setEditCampaignModal] = useState(false);
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
            campaignName: "Campaign Name",
            category: "Category",
            subCategory: "Sub Category",
            startDate: "Start Date",
            endDate: "End Date",
            fundingRequired: "Funding Required",
            status: "Status",
            action: "Action",
          }}
          td={campaignsData}
          customFields={[
            {
              name: "status",
              data: (value, item) => {
                return (
                  <Box
                    className="px-5 py-2 rounded-3xl text-white"
                    sx={{
                      backgroundColor: value === "Live" ? "#e4812e" : "#02ad1d",
                    }}
                  >
                    <Typography>{value}</Typography>
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
                      onClick={() => setEditCampaignModal(true)}
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
      <Paginate count={30} limit={10} onChange={setPage} />
    </Box>
  );
};

export default UserCampaign;
