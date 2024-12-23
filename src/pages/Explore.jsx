import { TextField } from "@mui/material";
import { FiSearch } from "react-icons/fi";
import { FaBorderAll } from "react-icons/fa";
import { RiPagesLine } from "react-icons/ri";
import { BiDonateHeart } from "react-icons/bi";
import { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import useBreakpoint from "../hooks/UseBreakPoints";
import { ExpandableCardGrid } from "../components/ExpandableCardGrid";
import { cards } from "../lib/dummyData";

const Explore = () => {
  const [activeFilterTab, setActiveFilterTab] = useState("all");
  const [activeSortTab, setActiveSortTab] = useState("price");
  const breakpoint = useBreakpoint();

  return (
    <div className="mt-2">
      <div className="py-4 xs:px-20 px-12 xs:py-10 sm:flex justify-between items-end border-b-2">
        <div className="mb-5 sm:mb-0">
          <p className="text-3xl font-bold text-black">Explore</p>
          <p className="text-fdTextGray">Where do you want to help</p>
        </div>
        <div className="relative">
          <TextField
            type="text"
            placeholder="Search"
            variant="outlined"
            className="bg-transparent text-black placeholder:text-black w-[300px] "
            InputProps={{
              startAdornment: (
                <FiSearch className="text-black ml-1 me-4" size={25} />
              ),
            }}
          />
        </div>
      </div>
      <div className="py-4 xs:px-20 px-12 xs:py-10 sm:flex justify-between items-center">
        <div className="xs:flex items-center mb-5 sm:mb-0">
          <div
            onClick={() => setActiveFilterTab("all")}
            className={`p-3 flex flex-row items-center gap-1 cursor-pointer select-none ${
              activeFilterTab === "all"
                ? "bg-white text-black"
                : "bg-[#f1f5f9] text-[#64748b]"
            }`}
            style={
              breakpoint === "initial"
                ? {
                    border: "2px solid #cbd5e1",
                    borderRadius: "10px",
                    borderRight: "2px solid #cbd5e1",
                  }
                : {
                    border: "2px solid #cbd5e1",
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px",
                    borderRight: "none",
                  }
            }
          >
            <FaBorderAll />
            <p>All Views</p>
          </div>
          <div
            onClick={() => setActiveFilterTab("petitions")}
            className={`p-3 flex flex-row items-center gap-1 cursor-pointer select-none ${
              activeFilterTab === "petitions"
                ? "bg-white text-black"
                : "bg-[#f1f5f9] text-[#64748b]"
            }`}
            style={
              breakpoint === "initial"
                ? {
                    border: "2px solid #cbd5e1",
                    borderRadius: "10px",
                    borderRight: "2px solid #cbd5e1",
                  }
                : {
                    border: "2px solid #cbd5e1",
                    borderRight: "none",
                  }
            }
          >
            <RiPagesLine />
            <p>Petitions</p>
          </div>
          <div
            onClick={() => setActiveFilterTab("donations")}
            className={`p-3 flex flex-row items-center gap-1 cursor-pointer select-none ${
              activeFilterTab === "donations"
                ? "bg-white text-black"
                : "bg-[#f1f5f9] text-[#64748b]"
            }`}
            style={
              breakpoint === "initial"
                ? { border: "2px solid #cbd5e1", borderRadius: "10px" }
                : {
                    border: "2px solid #cbd5e1",
                    borderTopRightRadius: "10px",
                    borderBottomRightRadius: "10px",
                  }
            }
          >
            <BiDonateHeart />
            <p>Donations</p>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <div
            onClick={() => setActiveSortTab("price")}
            className={`p-3 flex flex-row items-center gap-1 cursor-pointer select-none ${
              activeSortTab === "price"
                ? "bg-white text-black"
                : "bg-[#f1f5f9] text-[#64748b]"
            }`}
            style={{
              border: "2px solid #cbd5e1",
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: "10px",
              borderRight: "none",
            }}
          >
            <FaArrowUp />
            <p>Price</p>
          </div>

          <div
            onClick={() => setActiveSortTab("date")}
            className={`p-3 flex flex-row items-center gap-1 cursor-pointer select-none ${
              activeSortTab === "date"
                ? "bg-white text-black"
                : "bg-[#f1f5f9] text-[#64748b]"
            }`}
            style={{
              border: "2px solid #cbd5e1",
              borderTopRightRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
          >
            <FaArrowDown />
            <p>Date</p>
          </div>
        </div>
      </div>
      <div className="py-4 xs:px-20 px-8 xs:py-10 ">
        <ExpandableCardGrid cards={cards} />
      </div>
    </div>
  );
};

export default Explore;
