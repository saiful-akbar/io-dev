import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import Router from "src/route/Router";
import theme from "src/themes/theme";
import Header from "./components/Header";
import Cursor from "./components/Cursor";
import ScrollToTop from "./components/ScrollToTop";
import { useRouteMatch } from "react-router-dom";

/**
 * Komponen utama
 * @returns
 */
function App() {
  const match = useRouteMatch("/project/:slug");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div id="top" />

      <Cursor />
      {!match && <Header />}

      <Router />

      <ScrollToTop />
    </ThemeProvider>
  );
}

export default App;