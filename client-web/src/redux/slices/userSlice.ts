import { createSlice } from "@reduxjs/toolkit";
import type { IUser } from "../../models/userModel";

interface IUserState {
  data: IUser;
  error: Error | null;
}

const initialState: IUserState = {
  data: {} as IUser,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    addUser: (state, action) => {
      state.data = action.payload;
    },
    removeUser: () => {
      return initialState;
    },
  },
});

const { addUser, removeUser } = userSlice.actions;

export { addUser, removeUser };

export default userSlice.reducer;
