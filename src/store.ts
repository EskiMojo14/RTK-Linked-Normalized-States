import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./slices";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (gDM) => gDM(),
});

export type AppDispatch = typeof store.dispatch;
