import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../redux/store";
import { clearErrorAlert } from "../redux/slices/errorSlice";

export const ErrorAlert = () => {
  const dispacth = useDispatch();
  const { errorMessage, showErrorAlert, errorTimeout } = useSelector(
    (state: RootState) => state.errorAlert
  );

  useEffect(() => {
    const dismissAlert = () => {
      setTimeout(() => {
        dispacth(clearErrorAlert());
      }, errorTimeout);
    };

    if (showErrorAlert) {
      dismissAlert();
    }
  }, [dispacth, errorTimeout, showErrorAlert]);

  if (!showErrorAlert) {
    return null;
  }

  return (
    <div className="flex right-10 bottom-20 fixed">
      <div role="alert" className="alert alert-error w-96">
        <span>{errorMessage}</span>
      </div>
    </div>
  );
};
