import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState, useEffect, useCallback } from "react";

const AnimatedTestimonials = ({ backers, autoplay }) => {
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % backers?.length);
  }, [backers?.length]);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + backers?.length) % backers?.length);
  }, [backers?.length]);

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, handleNext]);

  return (
    <div className="max-w-full md:max-w-6xl mx-auto px-6 md:px-12 py-16 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="relative w-full h-64 md:h-96 lg:h-[500px] rounded-3xl overflow-hidden">
          {backers?.map((backer, index) => (
            <div
              key={backer?._id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                active === index ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <img
                src={backer?.createdBy?.profilePicture}
                alt={backer?.fullName}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <div
            key={active}
            className="transition-opacity duration-500 max-w-lg"
          >
            <h3 className="text-3xl font-extrabold">
              {backers[active]?.fullName}
            </h3>
            <p className="text-lg text-gray-400 mt-1">
              {backers[active]?.createdBy?.email}
            </p>
            <p className="text-lg text-gray-600 mt-6 leading-relaxed">
              {backers[active]?.comment}
            </p>
            <p className="text-lg text-gray-600 mt-6 leading-relaxed">
              Money Pledged :{" "}
              <span className="font-bold">
                ETH{backers[active]?.moneyPledged}{" "}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2 mt-6">
            {backers?.map((_, index) => (
              <span
                key={index}
                className={`h-3 w-3 rounded-full ${
                  active === index ? "bg-fdPrimary" : "bg-gray-300"
                } transition-all`}
              />
            ))}
          </div>

          <div className="flex gap-6 pt-10">
            <button
              onClick={handlePrev}
              className="h-12 w-12 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition"
              aria-label="Previous Testimonial"
            >
              <FaArrowLeft className="h-6 w-6 text-black" />
            </button>
            <button
              onClick={handleNext}
              className="h-12 w-12 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition"
              aria-label="Next Testimonial"
            >
              <FaArrowRight className="h-6 w-6 text-black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedTestimonials;
