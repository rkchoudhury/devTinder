import React from "react";
import { Outlet } from "react-router-dom";

import NavBar from "./NavBar";

const AppOutlet = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default AppOutlet;
