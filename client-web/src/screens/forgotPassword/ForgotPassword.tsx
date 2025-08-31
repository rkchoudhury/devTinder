import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";

import { TextInput } from "../../components/TextInput";
import { showAlert } from "../../redux/slices/alertSlice";
import { ROUTE_NAMES } from "../../navigation/Routes";
import { updateUserPassword } from "../../services/profileService";
import { AlertType } from "../../enums/alertEnum";

export const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const onPressChangePassword = async () => {
    try {
      const response = await updateUserPassword(emailId, password);
      dispatch(
        showAlert({
          showAlert: true,
          type: AlertType.Success,
          message: response?.message,
        })
      );
      navigate(ROUTE_NAMES.LOGIN);
    } catch (error) {
      const axiosError = error as AxiosError;
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
          <h2 className="card-title">Forgot Password</h2>
          <div className="w-full mt-4">
            <TextInput
              label="Email Id"
              placeHolder="Email Id"
              value={emailId}
              onChangevalue={setEmailId}
            />
            <TextInput
              label="New Password"
              placeHolder="New Password"
              type="password"
              value={password}
              onChangevalue={setPassword}
            />
          </div>
          <div className="w-full mt-4">
            <button
              className="btn btn-outline btn-primary btn-wide"
              onClick={onPressChangePassword}
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
