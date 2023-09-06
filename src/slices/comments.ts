import {
  EntityState,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { RootState } from ".";
import { wait } from "../utils";
import { deletePost } from "./posts";

export interface Comment {
  created: number;
  postId: string;
  id: string;
  body: string;
}

export const commentAdapter = createEntityAdapter<Comment>({
  sortComparer: (a, b) => a.created - b.created,
});

type CommentState = EntityState<Comment, string>;

export const commentSlice = createSlice({
  name: "comments",
  initialState: commentAdapter.getInitialState() as CommentState,
  reducers: (create) => ({
    addComment: create.asyncThunk(
      async (
        comment: Omit<Comment, "id" | "created">,
        { requestId },
      ): Promise<Comment> => {
        await wait(1000);
        return { ...comment, created: Date.now(), id: requestId };
      },
      {
        fulfilled: commentAdapter.setOne,
      },
    ),
    deleteComment: create.asyncThunk(
      async (id: string, { getState }): Promise<Comment | undefined> => {
        await wait(100);
        return selectCommentById(getState() as RootState, id);
      },
      {
        fulfilled: (state, action) => {
          commentAdapter.removeOne(state, action.meta.arg);
        },
      },
    ),
  }),
  extraReducers: (builder) => {
    builder.addCase(deletePost.fulfilled, (state, action) => {
      const postId = action.meta.arg;
      for (const entity of Object.values(state.entities)) {
        if (entity.postId === postId) {
          commentAdapter.removeOne(state, commentAdapter.selectId(entity));
        }
      }
    });
  },
  selectors: {
    selectComments: (state) => state,
  },
});

export const {
  actions: { addComment, deleteComment },
  selectors: { selectComments },
} = commentSlice;

export const { selectById: selectCommentById } =
  commentAdapter.getSelectors(selectComments);
