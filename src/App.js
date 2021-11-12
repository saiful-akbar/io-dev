import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import Router from "src/route/Router";
import theme from "src/themes/theme";
import Header from "./components/Header";
import Cursor from "./components/Cursor";
import ScrollToTop from "./components/ScrollToTop";
import { useRouteMatch } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";

/**
 * Komponen utama
 * @returns
 */
function App() {
  const match = useRouteMatch("/project/:slug");
  const { bgColor } = useSelector((state) => state.globalReducer);

  // set warna background color pada tag body
  React.useEffect(() => {
    const bodyEl = document.querySelector("body");
    if (bodyEl) {
      bodyEl.style.backgroundColor = bgColor;
    }
  }, [bgColor]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <motion.div initial={{ backgroundColor: bgColor }} animate={{ backgroundColor: bgColor }}>
        <div id="top" />
        <Cursor />

        <AnimatePresence exitBeforeEnter>
          {!match && <Header key={match} />}
        </AnimatePresence>

        <Router />
        <ScrollToTop />
      </motion.div>
    </ThemeProvider>
  );
}

export default App;