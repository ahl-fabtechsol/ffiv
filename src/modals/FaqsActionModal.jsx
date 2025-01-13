import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { IconButton, TextField } from "@mui/material";
import { MdCancel } from "react-icons/md";
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

const FaqsActionModal = (props) => {
  const { campaignId, type, data, setLoading } = props;
  const validationSchema = Yup.object().shape({
    question: Yup.string().required("Question is Required"),
    answer: Yup.string().required("Answer is Required"),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await apiClient.post("faq", {
        ...values,
        campaignId,
      });
      if (!response.ok) {
        setLoading(false);
        toast.error(response?.data?.message || "Something went wrong");
        return;
      }
      setLoading(false);
      toast.success("FAQ added successfully");
      props.onAction();
      props.onClose();
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  const handleEdit = async (values) => {
    setLoading(true);
    try {
      const response = await apiClient.patch(`faq/${data._id}`, values);
      if (!response.ok) {
        setLoading(false);
        toast.error(response?.data?.message || "Error while submitting");
        return;
      }
      setLoading(false);
      toast.success("FAQ updated successfully");
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
        <Box className="flex justify-between items-center">
          <p className="text-xl font-bold">
            {type === "edit" ? "Edit" : "Add"} Faqs
          </p>

          <IconButton onClick={props.onClose}>
            <MdCancel size={25} color="black" />
          </IconButton>
        </Box>
        <Box className="flex flex-col gap-3">
          <p className="text-3xl font-bold">FAQs</p>
          <p className="text-sm font-extralight">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit ipsam
            molestiae aut at? Veniam neque voluptatem quos voluptate aspernatur
            tempor
          </p>
        </Box>

        <Formik
          initialValues={{
            question: type === "edit" ? data?.question : "",
            answer: type === "edit" ? data?.answer : "",
          }}
          validationSchema={validationSchema}
          onSubmit={type === "edit" ? handleEdit : handleSubmit}
        >
          {({ values, errors, handleChange, handleBlur }) => (
            <Form>
              <Box className="flex flex-col gap-6 p-6 border rounded-xl bg-white shadow-md my-3">
                <TextField
                  fullWidth
                  label="Question"
                  variant="outlined"
                  value={values.question}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="question"
                  error={errors.question}
                  helperText={errors.question}
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
                  label="Answer"
                  multiline
                  rows={4}
                  variant="outlined"
                  value={values.answer}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="answer"
                  error={errors.answer}
                  helperText={errors.answer}
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

export default FaqsActionModal;
