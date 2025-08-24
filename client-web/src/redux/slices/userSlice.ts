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
  },
});

const { addUser, removeUser } = userSlice.actions;

export { addUser, removeUser };

export default userSlice.reducer;
