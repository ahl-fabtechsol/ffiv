// import { Box } from "@mui/material";
// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import { Loader } from "../components/customLoader/Loader";
// import toast from "react-hot-toast";
// import apiClient from "../api/apiClient";

// const Payment = () => {
//   const [selectedReward, setSelectedReward] = useState(null);
//   const [message, setMessage] = useState("");
//   const location = useLocation();
//   const rewards = location?.state?.rewards;
//   const campaignId = location?.state?.campaignId;
//   const [loading, setLoading] = useState(false);

//   const handleRewardSelect = (reward) => {
//     setSelectedReward(reward);
//   };

//   const handleSubmit = async () => {
//     if (!selectedReward) {
//       toast.error("Please select a reward to continue.");
//       return;
//     }
//     if (!message) {
//       toast.error("Please leave a message to continue.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await apiClient.post("backer/checkout-session", {
//         campaignId,
//         moneyPledged: selectedReward.price,
//         message,
//       });
//       if (!response.ok) {
//         setLoading(false);
//         toast.error(
//           response?.data?.message || "An error occurred. Please try again."
//         );
//         return;
//       }
//       setLoading(false);
//       const url = response?.data?.url;
//       window.location.href = url;
//     } catch (error) {
//       setLoading(false);
//       toast.error("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <Box className="max-w-6xl mx-auto px-6 py-10 space-y-8">
//       <Loader loading={loading} />
//       <p className="text-4xl font-bold text-gray-800 text-center">
//         Support Our Campaign
//       </p>
//       <p className="text-lg text-gray-600 text-center">
//         Choose a reward and leave us a message to show your support.
//       </p>

//       <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {rewards?.map((reward, index) => (
//           <div
//             key={index}
//             className={`p-6 bg-white rounded-lg shadow-lg transform transition-all duration-300 cursor-pointer ${
//               selectedReward?.title === reward.title
//                 ? "ring-4 ring-primary scale-105"
//                 : "hover:shadow-xl hover:scale-105"
//             }`}
//             onClick={() => handleRewardSelect(reward)}
//           >
//             <h3 className="text-2xl font-semibold text-gray-800 mb-3">
//               {reward?.title}
//             </h3>
//             <p className="text-4xl font-bold text-primary mb-4">
//               ${reward?.price}
//             </p>
//             <ul className="space-y-2">
//               {reward?.features.map((feature, i) => (
//                 <li key={i} className="flex items-center text-gray-600">
//                   <svg
//                     className="w-5 h-5 text-primary mr-2"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M5 13l4 4L19 7"
//                     />
//                   </svg>
//                   {feature}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </Box>

//       {selectedReward && (
//         <Box className="p-6 bg-gray-50 rounded-lg shadow-md">
//           <h2 className="text-2xl font-bold text-gray-800">
//             Selected Reward: {selectedReward.title}
//           </h2>
//           <p className="text-lg text-gray-600 mb-4">
//             Contribution Amount: ${selectedReward.price}
//           </p>
//           <textarea
//             required
//             className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
//             rows="5"
//             placeholder="Leave a message for the campaign..."
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           ></textarea>
//           <button
//             className="mt-4 w-full bg-fdPrimary text-white font-bold py-3 rounded-lg transition-all duration-300"
//             onClick={handleSubmit}
//           >
//             Submit Your Support
//           </button>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default Payment;

import { Box } from "@mui/material";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Loader } from "../components/customLoader/Loader";
import toast from "react-hot-toast";
import apiClient from "../api/apiClient";

const Payment = () => {
  const [selectedReward, setSelectedReward] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();
  const rewards = location?.state?.rewards;
  const campaignId = location?.state?.campaignId;
  const [loading, setLoading] = useState(false);

  const handleRewardSelect = (reward) => {
    setSelectedReward(reward);
    setCustomAmount(""); // Reset custom amount when a predefined reward is selected
  };

  const handleSubmit = async () => {
    const amount = selectedReward
      ? selectedReward.price
      : parseFloat(customAmount);

    if (!selectedReward && (!customAmount || amount <= 0)) {
      toast.error("Please select a reward or enter a valid custom amount.");
      return;
    }
    if (!message) {
      toast.error("Please leave a message to continue.");
      return;
    }
    setLoading(true);
    try {
      const response = await apiClient.post("backer/checkout-session", {
        campaignId,
        moneyPledged: amount,
        message,
      });
      if (!response.ok) {
        setLoading(false);
        toast.error(
          response?.data?.message || "An error occurred. Please try again."
        );
        return;
      }
      setLoading(false);
      const url = response?.data?.url;
      window.location.href = url;
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <Box className="max-w-6xl mx-auto px-6 py-10 space-y-8">
      <Loader loading={loading} />
      <p className="text-4xl font-bold text-gray-800 text-center">
        Support Our Campaign
      </p>
      <p className="text-lg text-gray-600 text-center">
        Choose a reward or enter a custom amount to show your support.
      </p>

      <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {rewards?.map((reward, index) => (
          <div
            key={index}
            className={`p-6 bg-white rounded-lg shadow-lg transform transition-all duration-300 cursor-pointer ${
              selectedReward?.title === reward.title
                ? "ring-4 ring-primary scale-105"
                : "hover:shadow-xl hover:scale-105"
            }`}
            onClick={() => handleRewardSelect(reward)}
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              {reward?.title}
            </h3>
            <p className="text-4xl font-bold text-primary mb-4">
              ${reward?.price}
            </p>

            <ul className="space-y-2">
              {reward?.features.map((feature, i) => {
                if (
                  i === 0 &&
                  typeof feature === "string" &&
                  feature.includes(",")
                ) {
                  return feature.split(",").map((item, subIndex) => (
                    <li
                      key={`${i}-${subIndex}`}
                      className="flex items-center text-gray-600"
                    >
                      <svg
                        className="w-5 h-5 text-primary mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {item.trim()}
                    </li>
                  ));
                }

                return (
                  <li key={i} className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 text-primary mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </Box>

      <Box className="p-6 bg-gray-50 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Or Enter a Custom Amount:
        </h2>
        <input
          type="number"
          placeholder="Enter a custom amount"
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
          value={customAmount}
          onChange={(e) => {
            setCustomAmount(e.target.value);
            setSelectedReward(null);
          }}
        />
      </Box>

      {(selectedReward || customAmount) && (
        <Box className="p-6 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">
            Contribution Amount: $
            {selectedReward ? selectedReward.price : customAmount}
          </h2>
          <textarea
            required
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
            rows="5"
            placeholder="Leave a message for the campaign..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button
            className="mt-4 w-full bg-fdPrimary text-white font-bold py-3 rounded-lg transition-all duration-300"
            onClick={handleSubmit}
          >
            Submit Your Support
          </button>
        </Box>
      )}
    </Box>
  );
};

export default Payment;
