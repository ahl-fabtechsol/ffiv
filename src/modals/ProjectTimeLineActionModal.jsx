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

const ProjectTimeLineActionModal = (props) => {
  const { phases, setPhases } = props;
  const handleAddPhase = () => {
    setPhases([
      ...phases,
      { id: Date.now(), phaseName: "", completionDetails: "" },
    ]);
  };

  const handleRemovePhase = (id) => {
    setPhases(phases.filter((phase) => phase.id !== id));
  };

  const handleChangePhase = (id, field, value) => {
    setPhases(
      phases.map((phase) =>
        phase.id === id ? { ...phase, [field]: value } : phase
      )
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
          <p className="text-xl font-bold">Add Project Timeline</p>

          <IconButton onClick={props.onClose}>
            <MdCancel size={25} color="black" />
          </IconButton>
        </Box>
        <Box className="flex flex-col gap-3">
          <p className="text-3xl font-bold">Project Timeline</p>
          <p className="text-sm font-extralight">
            Define the project phases and their estimated completion dates.
          </p>
        </Box>

        {phases.map((phase, index) => (
          <Box
            key={phase.id}
            className="flex flex-col gap-6 p-6 border rounded-xl bg-white shadow-md my-3"
          >
            <TextField
              fullWidth
              label="Phase Name"
              variant="outlined"
              value={phase.phaseName}
              onChange={(e) =>
                handleChangePhase(phase.id, "phaseName", e.target.value)
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
              label="Completion Date and Details"
              variant="outlined"
              multiline
              rows={3}
              value={phase.completionDetails}
              onChange={(e) =>
                handleChangePhase(phase.id, "completionDetails", e.target.value)
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
              <IconButton
                color="error"
                onClick={() => handleRemovePhase(phase.id)}
              >
                <MdDelete />
              </IconButton>
            </Box>
          </Box>
        ))}

        <Button
          startIcon={<IoMdAdd />}
          onClick={handleAddPhase}
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
          Add New Phase
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

export default ProjectTimeLineActionModal;
