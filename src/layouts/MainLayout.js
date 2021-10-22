import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import styles from 'src/styles/layout.module.scss';

const MainLayout = ({ children, title }) => (
  <>
    <Head>
      <title>
        {process.env.APP_NAME}
        {' '}
        :
        {' '}
        {title}
      </title>
    </Head>

    <main className={styles.main}>
      {children}
    </main>
  </>
);

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default MainLayout;
