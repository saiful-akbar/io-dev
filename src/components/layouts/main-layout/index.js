import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";
import { PropTypes } from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

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

  // redux
  const { appName } = useSelector((state) => state.globalReducer);

  // set title pada document
  React.useEffect(() => {
    if (pageTitle !== "") {
      document.title = `${pageTitle} - ${appName}`;
    } else {
      document.title = appName;
    }
  }, [pageTitle, appName]);

  return (
    <Box component="main" className={classes.main} {...rest}>
      {children}
    </Box>
  );
};

// prop type
MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  pageTitle: PropTypes.string,
};

// default props
MainLayout.defaultProps = {
  pageTitle: "",
};

export default MainLayout;
