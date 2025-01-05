import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import { MdCancel } from "react-icons/md";
import BasicInfo from "../components/campaignTabs/BasicInfo";
import Documents from "../components/campaignTabs/Documents";
import Team from "../components/campaignTabs/Team";
import Backers from "../components/campaignTabs/Backers";
import Faqs from "../components/campaignTabs/Faqs";
import ProjectTimeLine from "../components/campaignTabs/ProjectTimeLine";
import Rewards from "../components/campaignTabs/Rewards";
import CustomTabs from "../components/CustomTabs";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "100%",
    sm: "80%",
    md: "70%",
  },
  maxHeight: {
    xs: "100vh",
    sm: "80vh",
  },
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  borderRadius: {
    sm: "0px",
    md: "10px",
  },
  p: 3,
  overflowY: "auto",
  "::-webkit-scrollbar": {
    width: "0px",
  },
  "-ms-overflow-style": "none",
  "scrollbar-width": "none",
};

const tabLabels = [
  "Basic Info",
  "Documents",
  "Team",
  "Backers",
  "Faqs",
  "Timeline",
  "Rewards",
];
const tabPanels = [
  <BasicInfo />,
  <Documents />,
  <Team />,
  <Backers />,
  <Faqs />,
  <ProjectTimeLine />,
  <Rewards />,
];

const EditCampaignModal = (props) => {
  const [currentTab, setcurrentTab] = useState(0);
  const handleSave = () => {};
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box className="flex justify-between items-center mb-4">
          <p className="text-xl font-bold">Edit Campaign</p>

          <IconButton onClick={props.onClose}>
            <MdCancel size={25} color="black" />
          </IconButton>
        </Box>
        <CustomTabs
          tabs={tabLabels}
          panels={tabPanels}
          setcurrentTab={setcurrentTab}
        />
      </Box>
    </Modal>
  );
};

export default EditCampaignModal;
