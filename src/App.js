import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import Router from "src/route/Router";
import theme from "src/themes/theme";
import Header from "./components/Header";

/**
 * Komponen utama
 * @returns
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Router />
    </ThemeProvider>
  );
}

export default App;
