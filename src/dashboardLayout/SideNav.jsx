import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { buttonStyle, listItemStyle } from "./SideNavStyles";
import { AiOutlineAppstore } from "react-icons/ai";
import { ListItemIcon } from "@mui/material";
import { FaClipboardList } from "react-icons/fa";
import { FaFlag } from "react-icons/fa6";
import { FaAddressBook } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";

const drawerWidth = 240;

const listItemData = [
  {
    label: "Dashboard",
    name: "dashboard",
    link: `/user/dashboard`,
    icon: <AiOutlineAppstore className="text-xl" />,
  },
  {
    label: "My Campaigns",
    name: "campaigns",
    link: `/user/all-campaign`,
    icon: <FaClipboardList className="text-xl" />,
  },
  {
    label: "Create Campaign",
    name: "create-campaign",
    link: `/user/create-campaign`,
    icon: <FaFlag className="text-xl" />,
  },
  {
    label: "Notifications",
    name: "notifications",
    link: `/user/notifications`,
    icon: <IoMdNotificationsOutline className="text-xl" />,
  },
  {
    label: "Messages",
    name: "messages",
    link: `/user/messages`,
    icon: <FaAddressBook className="text-xl" />,
  },
];

function SideNav(props) {
  const { window } = props;
  const drawer = (
    <div className="rounded-lg">
      <div className="px-3 bg-white h-screen rounded-2xl">
        <div className="flex flex-col justify-between py-3 h-full">
          <div className="p-3 h-[100px] w-full flex justify-center">
            <img
              width={"30%"}
              className="cursor-pointer"
              src="/mainLogo.svg"
              alt="Logo here"
            />
          </div>
          <div className="overflow-y-auto flex-grow">
            <List>
              {listItemData?.map((value, i) => (
                <div key={i} className="py-1">
                  <div className="bg-white text-gray-600">
                    <RenderItem
                      value={value}
                      i={i}
                      className="text-black rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </List>
          </div>
          <div>
            <List className="mx-4 mt-3 bg-white border border-black rounded-lg">
              <ListItem disablePadding className="cursor-pointer">
                <ListItemText>
                  <Typography
                    className="font-bold flex gap-3 px-3 items-center"
                    variant="body2"
                    style={{ fontSize: 14 }}
                    title="logout"
                  >
                    <img src="/logout.svg" className="w-5 me-2" /> Logout
                  </Typography>
                </ListItemText>
              </ListItem>
            </List>
          </div>
        </div>
      </div>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{
        width: { md: drawerWidth },
        flexShrink: { md: 0 },
        bgcolor: "black",
      }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant="temporary"
        open={props.mobileOpen}
        onClose={props.handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            bgcolor: "#FFFFFF",
            color: "black",
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            bgcolor: "white",
            border: 0,
            color: "black",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

SideNav.propTypes = {
  window: PropTypes.func,
};

export default SideNav;

const RenderItem = ({ value, i }) => {
  return value.link ? (
    <ListItem
      key={i}
      component={NavLink}
      to={value?.link || ""}
      disablePadding
      className=""
      sx={listItemStyle}
    >
      <ListItemButton className="hover:bg-blue-500">
        <ListItemIcon className=" myIconClass">{value.icon}</ListItemIcon>
        <ListItemText>
          <Typography variant="body2" className="text-sm" title={value.label}>
            {value.label}
          </Typography>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  ) : (
    <ListItemButton className="hover:bg-blue-500">
      <ListItemText>
        <Typography
          variant="body2"
          className="text-sm text-red-600 font-bold"
          title={value.label}
        >
          {value.label}
        </Typography>
      </ListItemText>
    </ListItemButton>
  );
};
