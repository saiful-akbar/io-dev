import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AnimateSharedLayout } from 'framer-motion';
import React from 'react';
import Cursor from 'src/components/shared/cursor';
import Header from 'src/components/shared/header';
import Router from 'src/router';
import theme from 'src/theme';

function App() {
  React.useEffect(() => {
    const rootEl = document.querySelector('#root');

    if (rootEl) {
      rootEl.style.backgroundColor = theme.palette.background.default;
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Cursor />
      <Header />

      <AnimateSharedLayout type="crossfade">
        <Router />
      </AnimateSharedLayout>
    </ThemeProvider>
  );
}

export default App;
