import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import FaqsActionModal from "../../../modals/FaqsActionModal";

const FaqsSection = () => {
  const [faqs, setFaqs] = useState([
    { id: Date.now(), question: "", answer: "" },
  ]);
  const [faqsActionModal, setFaqsActionModal] = useState(false);
  const handleOnSave = () => {
    setFaqsActionModal(false);
  };
  return (
    <Box className="  flex flex-col gap-6 bg-white rounded-lg border p-4">
      {faqsActionModal && (
        <FaqsActionModal
          open={faqsActionModal}
          onClose={() => setFaqsActionModal(false)}
          onSave={handleOnSave}
          faqs={faqs}
          setFaqs={setFaqs}
        />
      )}
      <p className="text-xl font-bold">Add Faqs </p>
      <p className="font-extralight text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
        asperiores iste laboriosam commodi labore quibusdam unde nesciunt nobis
        quas cumque consectetur pariatur, odit reiciendis vitae.
      </p>
      <Box className="flex flex-col  gap-4">
        {faqs.map(
          (faq, index) =>
            faq.question && (
              <Box className="rounded-lg border p-4">
                <p className="text-md font-bold">{faq?.question}</p>
                <p className="font-extralight text-sm">{faq?.answer}</p>
              </Box>
            )
        )}
      </Box>
      <Button
        onClick={() => setFaqsActionModal(true)}
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
        {faqs[0].question ? "Edit" : "Add"} Faqs
      </Button>
    </Box>
  );
};

export default FaqsSection;
