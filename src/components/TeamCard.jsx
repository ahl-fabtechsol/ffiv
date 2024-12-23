import { Box } from "@mui/material";

const TeamCard = ({ member }) => {
  return (
    <Box className="max-w-xs w-full group/card">
      <Box
        className="cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4 bg-cover"
        style={{ backgroundImage: `url(${member.image})` }}
      >
        <Box className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></Box>
        <Box className="flex flex-row items-center space-x-4 z-10">
          <img
            height="100"
            width="100"
            alt={member.name}
            src={member.image}
            className="h-16 w-16 rounded-full border-2 object-cover"
          />
          <Box className="flex flex-col">
            <p className="font-normal text-base text-gray-50 relative z-10">
              {member.name}
            </p>
          </Box>
        </Box>
        <Box className="text content">
          <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10">
            {member.role}
          </h1>
        </Box>
      </Box>
    </Box>
  );
};

export default TeamCard;
