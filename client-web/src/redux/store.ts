import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import alertReducer from "./slices/alertSlice";
import feedReducer from "./slices/feedSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    alert: alertReducer,
    feed: feedReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export { store };

export type { RootState, AppDispatch };
