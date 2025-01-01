import React from "react";
import { FaStar, FaCheckCircle, FaArrowRight } from "react-icons/fa";
import ImageSlider from "../../components/ImageSlider";
import { Box } from "@mui/material";

const Campaign = () => {
  return (
    <Box className="min-h-screen bg-gray-100">
      <ImageSlider />
      <Box component={"section"} className="py-20 bg-gray-50">
        <Box className="container mx-auto px-6 md:px-12 lg:px-20">
          <h2 className="text-4xl font-extrabold text-center mb-16 text-gray-800">
            Our Success Stories
          </h2>
          <Box className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[1, 2, 3].map((story) => (
              <Box
                key={story}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={`/demoCard8.svg`}
                  alt={`Success Story ${story}`}
                  className="w-full h-56 object-cover"
                />
                <Box className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    Empowering Dreams {story}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    This is a story of how a simple idea turned into a
                    groundbreaking project with the help of our incredible
                    community. Together, we achieve the impossible.
                  </p>
                  <button className="bg_primary text-white py-2 px-6 rounded-full hover:bg-opacity-90 transition duration-300">
                    Read More
                  </button>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box component={"section"} className="bg-gray-200 py-16">
        <Box className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Us
          </h2>
          <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              "Global Reach",
              "Expert Support",
              "Flexible Funding",
              "Low Fees",
              "Marketing Tools",
              "Secure Platform",
            ].map((benefit, index) => (
              <Box key={index} className="flex items-center">
                <FaCheckCircle className="text_primary mr-2" />
                <span className="text-lg font-semibold">{benefit}</span>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box component={"section"} className="py-20 bg-gray-100">
        <Box className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-12">
            Flexible Pricing Plans
          </h2>
          <p className="text-lg text-gray-600 mb-16 max-w-2xl mx-auto">
            Choose a plan that fits your campaign needs. Scale your project with
            ease as you grow.
          </p>
          <Box className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                name: "Starter",
                price: 29,
                features: [
                  "Up to 5 Campaigns",
                  "Basic Analytics",
                  "Community Support",
                ],
              },
              {
                name: "Growth",
                price: 79,
                features: [
                  "Up to 15 Campaigns",
                  "Advanced Analytics",
                  "Priority Support",
                  "Custom Branding",
                ],
              },
              {
                name: "Enterprise",
                price: 149,
                features: [
                  "Unlimited Campaigns",
                  "Dedicated Account Manager",
                  "API Access",
                  "Advanced Customization",
                  "24/7 Support",
                ],
              },
            ].map((plan, index) => (
              <Box
                key={index}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl p-8 transform hover:-translate-y-2 transition-all duration-300"
              >
                <h3 className="text-3xl font-semibold text-gray-800 mb-4">
                  {plan.name}
                </h3>
                <p className="text-5xl font-bold text_primary mb-6">
                  ${plan.price}
                  <span className="text-lg text-gray-500"> /mo</span>
                </p>
                <ul className="text-left space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg
                        className="w-6 h-6 text_primary mr-2"
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
                  ))}
                </ul>
                <button className="w-full bg_primary hover:bg_primary text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out">
                  Get Started
                </button>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box component={"section"} className="bg-gray-100 py-20">
        <Box className="container mx-auto px-6 lg:px-20">
          <h2 className="text-4xl font-extrabold text-center mb-16 text-gray-800">
            Hear From Our Community
          </h2>
          <Box className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                name: "Alice Johnson",
                title: "Startup Founder",
                testimonial:
                  "This platform helped me raise funds seamlessly. The process was smooth, and the support from the team was phenomenal!",
                image: "https://randomuser.me/api/portraits/women/44.jpg",
              },
              {
                name: "Michael Lee",
                title: "Tech Entrepreneur",
                testimonial:
                  "Crowdfunding here enabled us to bring our idea to life. The tools provided are intuitive and user-friendly.",
                image: "https://randomuser.me/api/portraits/men/40.jpg",
              },
              {
                name: "Sophia Martinez",
                title: "Creative Designer",
                testimonial:
                  "I couldn't have launched my project without this amazing platform. It gave my vision the exposure it needed.",
                image: "https://randomuser.me/api/portraits/women/68.jpg",
              },
            ].map((item, index) => (
              <Box
                key={index}
                className="bg-white rounded-lg shadow-lg p-8 hover:shadow-2xl transition-transform transform hover:-translate-y-2"
              >
                <Box className="flex items-center mb-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-full object-cover mr-6"
                  />
                  <Box>
                    <h3 className="text-lg font-bold">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.title}</p>
                    <Box className="flex mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar key={star} className="text-yellow-400" />
                      ))}
                    </Box>
                  </Box>
                </Box>
                <p className="text-gray-600 leading-relaxed">
                  "{item.testimonial}"
                </p>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box
        component={"section"}
        className="bg-[#1D3557] text-white py-24 relative"
      >
        <Box className="container mx-auto text-center px-6">
          <h2 className="text-5xl font-extrabold leading-tight mb-6">
            Ready to Launch Your Campaign?
          </h2>
          <p className="text-lg md:text-2xl mb-10 max-w-2xl mx-auto text-gray-200">
            Join thousands of creators and turn your ideas into reality. Start
            your journey today!
          </p>
          <button className="bg_primary text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 ease-in-out flex items-center justify-center mx-auto shadow-lg">
            Start Creating Now
            <FaArrowRight className="ml-3 text-xl" />
          </button>
        </Box>

        <Box className="absolute top-16 left-20 w-32 h-32 bg-[#E63946] rounded-full opacity-20 blur-3xl"></Box>
        <Box className="absolute bottom-16 right-24 w-48 h-48 bg-[#457B9D] rounded-full opacity-30 blur-3xl"></Box>
      </Box>
    </Box>
  );
};

export default Campaign;
