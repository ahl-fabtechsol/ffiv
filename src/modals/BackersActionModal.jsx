import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Avatar, IconButton, TextField, Typography } from "@mui/material";
import { MdCancel, MdDelete } from "react-icons/md";
import { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "100%",
    sm: "80%",
    md: "70%",
  },
  maxHeight: {
    xs: "100vh",
    sm: "80vh",
  },
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  borderRadius: {
    sm: "0px",
    md: "10px",
  },
  p: 3,
  overflowY: "auto",
  "::-webkit-scrollbar": {
    width: "0px",
  },
  "-ms-overflow-style": "none",
  "scrollbar-width": "none",
};

const BackersActionModal = (props) => {
  const { backers, setBackers } = props;

  const handleAddBacker = () => {
    const newBacker = {
      id: Date.now(),
      name: "",
      designation: "",
      comment: "",
      picture: null,
    };
    setBackers([...backers, newBacker]);
  };

  const handleRemoveBacker = (id) => {
    setBackers(backers.filter((backer) => backer.id !== id));
  };

  const handleChangeBacker = (id, field, value) => {
    setBackers(
      backers.map((backer) =>
        backer.id === id ? { ...backer, [field]: value } : backer
      )
    );
  };

  const handlePictureChangeBacker = (id, event) => {
    const file = event.target.files[0];
    setBackers(
      backers.map((backer) =>
        backer.id === id ? { ...backer, picture: file } : backer
      )
    );
  };

  const handleRemovePictureBacker = (id) => {
    setBackers(
      backers.map((backer) =>
        backer.id === id ? { ...backer, picture: null } : backer
      )
    );
  };
  const handleSave = () => {
    props.onSave();
  };
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box className="flex justify-between items-center">
          <p className="text-xl font-bold">Add Backers</p>

          <IconButton onClick={props.onClose}>
            <MdCancel size={25} color="black" />
          </IconButton>
        </Box>
        <Box className="flex flex-col gap-3">
          <p className="text-3xl font-bold">Backers</p>
          <p className="text-sm font-extralight">
            Add your backers here. You can add multiple backers and their images
          </p>
        </Box>
        {backers.map((backer, index) => (
          <Box
            key={backer.id}
            className="flex flex-col gap-6 p-6 border rounded-xl bg-white my-3"
          >
            <Box className="flex xs:flex-row flex-col items-center gap-6">
              <Avatar
                src={backer.picture ? URL.createObjectURL(backer.picture) : ""}
                sx={{ width: 100, height: 100, border: "3px solid #84cc16" }}
              />
              <Box className="flex flex-col gap-2">
                {backer.picture ? (
                  <Button
                    onClick={() => handleRemovePictureBacker(backer.id)}
                    startIcon={<MdDelete />}
                    variant="outlined"
                    color="error"
                    size="small"
                  >
                    Remove Image
                  </Button>
                ) : (
                  <Button
                    component="label"
                    startIcon={<IoCloudUploadOutline />}
                    variant="contained"
                    sx={{
                      backgroundColor: "#84cc16",
                      "&:hover": { backgroundColor: "#6aa40f" },
                    }}
                  >
                    Upload Image
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => handlePictureChangeBacker(backer.id, e)}
                    />
                  </Button>
                )}
                <Typography variant="caption" color="text.secondary">
                  Upload high-quality profile picture.
                </Typography>
              </Box>
            </Box>

            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={backer.name}
              onChange={(e) =>
                handleChangeBacker(backer.id, "name", e.target.value)
              }
              required
              sx={{
                "& label.Mui-focused": {
                  color: "#84cc16",
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#84cc16",
                  },
                },
              }}
            />

            <TextField
              fullWidth
              label="Designation"
              variant="outlined"
              value={backer.designation}
              onChange={(e) =>
                handleChangeBacker(backer.id, "designation", e.target.value)
              }
              required
              sx={{
                "& label.Mui-focused": {
                  color: "#84cc16",
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#84cc16",
                  },
                },
              }}
            />

            <TextField
              fullWidth
              label="Comment"
              variant="outlined"
              value={backer.comment}
              onChange={(e) =>
                handleChangeBacker(backer.id, "comment", e.target.value)
              }
              required
              sx={{
                "& label.Mui-focused": {
                  color: "#84cc16",
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#84cc16",
                  },
                },
              }}
            />

            <Box className="flex justify-end">
              <IconButton
                color="error"
                onClick={() => handleRemoveBacker(backer.id)}
              >
                <MdDelete />
              </IconButton>
            </Box>
          </Box>
        ))}

        <Button
          onClick={handleAddBacker}
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
          Add New Backer
        </Button>
        <Box className="flex flex-col my-10 gap-6">
          <Box className="flex justify-end gap-3 items-center">
            <Button
              onClick={props.onClose}
              variant="contained"
              sx={{
                textTransform: "none",
                backgroundColor: "#B0B0B0",
                color: "white",
                padding: "12px",
                width: "100px",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "#8C8C8C",
                },
              }}
            >
              Cancel
            </Button>

            <Button
              onClick={handleSave}
              variant="contained"
              sx={{
                textTransform: "none",
                backgroundColor: "#84cc16",
                color: "white",
                padding: "12px",
                width: "100px",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "#6aa40f",
                },
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default BackersActionModal;
