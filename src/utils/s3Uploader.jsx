import toast from "react-hot-toast";
import apiClient from "../api/apiClient";
import axios from "axios";

export const s3Uploader = async (file) => {
  try {
    const response = await apiClient.post("upload-helper", {
      fileName: file.name,
      fileType: file.type,
    });
    const { url, fileKey } = response.data;
    const config = {
      headers: {
        "Content-Type": file.type,
      },
    };
    await axios.put(url, file, config);
    const fileUrl = `https://fundfiesta.s3.amazonaws.com/${fileKey}`;
    return fileUrl;
  } catch (error) {
    toast.error("Failed to upload image");
    return error;
  }
};
