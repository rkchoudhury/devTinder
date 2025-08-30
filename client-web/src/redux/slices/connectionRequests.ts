import { createSlice } from "@reduxjs/toolkit";
import type { IUser } from "../../models/userModel";

const initialState: IUser | null = null;

const connectionRequestSlice = createSlice({
  name: "connectionRequest",
  initialState: initialState,
  reducers: {
    addConnectionRequest: (_state, action) => {
      return action.payload;
    },
    removeConnectionRequest: () => {
      return initialState;
    },
  },
});

const { addConnectionRequest, removeConnectionRequest } =
  connectionRequestSlice.actions;

export { addConnectionRequest, removeConnectionRequest };

export default connectionRequestSlice.reducer;
