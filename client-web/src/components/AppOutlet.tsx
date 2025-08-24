import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import NavBar from "./NavBar";
import Footer from "./Footer";
import { ROUTE_NAMES } from "../navigation/Routes";
import { getUserProfile } from "../services/profileService";
import { addUser } from "../redux/slices/userSlice";
import type { IUser } from "../models/userModel";
import type { RootState } from "../redux/store";

const AppOutlet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user: IUser = useSelector((state: RootState) => state.user.data);

  /**
   * Handling page reload or intial page load scenario
   *
   * Solution:
   * Check the token is valid or not by calling the Profile API
   *
   * 1. If token is valid (ie. received the profile data) then redirect the user to the home page.
   * 2. If token is invalid / token is not present then redirect the user to the login page.
   */
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user._id) {
        try {
          const response = await getUserProfile();
          dispatch(addUser(response?.data));
          navigate(ROUTE_NAMES.HOME);
        } catch (error) {
          if (error?.status === 401) {
            navigate(ROUTE_NAMES.LOGIN);
          }
        }
      }
    };

    fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
      {location.pathname === ROUTE_NAMES.LOGIN && <Footer />}
    </div>
  );
};

export default AppOutlet;
