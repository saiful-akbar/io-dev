import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import Router from "src/route/Router";
import theme from "src/themes/theme";
import Header from "./components/Header";
import Cursor from "./components/Cursor";
import ScrollToTop from "./components/ScrollToTop";

/**
 * Komponen utama
 * @returns
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div id="top" />

      <Cursor />
      <Header />

      <Router />

      <ScrollToTop />
    </ThemeProvider>
  );
}

export default App;
