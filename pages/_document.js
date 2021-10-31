import * as React from 'react';
import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import theme from 'src/theme';
import createEmotionCache from 'src/createEmotionCache';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="theme-color" content={theme.palette.primary.main} />
          <meta name="description" content="IO Dev portfolio" />
          <meta name="author" content="Saiful Akbar" />
          <meta name="keywords" content="IO Dev, iodev, io-dev, portfolio web app" />
          <meta name="application-name" content="IO Dev" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-TileColor" content={theme.palette.text.primary} />
          <meta name="msapplication-tap-highlight" content="no" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://iodev.vercel.app" />
          <meta name="twitter:title" content="IO Dev" />
          <meta name="twitter:description" content="Portfolio web app" />
          <meta name="twitter:image" content="https://iodev.vercel.app/assets/icon/android-icon-192x192-seochecker-manifest-1130.png" />
          <meta name="twitter:creator" content="Saiful Akbar" />

          <meta property="og:type" content="website" />
          <meta property="og:title" content="IO Dev" />
          <meta property="og:description" content="Portfolio web app" />
          <meta property="og:site_name" content="IO Dev" />
          <meta property="og:url" content="https://iodev.vercel.app" />
          <meta property="og:image" content="https://iodev.vercel.app/assets/icon/android-icon-192x192-seochecker-manifest-1130.png" />

          {/* IOS */}
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="IO Dev" />
          <link rel="apple-touch-icon" href="/assets/icon/apple-icon-180x180-seochecker-manifest-1130.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/assets/icon/apple-icon-152x152-seochecker-manifest-1130.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/assets/icon/apple-icon-180x180-seochecker-manifest-1130.png" />

          {/* icon */}
          <link rel="icon" type="image/png" sizes="32x32" href="/assets/icon/apple-icon-32x32-seochecker-manifest-1130.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/assets/icon/apple-icon-16x16-seochecker-manifest-1130.png" />
          <link rel="icon" type="image/svg+xml" sizes="32x32" href="/assets/icon/apple-icon-32x32-seochecker-manifest-1130.svg" />

          {/* manifest & favicon */}
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/favicon.ico" />

          {/* google font & icons */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage;

  // eslint-disable-next-line max-len
  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () => originalRenderPage({
    enhanceApp: (App) => (props) => <App emotionCache={cache} {...props} />,
  });

  const initialProps = await Document.getInitialProps(ctx);
  // This is important. It prevents emotion to render invalid HTML.
  // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags],
  };
};
