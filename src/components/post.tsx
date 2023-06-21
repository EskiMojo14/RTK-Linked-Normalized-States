import {
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks";
import { deletePost, selectPostById } from "../slices/posts";
import { Comment } from "./comment";
import { CreateComment } from "./create-comment";

export const Post = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const post = useAppSelector((state) => selectPostById(state, id));
  if (!post) {
    return null;
  }
  return (
    <Card>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h4">{post.title}</Typography>
        <Typography variant="body2">{post.body}</Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={() => dispatch(deletePost(id))}
        >
          Delete
        </Button>
      </CardContent>
      <Divider />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          backgroundColor: (theme) => theme.palette.grey[50],
        }}
      >
        <Typography variant="overline">Comments</Typography>
        {post.commentIds.length ? (
          <Stack spacing={1} useFlexGap>
            {post.commentIds.map((commentId) => (
              <Comment key={commentId} id={commentId} />
            ))}
          </Stack>
        ) : null}
        <CreateComment postId={id} />
      </CardContent>
    </Card>
  );
};
