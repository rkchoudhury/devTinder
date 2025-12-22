import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import alertReducer from "./slices/alertSlice";
import feedReducer from "./slices/feedSlice";
import connectionRequestReducer from "./slices/connectionRequests";
import connectionReducer from "./slices/connection";
import loaderReducer from "./slices/loaderSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    alert: alertReducer,
    feed: feedReducer,
    connectionRequest: connectionRequestReducer,
    connection: connectionReducer,
    loader: loaderReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export { store };

export type { RootState, AppDispatch };
