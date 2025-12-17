import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import type { RootState } from "../redux/store";
import { removeUser } from "../redux/slices/userSlice";
import { logoutUser } from "../services/authService";
import type { IUser } from "../models/userModel";
import { ROUTE_NAMES } from "../navigation/Routes";
import { showAlert } from "../redux/slices/alertSlice";
import { AlertType } from "../enums/AlertEnum";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user as IUser | null);
  const hasUserLoggedIn = !!user?._id;
  const isPremiumUser = user?.isPremium ?? false;

  const onPressLogout = async () => {
    await logoutUser();
    dispatch(removeUser());
    navigate(ROUTE_NAMES.LOGIN);
    dispatch(
      showAlert({
        showAlert: true,
        message: "You have logged out successfully!",
        type: AlertType.Success,
      })
    );
  };

  const dissmissDropDownMenu = () => {
    (document.activeElement as HTMLElement)?.blur();
  };

  return (
    <div className="navbar bg-base-200 shadow-sm sticky top-0 z-50">
      <div className="flex-1">
        <Link
          to={hasUserLoggedIn ? ROUTE_NAMES.HOME : "#"}
          className="btn btn-ghost text-xl"
        >
          🧑‍💻 DevTinder 💕
        </Link>
        {hasUserLoggedIn && (
          <div
            className={`badge ${
              isPremiumUser ? "badge-primary" : "badge-warning"
            }`}
          >
            {isPremiumUser ? "Premium" : "Free"}
          </div>
        )}
      </div>
      {hasUserLoggedIn && (
        <div className="flex justify-center items-center">
          <p className="mr-4">Welcome, {user?.firstName}</p>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar mr-6"
            >
              <div className="w-10 rounded-full">
                <img alt="User Photo" src={user?.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={ROUTE_NAMES.PROFILE} onClick={dissmissDropDownMenu}>
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTE_NAMES.CONNECTIONS}
                  onClick={dissmissDropDownMenu}
                >
                  My Connections
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTE_NAMES.CONNECTION_REQUEST}
                  onClick={dissmissDropDownMenu}
                >
                  Connection Requests
                </Link>
              </li>
              <li>
                <Link to={ROUTE_NAMES.PREMIUM} onClick={dissmissDropDownMenu}>
                  Premium
                </Link>
              </li>
              <li onClick={onPressLogout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
