import React from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Router from 'src/router';
import theme from 'src/themes/theme';

/**
 * Komponen utama
 * @returns
 */
function App() {
  React.useEffect(() => {
    const rootEl = document.querySelector('#root');

    if (rootEl) {
      // set background pada id #root
      rootEl.style.backgroundColor = theme.palette.background.default;
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  );
}

export default App;