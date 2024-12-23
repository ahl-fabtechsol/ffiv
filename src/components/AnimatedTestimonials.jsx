import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState, useEffect } from "react";

const AnimatedTestimonials = ({ testimonials, autoplay = false }) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  return (
    <div className="max-w-full md:max-w-6xl mx-auto px-6 md:px-12 py-16 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image Section */}
        <div className="relative w-full h-64 md:h-96 lg:h-[500px] rounded-3xl overflow-hidden">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.src}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                active === index ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <img
                src={testimonial.src}
                alt={testimonial.name}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Testimonial Text Section */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <div
            key={active}
            className="transition-opacity duration-500 max-w-lg"
          >
            <h3 className="text-3xl font-extrabold">
              {testimonials[active].name}
            </h3>
            <p className="text-lg text-gray-400 mt-1">
              {testimonials[active].designation}
            </p>
            <p className="text-lg text-gray-600 mt-6 leading-relaxed">
              {testimonials[active].quote}
            </p>
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
