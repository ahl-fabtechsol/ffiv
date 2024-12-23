import { Box } from "@mui/material";
import { motion } from "framer-motion";

export const ProjectTimeline = ({ timeline }) => {
  return (
    <Box className="px-4 py-16 lg:py-24">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl sm:text-4xl font-bold text-center mb-16 lg:mb-24"
      >
        Project Timeline
      </motion.h2>

      <Box className="relative max-w-6xl mx-auto">
        <Box className="absolute left-4 lg:left-1/2 transform lg:-translate-x-1/2 top-0 w-1 bg-gray-300 h-full rounded-lg"></Box>

        {timeline.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.3 }}
            className={`relative flex flex-col lg:flex-row items-start ${
              index % 2 === 0 ? "lg:items-end" : "lg:items-start"
            } mb-12 lg:mb-16`}
          >
            <Box className="w-12 h-12 flex items-center justify-center rounded-full border-4 border-gray-400 bg-white relative z-10">
              {item.completed ? (
                <span className="block w-6 h-6 bg-green-500 rounded-full"></span>
              ) : (
                <span className="block w-6 h-6 bg-gray-300 rounded-full"></span>
              )}
            </Box>

            <Box
              className={`mt-6 lg:mt-0 lg:max-w-lg ${
                index % 2 === 0 ? "lg:ml-12" : "lg:mr-12"
              } w-full`}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white shadow-lg hover:shadow-2xl rounded-xl p-6 lg:p-8 transition-all"
              >
                <p className="text-xl sm:text-2xl font-semibold text-gray-800">
                  {item.phase}
                </p>
                <p className="text-sm sm:text-md mt-3 text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};
