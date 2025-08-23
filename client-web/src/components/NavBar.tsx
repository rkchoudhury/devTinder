import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../redux/store";
import { removeUser } from "../redux/slices/userSlice";
import { logoutUser } from "../services/authService";
import type { IUser } from "../models/userModel";

const NavBar = () => {
  const dispatch = useDispatch();
  const user: IUser = useSelector((state: RootState) => state.user.data);
  const hasUserLoggedIn = !!user?._id;

  const onPressLogout = async () => {
    await logoutUser();
    dispatch(removeUser());
  };

  return (
    <div className="navbar bg-base-200 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">🧑‍💻 DevTinder 💕</a>
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
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
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
