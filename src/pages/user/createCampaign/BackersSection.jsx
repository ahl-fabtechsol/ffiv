import { Avatar, Box, Button } from "@mui/material";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import BackersActionModal from "../../../modals/BackersActionModal";

const BackersSection = () => {
  const [backersActionModal, setBackersActionModal] = useState(false);
  const [backers, setBackers] = useState([
    {
      id: Date.now(),
      name: "",
      designation: "",
      comment: "",
      picture: null,
    },
  ]);
  const handleSave = () => {
    setBackersActionModal(false);
  };
  return (
    <Box className="  flex flex-col gap-6 bg-white rounded-lg border p-4">
      {backersActionModal && (
        <BackersActionModal
          open={backersActionModal}
          onClose={() => setBackersActionModal(false)}
          onSave={handleSave}
          backers={backers}
          setBackers={setBackers}
        />
      )}
      <p className="text-xl font-bold">Tell Us about Your Backers </p>
      <p className="font-extralight text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
        asperiores iste laboriosam commodi labore quibusdam unde nesciunt nobis
        quas cumque consectetur pariatur, odit reiciendis vitae.
      </p>

      <Box className="grid sm:grid-cols-3 grid-cols-1  gap-4">
        {backers.map(
          (backer, index) =>
            backer.name && (
              <Box
                className="col-span-1 rounded-lg border p-4 flex gap-3 items-center flex-wrap"
                key={backer.id}
              >
                <Avatar
                  src={
                    backer.picture ? URL.createObjectURL(backer?.picture) : ""
                  }
                  sx={{ width: 70, height: 70, border: "3px solid #84cc16" }}
                />
                <Box>
                  <p className="text-md font-bold">{backer?.name}</p>
                  <p className="font-extralight text-sm">
                    {backer?.designation}
                  </p>
                  <p className="mt-3 text-md">{backer?.comment}</p>
                </Box>
              </Box>
            )
        )}
      </Box>
      <Button
        onClick={() => setBackersActionModal(true)}
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
        {backers[0].name ? "Edit" : "Add"} Backers
      </Button>
    </Box>
  );
};

export default BackersSection;
