import { Box, Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import FaqsActionModal from "../../../modals/FaqsActionModal";
import { Loader } from "../../../components/customLoader/Loader";
import toast from "react-hot-toast";
import apiClient from "../../../api/apiClient";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const FaqsSection = (props) => {
  const { campaignId } = props;
  const [onAction, setOnAction] = useState(false);
  const [faqs, setFaqs] = useState(null);
  const [faqsActionModal, setFaqsActionModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalData, setModalData] = useState(null);

  const getfaqs = async () => {
    setLoading(false);
    try {
      const response = await apiClient.get(`faq?campaignId=${campaignId}`);
      if (!response.ok) {
        setLoading(false);
        toast.error(response?.data?.message || "Something went wrong");
        return;
      }
      setLoading(false);
      setFaqs(response?.data?.faqs);
    } catch (error) {
      setLoading(false);
      toast.error("Something went very wrong");
    }
  };

  const deleteFaq = async (id) => {
    setLoading(true);
    try {
      const response = await apiClient.delete(`faq/${id}`);
      if (!response.ok) {
        setLoading(false);
        toast.error(response?.data?.message || "Error while deleting faq");
        return;
      }
      setLoading(false);
      setOnAction(!onAction);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getfaqs();
  }, [onAction]);

  return (
    <Box className="  flex flex-col gap-6 bg-white rounded-lg border p-4">
      <Loader loading={loading} />
      {faqsActionModal && (
        <FaqsActionModal
          open={faqsActionModal}
          onClose={() => setFaqsActionModal(false)}
          onAction={() => setOnAction(!onAction)}
          campaignId={campaignId}
          type={modalType}
          data={modalData}
        />
      )}
      <p className="text-xl font-bold">Add Faqs </p>
      <p className="font-extralight text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
        asperiores iste laboriosam commodi labore quibusdam unde nesciunt nobis
        quas cumque consectetur pariatur, odit reiciendis vitae.
      </p>
      <Box className="flex flex-col  gap-4">
        {faqs?.map((faq, index) => (
          <Box
            className="flex gap-3 min-w-100 rounded-lg border "
            key={faq._id}
          >
            <Box className="p-4 w-full">
              <p className="text-md font-bold">{faq?.question}</p>
              <p className="font-extralight text-sm">{faq?.answer}</p>
            </Box>
            <Box className="flex items-center">
              <IconButton color="error" onClick={() => deleteFaq(faq?._id)}>
                <MdDelete />
              </IconButton>
              <IconButton
                color="black"
                onClick={() => {
                  setModalData(faq);
                  setModalType("edit");
                  setFaqsActionModal(true);
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
          setFaqsActionModal(true);
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
        Add Faqs
      </Button>
    </Box>
  );
};

export default FaqsSection;
