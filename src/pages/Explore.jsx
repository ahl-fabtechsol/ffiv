import { Box, TextField } from "@mui/material";
import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";
import useBreakpoint from "../hooks/UseBreakPoints";
import { ExpandableCardGrid } from "../components/ExpandableCardGrid";
import { Loader } from "../components/customLoader/Loader";
import toast from "react-hot-toast";
import apiClient from "../api/apiClient";

const Explore = () => {
  const breakpoint = useBreakpoint();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const getCampaigns = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(`campaign?name=${search}`);
      if (!response.ok) {
        setLoading(false);
        toast.error(response?.data?.message || "Something went wrong");
        return;
      }
      setLoading(false);
      const filteredCampaigns = response?.data?.campaigns.filter((campaign) => {
        if (campaign?.status === "A" || campaign?.status === "C")
          return campaign;
      });
      setCampaigns(filteredCampaigns);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getCampaigns();
  }, [search]);

  return (
    <Box className="mt-2">
      <Loader loading={loading} />
      <Box className="py-4 xs:px-20 px-12 xs:py-10 sm:flex justify-between items-end border-b-2">
        <Box className="mb-5 sm:mb-0">
          <p className="text-3xl font-bold text-black">Explore</p>
          <p className="text-fdTextGray">Where do you want to help</p>
        </Box>
        <Box className="relative">
          <TextField
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant="outlined"
            className="bg-transparent text-black placeholder:text-black w-[300px] "
            InputProps={{
              startAdornment: (
                <FiSearch className="text-black ml-1 me-4" size={25} />
              ),
            }}
          />
        </Box>
      </Box>

      <Box className="py-4 xs:px-20 px-8 xs:py-10 ">
        <ExpandableCardGrid cards={campaigns} />
      </Box>
    </Box>
  );
};

export default Explore;
