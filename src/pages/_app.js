import React from "react";
import Router from "src/router";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "src/theme";
import Cursor from "src/components/shared/cursor";

function App() {
  React.useEffect(() => {
    const rootEl = document.querySelector("#root");

    if (rootEl) {
      rootEl.style.backgroundColor = theme.palette.background.default;
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Cursor />

      <Router />
    </ThemeProvider>
  );
}

export default App;
