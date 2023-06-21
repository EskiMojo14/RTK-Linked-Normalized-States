import { Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
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
      <LoadingButton
        loading={createLoading}
        variant="outlined"
        color="secondary"
        disabled={!body}
        onClick={() => {
          dispatch(addComment({ postId, body }))
            .unwrap()
            .then(() => {
              setBody("");
            });
        }}
      >
        Create
      </LoadingButton>
    </Stack>
  );
};
