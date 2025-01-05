import {
  Avatar,
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MdDelete } from "react-icons/md";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import VideoUpload from "../../../components/VideoUpload";
import ImageUpload from "../../../components/ImageUpload";
import RewardSection from "../../../components/RewardSection";
import BasicModal from "../../../modals/BasicModal";
import BasicInfoSection from "./BasicInfoSection";
import UploadDocumentsSections from "./UploadDocumentsSections";
import TeamMembersSection from "./TeamMembersSection";
import BackersSection from "./BackersSection";

const CreateCampaign = () => {
  const [openModal, setOpenModal] = useState(false);

  const [backers, setBackers] = useState([
    {
      id: Date.now(),
      name: "",
      designation: "",
      comment: "",
      picture: null,
    },
  ]);

  const [faqs, setFaqs] = useState([
    { id: Date.now(), question: "", answer: "" },
  ]);

  const [phases, setPhases] = useState([
    { id: Date.now(), phaseName: "", completionDetails: "" },
  ]);

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

  const handleAddBacker = () => {
    const newBacker = {
      id: Date.now(),
      name: "",
      designation: "",
      comment: "",
      picture: null,
    };
    setBackers([...backers, newBacker]);
  };

  const handleRemoveBacker = (id) => {
    setBackers(backers.filter((backer) => backer.id !== id));
  };

  const handleChangeBacker = (id, field, value) => {
    setBackers(
      backers.map((backer) =>
        backer.id === id ? { ...backer, [field]: value } : backer
      )
    );
  };

  const handlePictureChangeBacker = (id, event) => {
    const file = event.target.files[0];
    setBackers(
      backers.map((backer) =>
        backer.id === id ? { ...backer, picture: file } : backer
      )
    );
  };

  const handleRemovePictureBacker = (id) => {
    setBackers(
      backers.map((backer) =>
        backer.id === id ? { ...backer, picture: null } : backer
      )
    );
  };

  return (
    <Box className="p-8 flex flex-col gap-8">
      {openModal && (
        <BasicModal open={openModal} onClose={() => setOpenModal(false)} />
      )}

      <Box className="flex flex-col gap-3">
        <p className="text-3xl font-bold">Create a Campaign</p>
        <p className="font-extralight text-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi
          voluptate, soluta ipsam tempora perspiciatis voluptates consectetur?
          Quidem, assumenda fuga. Quis placeat quae ad laudantium necessitatibus
          hic, nostrum explicabo dolorum quos. Dolorem quo dignissimos
          consequuntur perferendis, ut, nulla nam praesentium cupiditate omnis
          numquam, aliquid rem. Officiis nobis illo pariatur tenetur qui?
        </p>
      </Box>
      <BasicInfoSection />

      <UploadDocumentsSections />
      <TeamMembersSection />
      <BackersSection />
      <Box className="  flex flex-col gap-6 bg-white rounded-lg border p-4">
        <p className="text-xl font-bold">Add Faqs </p>
        <p className="font-extralight text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
          asperiores iste laboriosam commodi labore quibusdam unde nesciunt
          nobis quas cumque consectetur pariatur, odit reiciendis vitae.
        </p>
        <Button
          onClick={() => setOpenModal(true)}
          variant="contained"
          startIcon={<IoMdAdd />}
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
          Add Faqs
        </Button>
      </Box>
      <Box className="  flex flex-col gap-6 bg-white rounded-lg border p-4">
        <p className="text-xl font-bold">What is Your Project TimeLine</p>
        <p className="font-extralight text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
          asperiores iste laboriosam commodi labore quibusdam unde nesciunt
          nobis quas cumque consectetur pariatur, odit reiciendis vitae.
        </p>
        <Button
          onClick={() => setOpenModal(true)}
          variant="contained"
          startIcon={<IoMdAdd />}
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
          Add Project TimeLine
        </Button>
      </Box>
      <RewardSection />

      <Box className="flex flex-col mt-10 gap-6">
        <Box className="flex flex-col gap-3">
          <p className="text-3xl font-bold">What are your backers saying</p>
          <p className="text-sm font-extralight">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit ipsam
            molestiae aut at? Veniam neque voluptatem quos voluptate aspernatur
            temporibus explicabo corporis? Facilis laborum nostrum, neque a
            optio ad ratione?.
          </p>
        </Box>
        {backers.map((backer, index) => (
          <Box
            key={backer.id}
            className="flex flex-col gap-6 p-6 border rounded-xl bg-white "
          >
            <Box className="flex xs:flex-row flex-col items-center gap-6">
              <Avatar
                src={backer.picture ? URL.createObjectURL(backer.picture) : ""}
                sx={{ width: 100, height: 100, border: "3px solid #84cc16" }}
              />
              <Box className="flex flex-col gap-2">
                {backer.picture ? (
                  <Button
                    onClick={() => handleRemovePictureBacker(backer.id)}
                    startIcon={<MdDelete />}
                    variant="outlined"
                    color="error"
                    size="small"
                  >
                    Remove Image
                  </Button>
                ) : (
                  <Button
                    component="label"
                    startIcon={<IoCloudUploadOutline />}
                    variant="contained"
                    sx={{
                      backgroundColor: "#84cc16",
                      "&:hover": { backgroundColor: "#6aa40f" },
                    }}
                  >
                    Upload Image
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => handlePictureChangeBacker(backer.id, e)}
                    />
                  </Button>
                )}
                <Typography variant="caption" color="text.secondary">
                  Upload high-quality profile picture.
                </Typography>
              </Box>
            </Box>

            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={backer.name}
              onChange={(e) =>
                handleChangeBacker(backer.id, "name", e.target.value)
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
              label="Designation"
              variant="outlined"
              value={backer.designation}
              onChange={(e) =>
                handleChangeBacker(backer.id, "designation", e.target.value)
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
                onClick={() => handleRemoveBacker(backer.id)}
              >
                <MdDelete />
              </IconButton>
            </Box>
          </Box>
        ))}

        <Button
          onClick={handleAddBacker}
          variant="contained"
          startIcon={<IoMdAdd />}
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
          Add New Backer
        </Button>
      </Box>

      <Box className="flex flex-col mt-10 gap-6">
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
            className="flex flex-col gap-6 p-6 border rounded-xl bg-white shadow-md"
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
      </Box>

      <Box className="flex flex-col mt-10 gap-8">
        <Box className="flex flex-col gap-3">
          <p className="text-3xl font-bold">Project Timeline</p>
          <p className="text-sm font-extralight">
            Define the project phases and their estimated completion dates.
          </p>
        </Box>

        {phases.map((phase, index) => (
          <Box
            key={phase.id}
            className="flex flex-col gap-6 p-6 border rounded-xl bg-white shadow-md"
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
      </Box>
    </Box>
  );
};

export default CreateCampaign;
