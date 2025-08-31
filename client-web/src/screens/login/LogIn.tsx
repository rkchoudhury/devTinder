import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";

import { authenticateUser } from "../../services/authService";
import { addUser } from "../../redux/slices/userSlice";
import { ROUTE_NAMES } from "../../navigation/Routes";
import { showAlert } from "../../redux/slices/alertSlice";

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onPressLogin = async () => {
    try {
      const response = await authenticateUser(emailId, password);
      dispatch(addUser(response?.data));
      navigate(ROUTE_NAMES.HOME);
    } catch (error) {
      const axiosError = error as AxiosError;
      setError(axiosError?.message);
      dispatch(
        showAlert({
          showAlert: true,
          message: axiosError?.message,
        })
      );
    }
  };

  return (
    <div className="flex justify-center mt-40">
      <div className="card bg-neutral text-neutral-content w-96">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Log In</h2>
          <div className="w-full mt-4">
            <input
              value={emailId}
              type="text"
              className="input"
              placeholder="Enter Your Email Id"
              onChange={(e) => setEmailId(e.target.value)}
            />
            <div className="mt-4">
              <input
                value={password}
                type="password"
                className="input"
                placeholder="Enter Your Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p className="text-red-500 mt-2">{error}</p>
          </div>
          <div className="w-full mt-4">
            <button
              className="btn btn-outline btn-primary btn-wide"
              onClick={onPressLogin}
            >
              Login ❤️
            </button>
          </div>
          <label className="mt-2" onClick={() => navigate(ROUTE_NAMES.SIGNUP)}>
            New user <b className="underline hover:cursor-pointer">Sign up</b>{" "}
            here.
          </label>
          <label
            className="underline hover:cursor-pointer text-red-500 font-semibold"
            onClick={() => navigate(ROUTE_NAMES.FORGOT_PASSWORD)}
          >
            Forgot Password
          </label>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
