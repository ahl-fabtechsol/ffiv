import { Box, LinearProgress, Button } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import { faqs, teamData, testimonials, timeline } from "../lib/dummyData";
import TeamCard from "../components/TeamCard";
import { AnimatedTestimonials } from "../components/AnimatedTestimonials";
import { FaqAccordion } from "../components/FaqAccordian";
import { ProjectTimeline } from "../components/ProjectTimeline";

export default function Page() {
  const { id } = useParams();
  const location = useLocation();
  const data = location.state.active;

  console.log(data);

  return (
    <Box>
      <Box className="relative min-h-screen w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/demoVideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Box className="relative z-10 min-h-screen flex flex-col md:gap-10 gap-6 items-center justify-center glass-blur p-20 text-center">
          <p className="md:text-7xl text-3xl font-bold text-white">
            {data.title || "Project Title"}
          </p>
          <p className="md:text-3xl text-lg text-white font-semibold">
            {data.description || "An innovative project changing the world."}
          </p>
          <Button
            className="bg_primary p-10 "
            sx={{
              textTransform: "none",
              color: "white",
              padding: "10px",
              width: "250px",
              borderRadius: "50px",
            }}
          >
            Back this Project
          </Button>
        </Box>
      </Box>
      <Box className="p-10">
        <Box className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <Box className="col-span-2">
            <p className="text-3xl font-bold">Project Details</p>
            <p className="text-md mt-4">
              {data.longDescription ||
                "This project aims to revolutionize the way crowdfunding platforms operate by..."}
            </p>
          </Box>
          <Box className="flex flex-col items-center">
            <p className="text-3xl font-bold">Funding Progress</p>
            <p className="text-md mt-4">
              ${data.raised || 0} / ${data.goal || 10000}
            </p>
            <LinearProgress
              variant="determinate"
              value={(data.raised / data.goal) * 100 || 0}
              className="w-full mt-4"
            />
            <p className="text-md mt-4">
              {((data.raised / data.goal) * 100 || 0).toFixed(2)}% funded
            </p>
          </Box>
        </Box>
      </Box>
      <Box className="p-10">
        <p className="text-3xl font-bold text-center mb-10">Meet the Team</p>
        <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 justify-center">
          {teamData?.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </Box>
      </Box>

      <Box className="p-10 ">
        <p className="text-3xl font-bold text-center ">
          What Backers Are Saying
        </p>
        <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
      </Box>

      <Box className="p-10 ">
        <FaqAccordion faqs={faqs} />
      </Box>

      <ProjectTimeline timeline={timeline} />

      <Box className="p-10 text-center">
        <p className="text-3xl mb-4 font-bold">Ready to make a difference?</p>
        <Button
          className="bg_primary p-10 "
          sx={{
            textTransform: "none",
            color: "white",
            padding: "10px",
            width: "250px",
            borderRadius: "50px",
          }}
        >
          Support Now
        </Button>
      </Box>
    </Box>
  );
}
