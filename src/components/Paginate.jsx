import React from "react";
import { Box, Pagination } from "@mui/material";

const Paginate = ({ count, limit, onChange, defaultNumber }) => {
  if (count == 0) return;
  return (
    <Box display="flex" justifyContent="flex-end" mt={2}>
      <Pagination
        count={Math.ceil(count / limit)}
        sx={{
          "& .MuiPaginationItem-root": {
            color: "secondary",
            "&.Mui-selected": {
              backgroundColor: "#48773f",
              color: "white",
            },
            "&:hover": {
              backgroundColor: "#48773f",
            },
          },
        }}
        defaultPage={defaultNumber}
        onChange={(event, value) => onChange(value)}
      />
    </Box>
  );
};
export default Paginate;
