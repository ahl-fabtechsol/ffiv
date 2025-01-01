import {
  AppBar,
  Avatar,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import { MdOutlineAccountCircle } from "react-icons/md";
import { TiGroup } from "react-icons/ti";
import { CiSettings } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";

const profileDropdownItems = [
  {
    id: 1,
    value: "Account",
    icon: <MdOutlineAccountCircle />,
  },
  {
    id: 2,
    value: "Manage Team",
    icon: <TiGroup />,
  },
  {
    id: 3,
    value: "Settings",
    icon: <CiSettings />,
  },
  {
    id: 4,
    value: "Logout",
    icon: <IoLogOutOutline />,
  },
];

function Navbar({ handleDrawerToggle }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(900));

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <AppBar className="bg-white shadow-none" position="fixed">
        <Box className="flex justify-between">
          <Box className="flex items-center justify-end w-full p-2  bg-white">
            <div className="flex items-center">
              <Box className="flex items-center gap-3 p-2 rounded-lg cursor-pointer">
                <Box className="hidden lg:block">
                  <Typography
                    variant="subtitle1"
                    className="font-bold text-gray-900"
                  >
                    Joshua Spencer
                  </Typography>
                  <Typography variant="body2" className="text-gray-500">
                    Client
                  </Typography>
                </Box>

                <Avatar
                  alt="User Name"
                  src="/navbarProfilePic.svg"
                  className="w-10 h-10 mr-2"
                  onClick={handleAvatarClick}
                />

                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  {profileDropdownItems.map((item) => (
                    <MenuItem
                      className="flex items-center gap-3 w-64"
                      key={item.id}
                      onClick={handleClose}
                    >
                      {item.icon}
                      <Typography>{item.value}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
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
