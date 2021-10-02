import React from "react";
import Router from "src/router";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "src/theme";
import Cursor from "src/components/shared/cursor";
import Header from "src/components/shared/header";
import Footer from "src/components/shared/footer";

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
      <Header />
      <Router />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
