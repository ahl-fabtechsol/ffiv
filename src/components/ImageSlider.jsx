import React, { useState } from "react";
import Slider from "react-slick";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ImageSlider = () => {
  const [sliderRef, setSliderRef] = useState(null);
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const images = [
    "https://images.unsplash.com/photo-1735689978278-c3400952ddda?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1731223834043-6f8fd8f87161?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1727452274228-4fa1c56142db?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzMnx8fGVufDB8fHx8fA%3D%3D",
  ];

  return (
    <Box className="relative w-full h-screen overflow-hidden">
      <Slider ref={(slider) => setSliderRef(slider)} {...settings}>
        {images.map((image, index) => (
          <Box key={index} className="w-full h-screen">
            <Box className="relative w-full h-full">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </Box>
          </Box>
        ))}
      </Slider>

      <Box className="absolute top-0 left-0 w-full h-full glass-blur rounded-lg z-0"></Box>

      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
          Create Your Campaign
        </h1>
        <p className="text-lg sm:text-xl font-medium mb-6">
          Launch your crowdfunding campaign with ease and support from the
          community
        </p>
        <Button
          onClick={() => navigate("/signup")}
          className="bg_primary"
          sx={{
            textTransform: "none",
            color: "white",
            padding: "12px",
            width: "200px",
            borderRadius: "30px",
          }}
        >
          Get Started
        </Button>
      </Box>

      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition duration-300"
        onClick={() => sliderRef?.slickPrev()}
      >
        <HiChevronLeft size={24} />
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition duration-300"
        onClick={() => sliderRef?.slickNext()}
      >
        <HiChevronRight size={24} />
      </button>
    </Box>
  );
};

export default ImageSlider;
