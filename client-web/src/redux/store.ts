import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export { store };

export type { RootState, AppDispatch };
