import { Paper, Typography, Stack, TextField, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useState } from "react";
import { addPost } from "../slices/posts";
import { selectLoading } from "../slices/fetches";

export const CreatePost = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const createLoading = useAppSelector((state) =>
    selectLoading(state, addPost.typePrefix),
  );
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={2} useFlexGap>
        <Typography variant="h6">Create post</Typography>
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label="Title"
        />
        <TextField
          value={body}
          onChange={(e) => setBody(e.target.value)}
          label="Body"
          multiline
          minRows={2}
        />
        <Button
          variant="contained"
          disabled={!title || !body || createLoading}
          onClick={() => {
            dispatch(addPost({ title, body }))
              .unwrap()
              .then(() => {
                setTitle("");
                setBody("");
              });
          }}
        >
          Create
        </Button>
      </Stack>
    </Paper>
  );
};
