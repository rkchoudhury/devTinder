import { useState } from "react";
import { authenticateUser } from "../../services/authService";

const LogIn = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const onPressLogin = async () => {
    try {
      const response = await authenticateUser(emailId, password);
      console.log("rkkk response", response);
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
              type="text"
              className="input"
              placeholder="Enter Your Email Id"
              onChange={(e) => setEmailId(e.currentTarget.value)}
            />
            <div className="mt-4">
              <input
                type="password"
                className="input"
                placeholder="Enter Your Password"
                onChange={(e) => setPassword(e.currentTarget.value)}
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
