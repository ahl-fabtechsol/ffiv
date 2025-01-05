import React, { useState, useRef } from "react";
import { Button, Box } from "@mui/material";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

const VideoUpload = () => {
  const [videoSrc, setVideoSrc] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const videoRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      const videoURL = URL.createObjectURL(file);
      setVideoSrc(videoURL);
    }
  };

  const handleRemoveVideo = () => {
    setVideoSrc(null);
    setVideoFile(null);
    if (videoRef.current) {
      videoRef.current.value = "";
    }
  };

  return (
    <Box className="p-4 border rounded-lg bg-white">
      {videoSrc ? (
        <Box className="mt-4">
          <p className="mb-4 text-md">Video Preview:</p>
          <video
            controls
            src={videoSrc}
            className="w-full h-64 rounded-lg shadow-lg mb-4"
          />

          <Button
            onClick={handleRemoveVideo}
            startIcon={<MdDelete />}
            variant="outlined"
            color="error"
            size="small"
          >
            Remove Video
          </Button>
        </Box>
      ) : (
        <Box>
          <p className="text-lg mb-4 font-bold">Upload Video</p>
          <input
            ref={videoRef}
            type="file"
            accept="video/*"
            className="hidden"
            id="video-upload"
            onChange={handleFileChange}
          />
          <label htmlFor="video-upload">
            <Button
              component="span"
              startIcon={<IoCloudUploadOutline />}
              variant="contained"
              sx={{
                backgroundColor: "#84cc16",
                "&:hover": { backgroundColor: "#6aa40f" },
              }}
            >
              Choose Video
            </Button>
          </label>
        </Box>
      )}
    </Box>
  );
};

export default VideoUpload;
