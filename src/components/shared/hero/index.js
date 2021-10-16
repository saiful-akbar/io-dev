import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import React from "react";
import { transition } from "src/utils/animate";

/**
 * Style
 */
const useStyles = makeStyles((theme) => ({
  hero: {
    paddingBottom: theme.spacing(15),
  },
  heroTitle: {
    fontWeight: 500,
    lineHeight: "100%",
    fontSize: "9.5rem",
    [theme.breakpoints.down("md")]: {
      fontSize: "8rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "6rem",
    },
  },
  heroVersion: {
    display: "flex",
    alignItems: "flex-end",
    paddingBottom: 13,
  },
  heroDivider: {
    width: "100%",
    borderBottom: `3px solid ${theme.palette.text.primary}`,
    marginTop: "15vh",
    [theme.breakpoints.down("md")]: {
      marginTop: "10vh",
    },
  },
}));

/**
 * animasi varian
 */
const heroVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      ...transition,
      staggerChildren: 0.02,
    },
  },
  exit: {
    opacity: 0,
    transition,
  },
};

const titleVariants = {
  hidden: {
    opacity: 0,
    y: "30vh",
    skewY: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: {
      ...transition,
    },
  },
  exit: {
    opacity: 0,
    transition,
  },
};

const dividerVariants = {
  hidden: {
    opacity: 0,
    width: 0,
  },
  visible: {
    opacity: 1,
    width: "100%",
    transition: {
      duration: 1,
      ease: transition.ease,
    },
  },
  exit: {
    opacity: 0,
    width: 0,
    transition,
  },
};

/**
 * Komponen utama
 * @param {String} title
 * @returns
 */
const Hero = ({ title }) => {
  const classes = useStyles();

  // render
  return (
    <motion.div
      className={classes.hero}
      variants={heroVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Grid container spacing={2}>
        <Grid item lg={10} xs={12}>
          <motion.h1 className={classes.heroTitle} variants={titleVariants}>
            {title}
          </motion.h1>
        </Grid>

        <Grid item lg={2} xs={12} className={classes.heroVersion}>
          <motion.h5 variants={titleVariants}>
            v{process.env.REACT_APP_VERSION}
          </motion.h5>
        </Grid>

        <Grid item xs={12}>
          <motion.div
            className={classes.heroDivider}
            variants={dividerVariants}
          />
        </Grid>
      </Grid>
    </motion.div>
  );
};

Hero.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Hero;
