import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { IconButton, TextField, Typography } from "@mui/material";
import { MdCancel } from "react-icons/md";
import { FaEthereum } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "90%",
    sm: "80%",
    md: "50%",
    lg: "40%",
  },
  maxHeight: {
    xs: "90vh",
    sm: "80vh",
  },
  bgcolor: "white",
  border: "none",
  borderRadius: "16px",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
  p: { xs: 2, sm: 4 },
  overflowY: "auto",
  "::-webkit-scrollbar": {
    width: "8px",
  },
  "::-webkit-scrollbar-thumb": {
    backgroundColor: "#e0e0e0",
    borderRadius: "8px",
  },
  "-ms-overflow-style": "none",
  "scrollbar-width": "thin",
};

const BlockChainPaymentModal = (props) => {
  const [ethValue, setEthValue] = useState("");
  const [error, setError] = useState("");

  const handleEthChange = (e) => {
    const value = e.target.value;
    setEthValue(value);

    if (value === "") {
      setError("");
    } else if (!/^\d*\.?\d*$/.test(value) || parseFloat(value) <= 0) {
      setError("Please enter a valid positive ETH amount.");
    } else {
      setError("");
    }
  };

  const handleSave = () => {
    if (!ethValue || error) {
      setError("Please enter a valid ETH amount.");
      return;
    }
    props.onSave(parseFloat(ethValue));
    setEthValue("");
    props.onClose();
  };

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <motion.div>
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h5"
              sx={{ fontWeight: "bold", color: "#1a1a1a" }}
            >
              Send Ethereum Payment
            </Typography>
            <IconButton
              onClick={props.onClose}
              aria-label="Close"
              sx={{ color: "#1a1a1a" }}
            >
              <MdCancel size={28} />
            </IconButton>
          </Box>

          <Box sx={{ mb: 4 }}>
            <TextField
              fullWidth
              label="Amount (ETH)"
              value={ethValue}
              onChange={handleEthChange}
              error={!!error}
              helperText={error}
              InputProps={{
                startAdornment: (
                  <FaEthereum
                    size={20}
                    style={{ marginRight: "8px", color: "#1a1a1a" }}
                  />
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  "& fieldset": {
                    borderColor: "#e0e0e0",
                  },
                  "&:hover fieldset": {
                    borderColor: "#84cc16",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#84cc16",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#84cc16",
                },
              }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
              onClick={props.onClose}
              variant="outlined"
              sx={{
                textTransform: "none",
                padding: "10px 20px",
                borderRadius: "12px",
                borderColor: "#e0e0e0",
                color: "#1a1a1a",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                  borderColor: "#d0d0d0",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              variant="contained"
              disabled={!ethValue || !!error}
              sx={{
                textTransform: "none",
                padding: "10px 20px",
                borderRadius: "12px",
                backgroundColor: "#84cc16",
                color: "white",
                "&:hover": {
                  backgroundColor: "#6aa40f",
                },
                "&:disabled": {
                  backgroundColor: "#e0e0e0",
                  color: "#a0a0a0",
                },
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </motion.div>
    </Modal>
  );
};

export default BlockChainPaymentModal;
