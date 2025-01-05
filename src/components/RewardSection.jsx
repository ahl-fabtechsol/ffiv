import React, { useState } from "react";
import {
  Button,
  Box,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { IoGiftOutline } from "react-icons/io5";

const RewardSection = () => {
  const [open, setOpen] = useState(false);
  const [rewards, setRewards] = useState([
    {
      name: "Supporter Pack",
      price: 25,
      features: [
        "Exclusive Project Sticker",
        "Thank You Email",
        "Early Access to Updates",
      ],
    },
    {
      name: "Collector's Edition",
      price: 75,
      features: [
        "Custom T-Shirt",
        "Limited Edition Poster",
        "Your Name on Supporter Wall",
        "Access to Behind-the-Scenes Content",
      ],
    },
    {
      name: "Ultimate Backer",
      price: 150,
      features: [
        "Exclusive Signed Merchandise",
        "Virtual Meet & Greet",
        "Beta Access to Product",
        "Recognition in Project Credits",
        "Invitation to Launch Event",
      ],
    },
  ]);

  const [rewardTitle, setRewardTitle] = useState("");
  const [rewardDescription, setRewardDescription] = useState("");
  const [pledgeAmount, setPledgeAmount] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddReward = () => {
    if (rewardTitle && pledgeAmount) {
      const newReward = {
        name: rewardTitle,
        price: pledgeAmount,
        features: rewardDescription ? rewardDescription.split("\n") : [],
      };
      setRewards([...rewards, newReward]);
      setRewardTitle("");
      setRewardDescription("");
      setPledgeAmount("");
      handleClose();
    }
  };

  return (
    <Box className="mt-10 flex flex-col gap-6 bg-white rounded-lg border p-6">
      <Typography variant="h4" fontWeight="bold" align="center">
        Our Exclusive Rewards
      </Typography>
      <Typography variant="body1" color="textSecondary" align="center">
        Explore and choose rewards for contributing to our crowdfunding
        campaign.
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {rewards.map((reward, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className="shadow-lg">
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {reward.name}
                </Typography>
                <Typography variant="h4" fontWeight="bold" color="primary">
                  ${reward.price}
                </Typography>
                <ul className="list-disc pl-5 mt-2">
                  {reward.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box className="text-center mt-6">
        <Button
          variant="contained"
          startIcon={<IoGiftOutline />}
          onClick={handleOpen}
          sx={{
            backgroundColor: "#f59e0b",
            "&:hover": { backgroundColor: "#d97706" },
          }}
        >
          Add Reward
        </Button>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box className="p-6 bg-white rounded-lg w-96 mx-auto mt-20">
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Add Reward
          </Typography>
          <TextField
            label="Reward Title"
            fullWidth
            margin="dense"
            value={rewardTitle}
            onChange={(e) => setRewardTitle(e.target.value)}
          />
          <TextField
            label="Reward Description (One per line)"
            fullWidth
            multiline
            rows={3}
            margin="dense"
            value={rewardDescription}
            onChange={(e) => setRewardDescription(e.target.value)}
          />
          <TextField
            label="Pledge Amount"
            fullWidth
            margin="dense"
            type="number"
            value={pledgeAmount}
            onChange={(e) => setPledgeAmount(e.target.value)}
          />
          <Button
            onClick={handleAddReward}
            variant="contained"
            sx={{
              marginTop: 2,
              backgroundColor: "#4caf50",
              "&:hover": { backgroundColor: "#388e3c" },
            }}
          >
            Add
          </Button>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{ marginTop: 2, marginLeft: 2 }}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default RewardSection;
