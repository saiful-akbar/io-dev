import { Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { motion } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: theme.zIndex.appBar,
    [theme.breakpoints.down("lg")]: {
      position: "static",
    },
  },
  logo: {
    zIndex: theme.zIndex.appBar,
    width: 80,
    height: 80,
    position: "absolute",
    top: 30,
    left: 30,
    [theme.breakpoints.down("lg")]: {
      width: 70,
      height: 70,
      top: 5,
      left: 5,
    },
  },
  link: {
    zIndex: theme.zIndex.appBar,
    position: "absolute",
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "column",
    alignItems: "flex-end",
    top: 30,
    right: 50,
    [theme.breakpoints.down("lg")]: {
      flexDirection: "row",
      alignItems: "center",
      top: 10,
      right: 10,
    },
  },
  linkItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: theme.spacing(1),
    color: theme.palette.text.secondary,
    [theme.breakpoints.down("lg")]: {
      margin: theme.spacing(2, 1.5),
    },
  },
  linkActive: {
    color: theme.palette.text.primary,
  },
  strip: {
    borderBottom: `2px solid ${theme.palette.text.secondary}`,
    width: 10,
    marginLeft: 7,
    [theme.breakpoints.down("lg")]: {
      display: "none",
    },
  },
  textTertiary: {
    color: theme.palette.text.tertiary,
  },
}));

// list menu
const menus = [
  { name: "Work", href: "/" },
  { name: "About Us", href: "/about" },
];

// animation variants
const headerVariants = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.01,
    },
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

/**
 * Komponen utama
 * @returns
 */
const Header = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("lg"));
  const transition = { duration: 0.3, ease: "easeInOut" };

  // redux
  const { header } = useSelector((state) => state.globalReducer);

  return (
    <motion.header
      className={classes.header}
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      id="header"
    >
      <Link to="/">
        <img
          className={classes.logo}
          alt="Logo"
          loading="eager"
          src={`/assets/images/logo/${
            header.color === "dark" ? "logo_t_black.png" : "logo_t_white.png"
          }`}
        />
      </Link>

      <div className={classes.link}>
        {menus.map((menu) => (
          <NavLink
            key={menu.href}
            exact
            to={menu.href}
            activeClassName={classes.linkActive}
            className={clsx(classes.linkItem, {
              [classes.textTertiary]: Boolean(header.color === "light"),
            })}
          >
            <Typography
              variant={matches ? "subtitle1" : "subtitle2"}
              component={motion.h6}
              style={{ originX: matches ? 0.5 : 1 }}
              transition={{ ...transition }}
              whileHover={{
                scale: 1.2,
                originX: matches ? 0.5 : 1,
              }}
            >
              {menu.name}
            </Typography>
            <div className={classes.strip} />
          </NavLink>
        ))}
      </div>
    </motion.header>
  );
};

export default Header;
