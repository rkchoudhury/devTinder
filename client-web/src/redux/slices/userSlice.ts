import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    addUser: (state, action) => {
      state = action.payload;
      return state;
    },
    removeUser: (state) => {
      state = initialState;
      return state;
    },
  },
});

const { addUser, removeUser } = userSlice.actions;

export { addUser, removeUser };

export default userSlice.reducer;
