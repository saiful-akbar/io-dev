import React from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Router from 'src/route/Router';
import theme from 'src/themes/theme';

/**
 * Komponen utama
 * @returns
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  );
}

export default App;