import { AnimatePresence } from "framer-motion";
import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import About from "src/pages/about";
import Work from "src/pages/work";
import NotFound from "src/pages/_error/404";

function Router() {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter onExitComplete={() => window.scroll(0, 0)}>
      <Switch location={location} key={location.pathname}>
        <Route path="/" exact component={Work} />
        <Route path="/about" exact component={About} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

export default Router;
