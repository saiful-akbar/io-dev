import { Divider, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

/**
 * Style
 */
const useStyles = makeStyles((theme) => ({
  hero: {
    paddingBottom: theme.spacing(10),
  },
  heroTitle: {
    fontWeight: 500,
    lineHeight: "100%",
    fontSize: "9rem",
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
    borderWidth: "2px !important",
    borderColor: `${theme.palette.text.primary} !important`,
    marginTop: `${theme.spacing(15)} !important`,
  },
}));

// animation variants
const heroVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.01,
    },
  },
  exit: {
    opacity: 0,
    duration: 0.5,
    ease: "easeOut",
    staggerChildren: 0.01,
  },
};

const titleVariants = {
  hidden: {
    opacity: 0,
    y: 150,
    skewY: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -150,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
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
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    width: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

/**
 * Komponen utama
 * @param {String} title
 * @returns
 */
const Hero = ({ title }) => {
  const classes = useStyles();

  // redux
  const { appVersion } = useSelector((state) => state.globalReducer);

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
          <motion.h4 variants={titleVariants}>{appVersion}</motion.h4>
        </Grid>

        <Grid item xs={12}>
          <motion.div variants={dividerVariants}>
            <Divider className={classes.heroDivider} />
          </motion.div>
        </Grid>
      </Grid>
    </motion.div>
  );
};

Hero.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Hero;
