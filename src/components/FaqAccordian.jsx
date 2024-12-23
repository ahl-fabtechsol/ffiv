import { Box } from "@mui/material";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export const FaqAccordion = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Box className="max-w-3xl mx-auto ">
      <h2 className="text-3xl font-bold text-center mb-12">
        Frequently Asked Questions
      </h2>
      <Box className="space-y-6">
        {faqs.map((faq, index) => (
          <Box
            key={index}
            className="border border-gray-200 rounded-lg shadow-sm"
          >
            <button
              className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-lg font-medium">{faq.question}</span>
              {openIndex === index ? (
                <FaChevronUp className="text-lg text-gray-500" />
              ) : (
                <FaChevronDown className="text-lg text-gray-500" />
              )}
            </button>
            <Box
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-40 p-6" : "max-h-0"
              }`}
            >
              <p className="text-gray-600">{faq.answer}</p>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
