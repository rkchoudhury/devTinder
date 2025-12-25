import { createSlice } from "@reduxjs/toolkit";
import type { IUser } from "../../models/userModel";

const initialState: {
  data: IUser | null;
  accessToken?: string | null;
} = {
  data: null,
  accessToken: null,
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
  },
});

const { addUser, removeUser, updateUser, updateAccessToken } = userSlice.actions;

export { addUser, removeUser, updateUser, updateAccessToken };

export default userSlice.reducer;
