import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectSnackbars, snackbarShifted } from "../slices/snackbars";
import { Snackbar } from "@mui/material";

export const SnackbarQueue = () => {
  const dispatch = useAppDispatch();
  const [snackbarFromStore] = useAppSelector(selectSnackbars);
  const [currentSnackbar, setCurrentSnackbar] = useState(snackbarFromStore);
  useEffect(() => {
    const timeout = setTimeout(
      () => setCurrentSnackbar(snackbarFromStore),
      150,
    );
    return () => clearTimeout(timeout);
  }, [snackbarFromStore, setCurrentSnackbar]);
  return (
    <Snackbar
      open={currentSnackbar && snackbarFromStore === currentSnackbar}
      message={currentSnackbar}
      autoHideDuration={3000}
      onClose={() => dispatch(snackbarShifted())}
    />
  );
};
