import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";

import { TextInput } from "../../components/TextInput";
import { showAlert } from "../../redux/slices/alertSlice";
import { ROUTE_NAMES } from "../../navigation/Routes";
import { addUser } from "../../redux/slices/userSlice";
import { signUpNewUser } from "../../services/authService";

export const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const onPressSignUp = async () => {
    try {
      const response = await signUpNewUser({
        firstName,
        lastName,
        emailId,
        password,
      });
      dispatch(addUser(response?.data));
      navigate(ROUTE_NAMES.HOME);
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
    <div className="flex justify-center mt-24">
      <div className="card bg-neutral text-neutral-content w-96">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Sign Up</h2>
          <div className="w-full mt-4">
            <TextInput
              label="First Name"
              placeHolder="First Name"
              value={firstName}
              onChangevalue={setFirstName}
            />
            <TextInput
              label="Last Name"
              placeHolder="Last Name"
              value={lastName}
              onChangevalue={setLastName}
            />
            <TextInput
              label="Email Id"
              placeHolder="Email Id"
              value={emailId}
              onChangevalue={setEmailId}
            />
            <TextInput
              label="Password"
              placeHolder="Password"
              type="password"
              value={password}
              onChangevalue={setPassword}
            />
          </div>
          <div className="w-full mt-4">
            <button
              className="btn btn-outline btn-primary btn-wide"
              onClick={onPressSignUp}
            >
              Signup ❤️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
