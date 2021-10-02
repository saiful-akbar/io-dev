import { Typography, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles((theme) => ({
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    [theme.breakpoints.down("lg")]: {
      position: "static",
    },
  },
  logo: {
    position: "absolute",
    top: 50,
    left: 50,
    [theme.breakpoints.down("lg")]: {
      top: 10,
      left: 20,
    },
    [theme.breakpoints.down("md")]: {
      left: 10,
    },
  },
  link: {
    position: "absolute",
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "column",
    alignItems: "flex-end",
    top: 50,
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
    color: theme.palette.text.secondary,
    margin: theme.spacing(1),
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
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
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
    y: 150,
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
    y: -100,
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
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const transition = { duration: 0.5, ease: "easeInOut" };

  return (
    <motion.header
      className={classes.header}
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Link to="/">
        <img
          className={classes.logo}
          src="/assets/images/logo/logo512.png"
          alt="Logo"
          width={60}
          hright={60}
          loading="lazy"
        />
      </Link>

      <div className={classes.link}>
        {menus.map((menu) => (
          <NavLink
            key={menu.href}
            exact
            to={menu.href}
            className={classes.linkItem}
            activeClassName={classes.linkActive}
          >
            <Typography
              variant="subtitle1"
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
