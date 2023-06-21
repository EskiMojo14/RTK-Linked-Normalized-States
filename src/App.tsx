import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { getPosts, selectPostIds } from "./slices/posts";
import { Stack, Container, Snackbar } from "@mui/material";
import { selectLoading } from "./slices/fetches";
import { FullscreenLoading } from "./components/fullscreen-loading";
import { CreatePost } from "./components/create-post";
import { Post } from "./components/post";
import { SnackbarQueue } from "./components/snackbar-queue";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const getPostsLoading = useAppSelector((state) =>
    selectLoading(state, getPosts.typePrefix),
  );

  const postIds = useAppSelector(selectPostIds);

  if (getPostsLoading) {
    return <FullscreenLoading />;
  }

  return (
    <Container maxWidth="md">
      <Stack p={2} spacing={2} useFlexGap>
        <CreatePost />
        {postIds.map((id) => (
          <Post id={id} key={id} />
        ))}
      </Stack>
      <SnackbarQueue />
    </Container>
  );
}

export default App;
