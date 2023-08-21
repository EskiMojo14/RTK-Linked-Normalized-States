import { Stack, TextField, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useState } from "react";
import { selectLoading } from "../slices/fetches";
import { addComment } from "../slices/comments";

export const CreateComment = ({ postId }: { postId: string }) => {
  const dispatch = useAppDispatch();
  const [body, setBody] = useState("");
  const createLoading = useAppSelector((state) =>
    selectLoading(state, addComment.typePrefix),
  );
  return (
    <Stack direction="row" spacing={2} useFlexGap alignItems="center">
      <TextField
        value={body}
        onChange={(e) => setBody(e.target.value)}
        label="Add Comment"
        size="small"
        color="secondary"
        sx={{
          flexGrow: 1,
          backgroundColor: (theme) => theme.palette.common.white,
        }}
      />
      <Button
        variant="outlined"
        color="secondary"
        disabled={!body || createLoading}
        onClick={() => {
          dispatch(addComment({ postId, body }))
            .unwrap()
            .then(() => {
              setBody("");
            });
        }}
      >
        Create
      </Button>
    </Stack>
  );
};
