import { createSlice } from "@reduxjs/toolkit";

interface ILoaderState {
  loading: boolean;
}

const initialState: ILoaderState = {
  loading: false,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState: initialState,
  reducers: {
    showLoader: (state) => {
      state.loading = true;
    },
    hideLoader: () => {
      return initialState;
    },
  },
});

const { showLoader, hideLoader } = loaderSlice.actions;

export { showLoader, hideLoader };

export default loaderSlice.reducer;
