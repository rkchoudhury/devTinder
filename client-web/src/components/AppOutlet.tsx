import { Outlet, useLocation } from "react-router-dom";

import NavBar from "./NavBar";
import Footer from "./Footer";
import { ROUTE_NAMES } from "../navigation/Routes";

const AppOutlet = () => {
  const location = useLocation();

  return (
    <div>
      <NavBar />
      <Outlet />
      {location.pathname === ROUTE_NAMES.LOGIN && <Footer />}
    </div>
  );
};

export default AppOutlet;
