import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const CustomTabs = ({ tabs, panels, setcurrentTab }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dataParam = queryParams.get("activeTab");
  const [value, setValue] = React.useState(Number(dataParam));
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (setcurrentTab) {
      setcurrentTab(newValue);
    }
  };

  return (
    <div>
      <Box className="w-full">
        <Box>
          <Box className="flex flex-col md:flex-row justify-between mt-2">
            <Tabs
              variant="scrollable"
              scrollButtons="auto"
              value={value}
              onChange={handleChange}
              TabIndicatorProps={{
                style: {
                  backgroundColor: "black",
                  display: "none",
                },
              }}
              aria-label="basic tabs example"
            >
              {tabs.map((tab, index) => (
                <Tab
                  sx={{
                    color:
                      value === index
                        ? "#84cc16 !important"
                        : "#9e9e9e !important",
                  }}
                  label={tab}
                  {...a11yProps(index)}
                />
              ))}
            </Tabs>
          </Box>
        </Box>
        {panels.map((panel, index) => (
          <CustomTabPanel
            className="border-t-2"
            value={value}
            index={index}
            key={index}
          >
            {panel}
          </CustomTabPanel>
        ))}
      </Box>
    </div>
  );
};

export default CustomTabs;
