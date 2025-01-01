import React, { useState } from "react";
import Navbar from "./Navbar";
import SideNav from "./SideNav";
function Header(props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <div>
      <Navbar handleDrawerToggle={handleDrawerToggle} />
      <SideNav
        mobileOpen={mobileOpen}
        handleDrawerToggle={() => handleDrawerToggle()}
        type={props.type}
      />
    </div>
  );
}

export default Header;
