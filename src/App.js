import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import theme from 'src/theme';
import Header from 'src/components/Header';
import Head from 'next/head';
import NextNprogress from 'nextjs-progressbar';

/**
 * komponen utama
 * @param {node} children
 * @returns
 */
export default function App({ children }) {
  // redux state
  const { settings } = useSelector((state) => state.globalReducer);

  useEffect(() => {
    // ambil data setting pada localstorage
    const storageSettings = JSON.parse(localStorage.getItem('settings'));

    // cek apakah ada data settings pada localstorage
    // jika tidak ada buat baru
    if (!storageSettings) {
      localStorage.setItem('settings', JSON.stringify(settings));
    }
  }, []);

  return (
    <>
      <Head>
        <title>{process.env.APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <NextNprogress
        color="#e76f51"
        startPosition={0.2}
        stopDelayMs={100}
        height={2.5}
        showOnShallow
        options={{ showSpinner: false }}
      />

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        {children}
      </ThemeProvider>
    </>
  );
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};
