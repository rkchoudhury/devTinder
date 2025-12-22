import { createSlice } from "@reduxjs/toolkit";
import type { IUser } from "../../models/userModel";

const initialState: IUser | null = null;

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
      if (!state) return state;
      return { ...(state as IUser), ...action.payload };
    }
  },
});

const { addUser, removeUser, updateUser } = userSlice.actions;

export { addUser, removeUser, updateUser };

export default userSlice.reducer;
