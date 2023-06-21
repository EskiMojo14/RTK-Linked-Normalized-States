import { createSlice } from "@reduxjs/toolkit";
import { deletePost } from "./posts";
import { deleteComment } from "./comments";

const messageMap = {
  [deletePost.fulfilled.type]: "Post deleted",
  [deleteComment.fulfilled.type]: "Comment deleted",
} satisfies Record<string, string>;

export const snackbarSlice = createSlice({
  name: "snackbars",
  initialState: [] as string[],
  reducers: {
    snackbarShifted: (state) => {
      state.shift();
    },
  },
  extraReducers: (builder) => {
    for (const [type, message] of Object.entries(messageMap)) {
      builder.addCase(type, (state) => {
        state.push(message);
      });
    }
  },
  selectors: {
    selectSnackbars: (messages) => messages,
  },
});

export const {
  actions: { snackbarShifted },
  selectors: { selectSnackbars },
} = snackbarSlice;
