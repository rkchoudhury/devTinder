import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IErrorState {
  errorMessage: string;
  showErrorAlert: boolean;
  errorTimeout?: number;
}

const initialState: IErrorState = {
  errorMessage: "",
  showErrorAlert: false,
  errorTimeout: 3000,
};

const errorSlice = createSlice({
  name: "error",
  initialState: initialState,
  reducers: {
    setErrorAlert: (state, action: PayloadAction<IErrorState>) => {
      state.errorMessage = action.payload.errorMessage;
      state.showErrorAlert = action.payload.showErrorAlert;
      state.errorTimeout =
        action.payload.errorTimeout ?? initialState.errorTimeout;
    },
    clearErrorAlert: () => {
      return initialState;
    },
  },
});

const { setErrorAlert, clearErrorAlert } = errorSlice.actions;

export { setErrorAlert, clearErrorAlert };

export default errorSlice.reducer;
