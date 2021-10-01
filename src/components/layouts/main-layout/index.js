import { makeStyles } from "@mui/styles";
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
}));

/**
 * komponen utama
 * @param {*} param0
 * @returns
 */
const MainLayout = ({ children, pageTitle }) => {
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

  return <main className={classes.main}>{children}</main>;
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
