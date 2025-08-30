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
    updateFeed: (state, action) => {
      const { data } = action.payload;
      const newList = state.list.filter(
        (eachFeed) => eachFeed._id !== data.toUserId
      );
      const newState = {
        ...state,
        list: [...newList],
      };
      return newState;
    },
  },
});

const { addFeed, updateFeed } = feedSlice.actions;

export { addFeed, updateFeed };

export default feedSlice.reducer;
