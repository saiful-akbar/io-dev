import 'src/styles/globals.scss';
import { CacheProvider } from '@emotion/react';
import { createGenerateClassName, StylesProvider } from '@mui/styles';
import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';
import createEmotionCache from 'src/createEmotionCache';
import App from 'src/App';
import { Provider } from 'react-redux';
import reduxStore from 'src/redux/store';
import { AnimatePresence } from 'framer-motion';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
const generateClassName = createGenerateClassName({ productionPrefix: 'c' });

export default function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }) {
  return (
    <Provider store={reduxStore}>
      <CacheProvider value={emotionCache}>
        <StylesProvider generateClassName={generateClassName}>
          <Head>
            <title>{process.env.APP_NAME}</title>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>

          <App>
            <AnimatePresence exitBeforeEnter onExitComplete={() => window.scroll(0, 0)}>
              <Component {...pageProps} key={pageProps.key} />
            </AnimatePresence>
          </App>
        </StylesProvider>
      </CacheProvider>
    </Provider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
