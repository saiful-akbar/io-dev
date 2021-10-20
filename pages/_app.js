import React from 'react';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { createGenerateClassName, StylesProvider } from '@mui/styles';
import Head from 'next/head';
import PropTypes from 'prop-types';
import createEmotionCache from 'src/createEmotionCache';
import 'src/styles/globals.css';
import theme from 'src/theme';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
const generateClassName = createGenerateClassName({ productionPrefix: 'c' });

export default function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }) {
  return (
    <CacheProvider value={emotionCache}>
      <StylesProvider generateClassName={generateClassName}>
        <Head>
          <title>{process.env.APP_NAME}</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>

        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </StylesProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
