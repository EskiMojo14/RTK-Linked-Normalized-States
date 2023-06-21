import {
  EntityState,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { wait } from "../utils";
import { addComment, commentAdapter, deleteComment } from "./comments";
import { selectLoading } from "./fetches";
import { RootState } from ".";

export interface Post {
  created: number;
  id: string;
  title: string;
  body: string;
  commentIds: string[];
}

export const postAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => b.created - a.created,
});

interface PostState extends EntityState<Post, string> {}

export const postSlice = createSlice({
  name: "posts",
  initialState: postAdapter.getInitialState() as PostState,
  reducers: (create) => ({
    getPosts: create.asyncThunk(
      async (_: void, { requestId, dispatch }): Promise<Post[]> => {
        const { id: commentId } = await dispatch(
          addComment({ postId: requestId, body: "A comment" }),
        ).unwrap();
        return [
          {
            id: requestId,
            title: "A post!",
            body: "Some blurb",
            commentIds: [commentId],
            created: Date.now(),
          },
        ];
      },
      {
        fulfilled: postAdapter.setMany,
        options: {
          condition: (_, { getState }): boolean =>
            !selectLoading(getState() as RootState, getPosts.typePrefix),
        },
      },
    ),
    addPost: create.asyncThunk(
      async (
        post: Omit<Post, "id" | "commentIds" | "created">,
        { requestId },
      ): Promise<Post> => {
        await wait(1000);
        return { ...post, created: Date.now(), id: requestId, commentIds: [] };
      },
      {
        fulfilled: postAdapter.setOne,
      },
    ),
    deletePost: create.asyncThunk((id: string) => wait(100), {
      fulfilled: (state, action) => {
        postAdapter.removeOne(state, action.meta.arg);
      },
    }),
  }),
  extraReducers: (builder) => {
    builder.addCase(addComment.fulfilled, (state, { payload }) => {
      state.entities[payload.postId]?.commentIds.push(
        commentAdapter.selectId(payload),
      );
    });
  },
  selectors: {
    selectPosts: (state) => state,
  },
});

export const {
  actions: { getPosts, addPost, deletePost },
  selectors: { selectPosts },
} = postSlice;

export const { selectIds: selectPostIds, selectById: selectPostById } =
  postAdapter.getSelectors(selectPosts);
