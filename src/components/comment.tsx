import { IconButton, Paper, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks";
import { deleteComment, selectCommentById } from "../slices/comments";
import { Delete } from "@mui/icons-material";

export const Comment = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const comment = useAppSelector((state) => ({
    ...selectCommentById(state, id),
  }));
  if (!comment) {
    return null;
  }
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 1,
        display: "flex",
        alignItems: "center",
        backgroundColor: (theme) => theme.palette.common.white,
      }}
    >
      <Typography variant="body1" flexGrow={1}>
        {comment.body}
      </Typography>
      <IconButton size="small" onClick={() => dispatch(deleteComment(id))}>
        <Delete />
      </IconButton>
    </Paper>
  );
};
