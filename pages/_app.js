import { CacheProvider } from '@emotion/react';
import { createGenerateClassName, StylesProvider } from '@mui/styles';
import { AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import App from 'src/App';
import createEmotionCache from 'src/createEmotionCache';
import reduxStore from 'src/redux/store';
import Head from 'next/head';
import 'src/styles/globals.scss';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
const generateClassName = createGenerateClassName({ productionPrefix: 'c' });

export default function MyApp(props) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    router,
  } = props;

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
              <Component {...pageProps} key={router.route} />
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
  router: PropTypes.object.isRequired,
};
