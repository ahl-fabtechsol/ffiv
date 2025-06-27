import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiGift } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import { IoShareOutline } from "react-icons/io5";
import { Avatar, LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useOutsideClick } from "../hooks/useOutsideClick";

export function ExpandableCardGrid({ cards }) {
  const [active, setActive] = useState(null);
  const id = useId();
  const ref = useRef(null);
  const navigate = useNavigate();

  const getPercentage = (funded, funding) => {
    const value = (funded / funding) * 100;
    return parseFloat(value).toFixed(2);
  };

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.name}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.name}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.name}-${id}`}>
                <img
                  priority
                  width={200}
                  height={200}
                  src={active?.campaignDocument?.image}
                  alt={active.name}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.name}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.detail}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-base"
                    >
                      {active.detail}
                    </motion.p>
                  </div>

                  <button
                    onClick={() =>
                      navigate(`/explore/${active._id}`, {
                        state: { active },
                      })
                    }
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                  >
                    Visit
                  </button>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    <motion.p layoutId={`content-${active.content}-${id}`}>
                      {active.content}
                    </motion.p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-7xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start gap-4">
        {cards?.map((card, index) => (
          <motion.div
            layoutId={`card-${card?.name}-${id}`}
            key={index}
            className="p-4 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col w-full shadow-md rounded-lg">
              <motion.div
                layoutId={`image-${card?.name}-${id}`}
                onClick={() => setActive(card)}
              >
                <img
                  width={100}
                  height={100}
                  src={card?.campaignDocument?.image}
                  alt={card?.name}
                  className="h-60 w-full rounded-lg object-cover object-center"
                />
              </motion.div>
              <div className="p-3 flex flex-col gap-2">
                <div className="flex flex-row justify-between items-center">
                  <div className="flex items-center gap-2 ">
                    <Avatar className="flex items-center justify-center">
                      <img
                        src={card?.createdBy?.profilePicture}
                        alt="User Avatar"
                        className="w-10 h-10 object-cover rounded-full"
                      />
                    </Avatar>
                    <motion.p
                      layoutId={`description-${card?.shortSummary}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-base"
                    >
                      {card?.createdBy?.firsName}
                    </motion.p>
                  </div>
                  {/* <div className="flex gap-2 items-center">
                    <CiHeart size={25} />
                    <IoShareOutline size={25} />
                  </div> */}
                </div>

                <motion.p className="font-bold text-xl text-ellipsis">
                  {card?.name}
                </motion.p>
                <motion.p className="text-fdTextGray text-sm text-ellipsis">
                  {card?.shortSummary}
                </motion.p>
                <LinearProgress
                  variant="determinate"
                  value={getPercentage(card?.funded, card?.funding)}
                />
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row items-center gap-2">
                    <FiGift />
                    <motion.p className="text-fdTextGray">
                      ETH {card?.funded}
                    </motion.p>
                  </div>
                  <motion.p className="text-fdTextGray">
                    {getPercentage(card?.funded, card?.funding)}%
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
