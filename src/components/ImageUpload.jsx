import React, { useState, useRef } from "react";
import { Button, Box } from "@mui/material";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

const ImageUpload = (props) => {
  const { setImageFile } = props;
  const [imageSrc, setImageSrc] = useState(null);
  const imageRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const imageURL = URL.createObjectURL(file);
      setImageSrc(imageURL);
    }
  };

  const handleRemoveImage = () => {
    setImageSrc(null);
    setImageFile(null);
    if (imageRef.current) {
      imageRef.current.value = "";
    }
  };

  return (
    <Box className="p-4 border rounded-lg bg-white">
      {imageSrc ? (
        <Box className="mt-4">
          <p className="mb-4 text-md">Image Preview:</p>
          <img
            src={imageSrc}
            alt="preview"
            className="w-full h-64 object-contain rounded-lg shadow-lg mb-4"
          />

          <Button
            onClick={handleRemoveImage}
            startIcon={<MdDelete />}
            variant="outlined"
            color="error"
            size="small"
          >
            Remove Image
          </Button>
        </Box>
      ) : (
        <Box>
          <p className="text-lg mb-4 font-bold">Upload Image</p>
          <input
            ref={imageRef}
            type="file"
            accept="image/*"
            className="hidden"
            id="image-upload"
            onChange={handleFileChange}
          />
          <label htmlFor="image-upload">
            <Button
              component="span"
              startIcon={<IoCloudUploadOutline />}
              variant="contained"
              sx={{
                backgroundColor: "#84cc16",
                "&:hover": { backgroundColor: "#6aa40f" },
              }}
            >
              Choose Image
            </Button>
          </label>
        </Box>
      )}
    </Box>
  );
};

export default ImageUpload;
