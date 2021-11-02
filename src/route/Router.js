import React from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  Route,
  Switch,
  useLocation,
  Redirect,
} from 'react-router-dom';
import About from 'src/pages/About';
import Work from 'src/pages/Work';
import Project from 'src/pages/Project';
import NotFound from 'src/pages/errors/404';


/**
 * Komponen utama Router
 */
function Router() {
  const location = useLocation();

  // handle scroll window
  const handleScroll = () => {
    window.scroll(0, 0);
  }

  return (
    <AnimatePresence exitBeforeEnter onExitComplete={handleScroll}>
      <Switch location={location} key={location.pathname}>
        <Route
          exact
          path="/"
          render={(routeProps) => (
            <Work {...routeProps} />
          )}
        />

        <Route
          exact
          path="/about"
          render={(routeProps) => (
            <About {...routeProps} />
          )}
        />

        <Route
          exact
          path="/project/:slug"
          render={(routeProps) => (
            <Project {...routeProps} />
          )}
        />

        <Route
          exact
          path="/404"
          render={(routeProps) => (
            <NotFound {...routeProps} />
          )}
        />

        <Route>
          <Redirect to="/404" />
        </Route>
      </Switch>
    </AnimatePresence>
  );
}

export default Router;