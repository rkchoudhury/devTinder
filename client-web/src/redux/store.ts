import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import errorReducer from "./slices/errorSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    errorAlert: errorReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export { store };

export type { RootState, AppDispatch };
