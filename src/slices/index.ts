import { combineSlices } from "@reduxjs/toolkit";
import { postSlice } from "./posts";
import { commentSlice } from "./comments";
import { fetchesSlice } from "./fetches";
import { snackbarSlice } from "./snackbars";

export const rootReducer = combineSlices(
  postSlice,
  commentSlice,
  fetchesSlice,
  snackbarSlice,
);

export type RootState = ReturnType<typeof rootReducer>;
