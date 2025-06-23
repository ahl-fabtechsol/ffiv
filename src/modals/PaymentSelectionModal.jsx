import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { IconButton, Typography } from "@mui/material";
import { MdCancel } from "react-icons/md";
import { FaBitcoin, FaUniversity } from "react-icons/fa";
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

const PaymentSelectionModal = (props) => {
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handlePaymentSelect = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  const handleSave = () => {
    if (selectedPayment === "Bank") {
      props.onBank();
      props.onClose();
    } else {
      props.onBlockchain();
      props.onClose();
    }
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
              Choose Payment Method
            </Typography>
            <IconButton
              onClick={props.onClose}
              aria-label="Close"
              sx={{ color: "#1a1a1a" }}
            >
              <MdCancel size={28} />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                fullWidth
                onClick={() => handlePaymentSelect("Blockchain")}
                variant={
                  selectedPayment === "Blockchain" ? "contained" : "outlined"
                }
                sx={{
                  textTransform: "none",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  borderColor:
                    selectedPayment === "Blockchain"
                      ? "transparent"
                      : "#e0e0e0",
                  backgroundColor:
                    selectedPayment === "Blockchain" ? "#84cc16" : "white",
                  color: selectedPayment === "Blockchain" ? "white" : "#1a1a1a",
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: 2,
                  boxShadow:
                    selectedPayment === "Blockchain"
                      ? "0 4px 12px rgba(132, 204, 22, 0.3)"
                      : "none",
                  "&:hover": {
                    backgroundColor:
                      selectedPayment === "Blockchain" ? "#6aa40f" : "#f5f5f5",
                    borderColor: "#e0e0e0",
                  },
                }}
              >
                <FaBitcoin size={24} />
                <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                  Pay with Blockchain
                </Typography>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                fullWidth
                onClick={() => handlePaymentSelect("Bank")}
                variant={selectedPayment === "Bank" ? "contained" : "outlined"}
                sx={{
                  textTransform: "none",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  borderColor:
                    selectedPayment === "Bank" ? "transparent" : "#e0e0e0",
                  backgroundColor:
                    selectedPayment === "Bank" ? "#84cc16" : "white",
                  color: selectedPayment === "Bank" ? "white" : "#1a1a1a",
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: 2,
                  boxShadow:
                    selectedPayment === "Bank"
                      ? "0 4px 12px rgba(132, 204, 22, 0.3)"
                      : "none",
                  "&:hover": {
                    backgroundColor:
                      selectedPayment === "Bank" ? "#6aa40f" : "#f5f5f5",
                    borderColor: "#e0e0e0",
                  },
                }}
              >
                <FaUniversity size={24} />
                <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                  Pay with Bank
                </Typography>
              </Button>
            </motion.div>
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
              disabled={!selectedPayment}
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
              Confirm
            </Button>
          </Box>
        </Box>
      </motion.div>
    </Modal>
  );
};

export default PaymentSelectionModal;
