import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { AlertType } from "../../enums/alertEnum";

interface IAlertState {
  type?: AlertType;
  message: string;
  showAlert: boolean;
  duration?: number;
}

const initialState: IAlertState = {
  type: AlertType.Error,
  message: "",
  showAlert: false,
  duration: 3000,
};

const alertSlice = createSlice({
  name: "alert",
  initialState: initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<IAlertState>) => {
      const newState = {
        ...state,
        ...action.payload,
      };
      return newState;
    },
    hideAlert: () => {
      return initialState;
    },
  },
});

const { showAlert, hideAlert } = alertSlice.actions;

export { showAlert, hideAlert };

export default alertSlice.reducer;
