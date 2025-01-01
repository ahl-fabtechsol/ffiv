import { Box, CssBaseline } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Dashboardnav = ({ type }) => {
  return (
    <Box
      className=""
      sx={{
        backgroundColor: "#F0F6FF",
        minHeight: "100vh",
      }}
    >
      <Box
        className=""
        sx={{ display: "flex", height: "100vh", width: "100vw" }}
      >
        <CssBaseline />
        <Header type={type} />
        <Box
          className=" md:mx-3  pb-2 "
          style={{ overflow: "auto" }}
          component="main"
          sx={{
            flexGrow: 1,

            width: { md: `calc(100% - ${270}px)`, overflow: "auto" },
            marginTop: "85px",
          }}
        >
          <Outlet context={{ type }} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboardnav;
