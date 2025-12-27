import { createSlice } from "@reduxjs/toolkit";
import type { IConnectionUser } from "../../models/userModel";

const initialState: IConnectionUser[] = [];

const connectionSlice = createSlice({
  name: "connection",
  initialState: initialState,
  reducers: {
    saveConnections: (_state, action) => {
      return action.payload;
    },
    removeConnection: () => {
      return initialState;
    },
  },
});

const { saveConnections, removeConnection } = connectionSlice.actions;

export { saveConnections, removeConnection };

export default connectionSlice.reducer;
