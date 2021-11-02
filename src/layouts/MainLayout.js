import React from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';

/**
 * Styles class
 */
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    widht: '100%',
    backgroundColor: theme.palette.background.default,
    overflowX: 'hidden',
  },
}));

/**
 * Komponen utama MainLayout
 * 
 * @param  {[Node]} options.children [Komponen atau element anak]
 * @param  {[String]} options.title [Title document]
 * @return {[React node]}
 */
const MainLayout = ({ children, title, ...rest }) => {
  const classes = useStyles();
  const appName = process.env.REACT_APP_NAME;

  // Set title pada halaman
  React.useEffect(() => {
    document.title = `${appName} : ${title}`;
  }, [title, appName]);

  // Render komponen
  return (
    <Box className={classes.root} {...rest}>
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