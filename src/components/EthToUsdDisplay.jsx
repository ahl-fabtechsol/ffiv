import { Box, CircularProgress, Typography } from "@mui/material";
import { useEthToUsd } from "../hooks/useEthToUsd";

const EthToUsdDisplay = ({ ethAmount }) => {
  const numericEthAmount = Number(ethAmount) || 0;
  const { usdValue, loading, error } = useEthToUsd(numericEthAmount);

  if (loading && numericEthAmount > 0) {
    return <CircularProgress size={20} />;
  }

  if (error) {
    return (
      <span title={error}>
        {numericEthAmount} ETH
        <Typography variant="caption" color="error" sx={{ ml: 0.5 }}>
          (USD N/A)
        </Typography>
      </span>
    );
  }

  if (usdValue !== null && numericEthAmount > 0) {
    return (
      <Box
        sx={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography
          variant="body2"
          component="span"
          sx={{ fontWeight: "bold", lineHeight: 1.2 }}
        >
          {numericEthAmount} ETH
        </Typography>
        <Typography
          variant="caption"
          color="textSecondary"
          sx={{ lineHeight: 1.2 }}
        >
          (${usdValue.toFixed(2)})
        </Typography>
      </Box>
    );
  }
  return <span>{numericEthAmount} ETH</span>;
};

export default EthToUsdDisplay;
