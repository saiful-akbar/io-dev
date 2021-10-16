import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { motion } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { transition } from "src/utils/animate";

/**
 * Style
 */
const useStyles = makeStyles((theme) => ({
  logo: {
    position: "fixed",
    top: 40,
    left: 50,
    color: theme.palette.text.primary,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: theme.zIndex.appBar,
    [theme.breakpoints.down("lg")]: {
      position: "absolute",
      top: 10,
      left: 25,
    },
    "& h1": {
      fontSize: "3em",
      fontWeight: 600,
      lineHeight: "100%",
      marginBottom: 5,
      [theme.breakpoints.down("lg")]: {
        fontSize: "2.5em",
      },
    },
    "& h2": {
      fontSize: "0.8em",
      fontWeight: 600,
      lineHeight: "100%",
      [theme.breakpoints.down("lg")]: {
        fontSize: "0.8em",
      },
    },
  },
  nav: {
    position: "fixed",
    top: 40,
    right: 50,
    zIndex: theme.zIndex.appBar,
    [theme.breakpoints.down("lg")]: {
      position: "absolute",
      top: 30,
      right: 25,
      "& ul": {
        display: "flex",
        flexDirection: "row",
      },
    },
  },
  navItem: {
    listStyle: "none",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("lg")]: {
      marginBottom: 0,
      marginLeft: theme.spacing(3),
    },
  },
  navLink: {
    color: theme.palette.text.secondary,
    fontSize: theme.spacing(1.8),
  },
  active: {
    fontWeight: 800,
    fontSize: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  minus: {
    width: 10,
    borderBottom: `2px solid ${theme.palette.text.secondary}`,
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down("lg")]: {
      display: "none",
    },
  },
  textTertiary: {
    color: theme.palette.text.tertiary,
  },
}));

/**
 * animateVariants
 */
const headerVariants = {
  hidden: {
    opacity: 0,
    y: "20vh",
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ...transition,
    },
  },
  exit: {
    opacity: 0,
  },
};

/**
 * list menu
 */
const links = [
  { name: "Work", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

/**
 * Komponen utama
 * @returns
 */
const Header = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("lg"));

  // redux
  const { header } = useSelector((state) => state.globalReducer);

  return (
    <>
      <Link
        to="/"
        className={clsx(classes.logo, {
          [classes.textTertiary]: Boolean(header.color === "light"),
        })}
      >
        <motion.h1
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={headerVariants}
        >
          io
        </motion.h1>
        <motion.h2
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={headerVariants}
        >
          DEV
        </motion.h2>
      </Link>

      <motion.nav className={classes.nav}>
        <ul>
          {links.map((link, key) => (
            <li className={classes.navItem} key={key}>
              <motion.div
                style={{ originX: matches ? 0.5 : 1 }}
                whileHover={{ scale: 1.15, originX: matches ? 0.5 : 1 }}
                transition={{ duration: 0.5, ease: transition.ease }}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={headerVariants}
              >
                <NavLink
                  exact
                  to={link.href}
                  activeClassName={classes.active}
                  className={clsx(classes.navLink, {
                    [classes.textTertiary]: Boolean(header.color === "light"),
                  })}
                >
                  {link.name}
                </NavLink>
              </motion.div>

              <motion.div
                className={classes.minus}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={headerVariants}
              />
            </li>
          ))}
        </ul>
      </motion.nav>
    </>
  );
};

export default Header;
