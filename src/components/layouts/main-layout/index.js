import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { PropTypes } from "prop-types";
import React from "react";

/**
 * Styles
 */
const useStyles = makeStyles((theme) => ({
  main: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: theme.palette.background.default,
  },
  bannerLoader: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "200vh",
    backgroundColor: theme.palette.background.dark,
    zIndex: 9998,
  },
}));

/**
 * komponen utama
 * @param {*} param0
 * @returns
 */
const MainLayout = ({ children, pageTitle, ...rest }) => {
  const classes = useStyles();
  const { REACT_APP_NAME } = process.env;

  // set title pada document
  React.useEffect(() => {
    if (pageTitle !== "") {
      document.title = `${pageTitle} - ${REACT_APP_NAME}`;
    } else {
      document.title = REACT_APP_NAME;
    }
  }, [pageTitle, REACT_APP_NAME]);

  return (
    <Box component="main" className={classes.main} {...rest}>
      {children}
    </Box>
  );
};

// prop type
MainLayout.propTypes = {
  children: PropTypes.node,
  pageTitle: PropTypes.string,
};

// default props
MainLayout.defaultProps = {
  children: <div />,
  pageTitle: "",
};

export default MainLayout;
