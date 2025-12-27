import { createSlice } from "@reduxjs/toolkit";
import type { IUser } from "../../models/userModel";

const initialState: {
  data: IUser | null;
  accessToken?: string | null;
  authInitialized: boolean;
} = {
  data: null,
  accessToken: null,
  authInitialized: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    addUser: (_state, action) => {
      return action.payload;
    },
    removeUser: () => {
      return initialState;
    },
    updateUser: (state, action) => {
      return { ...state, data: { ...state.data, ...action.payload } };
    },
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    updateAuthInitialized: (state, action) => {
      state.authInitialized = action.payload;
    },
  },
});

const {
  addUser,
  removeUser,
  updateUser,
  updateAccessToken,
  updateAuthInitialized,
} = userSlice.actions;

export {
  addUser,
  removeUser,
  updateUser,
  updateAccessToken,
  updateAuthInitialized,
};

export default userSlice.reducer;
