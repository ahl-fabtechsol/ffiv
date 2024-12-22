import { useEffect, useState } from "react";

const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState("sm");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 520) {
        setBreakpoint("initial");
      } else if (window.innerWidth < 768) {
        setBreakpoint("xs");
      } else if (window.innerWidth < 1024) {
        setBreakpoint("sm");
      } else if (window.innerWidth < 1280) {
        setBreakpoint("md");
      } else {
        setBreakpoint("lg");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); 

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
};

export default useBreakpoint;
