import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
  },
}));

const MainLayout = ({ children, title }) => {
  const classes = useStyles();

  return (
    <main className={classes.main}>
      <Head>
        <title>
          {title}
          {' '}
          -
          {' '}
          {process.env.APP_NAME}
        </title>
      </Head>

      {children}
    </main>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default MainLayout;
