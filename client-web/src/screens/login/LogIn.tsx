import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { authenticateUser } from "../../services/authService";
import { addUser } from "../../redux/slices/userSlice";
import { ROUTE_NAMES } from "../../navigation/Routes";

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const onPressLogin = async () => {
    try {
      const response = await authenticateUser(emailId, password);
      dispatch(addUser(response?.data));
      navigate(ROUTE_NAMES.HOME);
    } catch (error) {
      console.log("rkkk error", error);
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
          </div>
          <div className="w-full mt-4">
            <button
              className="btn btn-outline btn-primary btn-wide"
              onClick={onPressLogin}
            >
              Login ❤️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
