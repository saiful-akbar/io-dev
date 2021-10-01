import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import About from "src/pages/about";
import Home from "src/pages/home";
import NotFound from "src/pages/_error/404";

function Router() {
  const location = useLocation();

  return (
    <Switch location={location} key={location.key}>
      <Route path="/" exact component={Home} />
      <Route path="/about" exact component={About} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default Router;
