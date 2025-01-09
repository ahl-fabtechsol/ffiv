import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { IconButton, TextField } from "@mui/material";
import { MdCancel, MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { Loader } from "../components/customLoader/Loader";
import toast from "react-hot-toast";
import apiClient from "../api/apiClient";
import { Formik, Form } from "formik";
import * as Yup from "yup";
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

const RewardsActionModal = (props) => {
  const { campaignId } = props;
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is Required"),
    features: Yup.string().required("Features is Required"),
    price: Yup.string().required("Price is Required"),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await apiClient.post("reward", {
        ...values,
        campaignId,
      });
      if (!response.ok) {
        setLoading(false);
        toast.error(response?.data?.message || "Something went wrong");
        return;
      }
      setLoading(false);
      toast.success("Reward Added Successfully");
      props.onAction();
      props.onClose();
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Loader loading={loading} />
        <Box className="flex justify-between items-center">
          <p className="text-xl font-bold">Add Rewards</p>

          <IconButton onClick={props.onClose}>
            <MdCancel size={25} color="black" />
          </IconButton>
        </Box>
        <Box className="flex flex-col gap-3">
          <p className="text-3xl font-bold">Rewards</p>
          <p className="text-sm font-extralight">
            You can customize rewards according to your plans.
          </p>
        </Box>
        <Formik
          initialValues={{
            title: "",
            price: "",
            features: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, handleChange, handleBlur, setFieldValue }) => (
            <Form>
              <Box className="flex flex-col gap-6 p-6 border rounded-xl bg-white shadow-md my-3">
                <TextField
                  fullWidth
                  label="Reward Title"
                  variant="outlined"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="title"
                  error={errors.title}
                  helperText={errors.title}
                  required
                  sx={{
                    "& label.Mui-focused": {
                      color: "#84cc16",
                    },
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#84cc16",
                      },
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Price"
                  variant="outlined"
                  type="number"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="price"
                  error={errors.price}
                  helperText={errors.price}
                  required
                  sx={{
                    "& label.Mui-focused": {
                      color: "#84cc16",
                    },
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#84cc16",
                      },
                    },
                  }}
                />

                <TextField
                  label="Reward Features (One per line)"
                  fullWidth
                  multiline
                  type="text"
                  rows={5}
                  value={values.features}
                  onChange={(e) =>
                    setFieldValue(
                      "features",
                      e.target.value ? e.target.value.split("\n") : []
                    )
                  }
                  onBlur={handleBlur}
                  name="features"
                  error={errors.features}
                  helperText={errors.features}
                  sx={{
                    "& label.Mui-focused": {
                      color: "#84cc16",
                    },
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#84cc16",
                      },
                    },
                  }}
                />
              </Box>

              <Box className="flex flex-col my-10 gap-6">
                <Box className="flex justify-end gap-3 items-center">
                  <Button
                    onClick={props.onClose}
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      backgroundColor: "#B0B0B0",
                      color: "white",
                      padding: "12px",
                      width: "100px",
                      borderRadius: "10px",
                      "&:hover": {
                        backgroundColor: "#8C8C8C",
                      },
                    }}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      backgroundColor: "#84cc16",
                      color: "white",
                      padding: "12px",
                      width: "100px",
                      borderRadius: "10px",
                      "&:hover": {
                        backgroundColor: "#6aa40f",
                      },
                    }}
                  >
                    Save
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default RewardsActionModal;
