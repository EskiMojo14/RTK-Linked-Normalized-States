import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { deepOrange, grey, teal } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    background: {
      default: grey[200],
    },
    primary: {
      main: teal[500],
    },
    secondary: {
      main: deepOrange[300],
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
