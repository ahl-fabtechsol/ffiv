import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { IconButton, TextField } from "@mui/material";
import { MdCancel, MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

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
  const { faqs, setFaqs } = props;

  const handleAddFAQ = () => {
    setFaqs([...faqs, { id: Date.now(), question: "", answer: "" }]);
  };

  const handleRemoveFAQ = (id) => {
    setFaqs(faqs.filter((faq) => faq.id !== id));
  };

  const handleChangeFAQ = (id, field, value) => {
    setFaqs(
      faqs.map((faq) => (faq.id === id ? { ...faq, [field]: value } : faq))
    );
  };
  const handleSave = () => {
    props.onSave();
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
          <p className="text-xl font-bold">Add Faqs</p>

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

        {faqs.map((faq, index) => (
          <Box
            key={faq.id}
            className="flex flex-col gap-6 p-6 border rounded-xl bg-white shadow-md my-3"
          >
            <TextField
              fullWidth
              label="Question"
              variant="outlined"
              value={faq.question}
              onChange={(e) =>
                handleChangeFAQ(faq.id, "question", e.target.value)
              }
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
              value={faq.answer}
              onChange={(e) =>
                handleChangeFAQ(faq.id, "answer", e.target.value)
              }
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

            <Box className="flex justify-end">
              <IconButton color="error" onClick={() => handleRemoveFAQ(faq.id)}>
                <MdDelete />
              </IconButton>
            </Box>
          </Box>
        ))}

        <Button
          startIcon={<IoMdAdd />}
          onClick={handleAddFAQ}
          variant="contained"
          sx={{
            textTransform: "none",
            backgroundColor: "#84cc16",
            color: "white",
            padding: "12px",
            width: "100%",
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: "#6aa40f",
            },
          }}
        >
          Add New FAQ
        </Button>
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
              onClick={handleSave}
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
      </Box>
    </Modal>
  );
};

export default FaqsActionModal;
