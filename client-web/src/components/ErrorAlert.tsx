import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../redux/store";
import { hideAlert } from "../redux/slices/alertSlice";

export const ErrorAlert = () => {
  const dispacth = useDispatch();
  const { message, showAlert, duration, type } = useSelector(
    (state: RootState) => state.alert
  );

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        dispacth(hideAlert());
      }, duration);
    }
  }, [dispacth, duration, showAlert]);

  if (!showAlert) {
    return null;
  }

  return (
    <div className="flex right-10 bottom-20 fixed">
      <div role="alert" className={`alert ${type}`}>
        <span>{message}</span>
      </div>
    </div>
  );
};
