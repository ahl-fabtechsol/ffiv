const listItemStyle = {
  color: "inherit",
  "&.active": {
    backgroundColor: "#84cc16",
    color: "white",
    "& .myIconClass, & .MuiTypography-root": {
      color: "white",
    },
  },
  "&.active:hover": {
    backgroundColor: "#84cc16",
    color: "white",
    "& .myIconClass, & .MuiTypography-root": {
      color: "white",
    },
  },
};
const buttonStyle = {
  "&:hover": {
    color: "black",
    "& .myIconClass & .MuiTypography-root": {
      color: "white",
    },
  },
};

export { listItemStyle, buttonStyle };
