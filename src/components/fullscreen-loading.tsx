import { Box, CircularProgress, Typography } from "@mui/material";

export const FullscreenLoading = () => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    minHeight="100dvh"
    gap={2}
  >
    <CircularProgress size={64} />
    <Typography
      variant="caption"
      color={(theme) => theme.palette.text.secondary}
    >
      Loading posts
    </Typography>
  </Box>
);
