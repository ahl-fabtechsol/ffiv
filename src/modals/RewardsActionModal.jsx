import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { IconButton, TextField } from "@mui/material";
import { MdCancel, MdDelete } from "react-icons/md";
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

const RewardsActionModal = (props) => {
  const { rewards, setRewards } = props;

  const handleAddReward = () => {
    setRewards([
      ...rewards,
      { id: Date.now(), name: "", price: "", features: [] },
    ]);
  };

  const handleRemoveReward = (id) => {
    setRewards(rewards.filter((reward) => reward.id !== id));
  };

  const handleChangeReward = (id, field, value) => {
    setRewards(
      rewards.map((reward) =>
        reward.id === id ? { ...reward, [field]: value } : reward
      )
    );
  };

  const handleRewardFeaturesChange = (id, value) => {
    setRewards(
      rewards.map((reward) =>
        reward.id === id
          ? { ...reward, features: value ? value.split("\n") : [] }
          : reward
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
          <p className="text-xl font-bold">Add Rewards</p>

          <IconButton onClick={props.onClose}>
            <MdCancel size={25} color="black" />
          </IconButton>
        </Box>
        <Box className="flex flex-col gap-3">
          <p className="text-3xl font-bold">Rewards</p>
          <p className="text-sm font-extralight">
            You can customize rewards according to your plans.
          </p>
        </Box>
        {rewards.map((reward, index) => (
          <Box
            key={reward.id}
            className="flex flex-col gap-6 p-6 border rounded-xl bg-white shadow-md my-3"
          >
            <TextField
              fullWidth
              label="Reward Name"
              variant="outlined"
              value={reward.name}
              onChange={(e) =>
                handleChangeReward(reward.id, "name", e.target.value)
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
              label="Price"
              variant="outlined"
              type="number"
              value={reward.price}
              onChange={(e) =>
                handleChangeReward(reward.id, "price", e.target.value)
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
              label="Reward Features (One per line)"
              fullWidth
              multiline
              type="text"
              rows={5}
              value={reward.features.join("\n")}
              required
              onChange={(e) =>
                handleRewardFeaturesChange(reward.id, e.target.value)
              }
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
                onClick={() => handleRemoveReward(reward.id)}
              >
                <MdDelete />
              </IconButton>
            </Box>
          </Box>
        ))}

        <Button
          startIcon={<IoMdAdd />}
          onClick={handleAddReward}
          variant="contained"
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
          Add New Reward
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

export default RewardsActionModal;
