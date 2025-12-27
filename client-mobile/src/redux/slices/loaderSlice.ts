import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ILoaderState {
  loading: boolean;
  message?: string;
}

const initialState: ILoaderState = {
  loading: false,
  message: 'Loading...',
};

const loaderSlice = createSlice({
  name: "loader",
  initialState: initialState,
  reducers: {
    showLoader: (state, actions: PayloadAction<{ message?: string }>) => {
      state.loading = true;
      state.message = actions?.payload?.message ?? 'Loading...';
    },
    hideLoader: () => {
      return initialState;
    },
  },
});

const { showLoader, hideLoader } = loaderSlice.actions;

export { showLoader, hideLoader };

export default loaderSlice.reducer;
