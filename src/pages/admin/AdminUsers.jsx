import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Paginate from "../../components/Paginate";
import TableMui from "../../components/TableMui";
import { FaRegTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import apiClient from "../../api/apiClient";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "../../modals/DeleteConfirmationModal";

const AdminUsers = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [onAction, setOnAction] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const getAllUsers = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(`auth/user?page=${page}&limit=10`);
      if (!response.ok) {
        setLoading(false);
        toast.error(response?.data?.message || "Failed to fetch users");
        return;
      }
      setLoading(false);
      setCount(response?.data?.count);
      setAllUsers(response?.data?.users);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to fetch users");
    }
  };

  const deleteUser = async (userId) => {
    setLoading(true);
    try {
      const response = await apiClient.delete(`auth/user/${userId}`);
      if (!response.ok) {
        setLoading(false);
        toast.error(response?.data?.message || "Failed to delete user");
        return;
      }
      setLoading(false);
      toast.success("User deleted successfully");
      setPage(1);
      setOnAction(!onAction);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to delete user");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [page, onAction]);

  return (
    <Box className="p-4">
      {showDeleteConfirmation && (
        <DeleteConfirmationModal
          open={showDeleteConfirmation}
          onClose={() => setShowDeleteConfirmation(false)}
          onConfirm={() => deleteUser(userId)}
          message="Are you sure you want to delete this user?"
        />
      )}
      <p className="text-3xl font-bold">All Users</p>
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
            firstName: "First Name",
            lastName: "Last Name",
            dob: "Date of Birth",
            gender: "Gender",
            country: "Country",
            phoneNumber: "Phone Number",
            email: "Email",
            action: "Action",
          }}
          td={allUsers}
          customFields={[
            {
              name: "dob",
              data: (value, item) => {
                return new Date(value).toLocaleDateString();
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
                      onClick={() => {
                        setUserId(item._id);
                        setShowDeleteConfirmation(true);
                      }}
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

export default AdminUsers;
