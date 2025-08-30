import { createSlice } from "@reduxjs/toolkit";
import type { IUser } from "../../models/userModel";

interface IFeedState {
  list: IUser[];
  currentPage: number;
  limit: number;
}

const initialState: IFeedState = {
  list: [],
  currentPage: 1,
  limit: 10,
};

const feedSlice = createSlice({
  name: "feed",
  initialState: initialState,
  reducers: {
    addFeed: (state, action) => {
      const newState = {
        ...state,
        list: action.payload.data,
      };
      return newState;
    },
    clearFeed: () => {
      return initialState;
    },
  },
});

const { addFeed, clearFeed } = feedSlice.actions;

export { addFeed, clearFeed };

export default feedSlice.reducer;
