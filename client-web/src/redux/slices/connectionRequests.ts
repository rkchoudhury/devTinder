import { createSlice } from "@reduxjs/toolkit";
import type { IConnection } from "../../models/connectionModel";

const initialState: IConnection[] = [];

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
