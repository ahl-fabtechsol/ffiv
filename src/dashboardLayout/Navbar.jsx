import {
  AppBar,
  Avatar,
  Hidden,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";

function Navbar({ handleDrawerToggle, type }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(900));
  const user = useSelector((state) => state.auth.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return (
    <Box>
      <AppBar className="bg-white shadow-none" position="fixed">
        <Box className="flex justify-between">
          <Box className="flex items-center justify-between w-full p-2  bg-white">
            <Typography
              variant="h6"
              className=" text-gray-900"
              sx={{
                marginLeft: {
                  md: "270px",
                },
                fontWeight: "bold",
              }}
            >
              {type === "user" ? "User Dashboard" : "Admin Dashboard"}
            </Typography>
            <div className="flex items-center">
              <Box className="flex items-center gap-3 p-2 rounded-lg cursor-pointer">
                <Box className="hidden lg:block">
                  <Typography
                    variant="subtitle1"
                    className="font-bold text-gray-900"
                  >
                    {user?.firstName} {user?.lastName}
                  </Typography>
                  <Typography variant="body2" className="text-gray-500">
                    {user?.role === "AD" ? "Admin" : "User"}
                  </Typography>
                </Box>

                <Avatar
                  alt="User Name"
                  src={user?.profilePicture || "/avatar.png"}
                  className="w-12 h-12 rounded-full object-cover "
                />
              </Box>

              <Hidden mdUp>
                <IconButton onClick={handleDrawerToggle}>
                  <MenuIcon className="text-black" />
                </IconButton>
              </Hidden>
            </div>
          </Box>
        </Box>
      </AppBar>
    </Box>
  );
}

export default Navbar;
