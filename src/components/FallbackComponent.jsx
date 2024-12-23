import { CircularProgress, Box } from "@mui/material";

export function FallbackComponent() {
  return (
    <Box className="flex justify-center items-center min-h-screen">
      <CircularProgress />
    </Box>
  );
}
