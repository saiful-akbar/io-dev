import React from "react";
import PropTypes from "prop-types";
// import { makeStyles } from '@mui/styles';
import { Box } from "@mui/material";
import styles from "src/styles/layout.module.scss";

/**
 * Komponen utama MainLayout
 *
 * @param  {Node} options.children Komponen atau element anak
 * @param  {String} options.title Title document
 * @return {React node}
 */
const MainLayout = ({ children, title, ...rest }) => {
  const appName = process.env.REACT_APP_NAME;

  // Set title pada halaman
  React.useEffect(() => {
    document.title = `${appName} : ${title}`;
  }, [title, appName]);

  // Render komponen
  return (
    <Box className={styles.wrapper} {...rest}>
      {children}
    </Box>
  );
};

/**
 * Prop Types
 */
MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default MainLayout;
