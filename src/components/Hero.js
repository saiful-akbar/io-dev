import React from "react";
import PropTypes from "prop-types";
import styles from "src/styles/hero.module.scss";
import transition from "src/transition";
import { Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import TextMask from "./TextMask";

/**
 * Animasi variant
 *
 * @type {Object}
 */
const animateVariants = {
  hero: {
    // hero animate
    hidden: false,
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
    exit: {
      transition: {
        when: "afterChildren",
      },
    },
  },
  text: {
    // text animate
    hidden: {
      opacity: 0,
      y: "80%",
      skewY: 10,
    },
    show: {
      opacity: 1,
      y: 0,
      skewY: 0,
      transition,
    },
    exit: {
      opacity: 0,
    },
  },
  divider: {
    // divider animate
    hidden: {
      opacity: 0,
      scaleX: 0,
      originX: 0,
    },
    show: {
      opacity: 1,
      scaleX: 1,
      originX: 0,
      transition,
    },
    exit: {
      opacity: 0,
    },
  },
};

/**
 * komponen Hero
 *
 * @param  {String} {leftTitle, rightTitle}
 *
 * @return
 */
const Hero = ({ leftTitle, rightTitle, ...rest }) => (
  <motion.div
    variants={animateVariants.hero}
    initial="hidden"
    animate="show"
    exit="exit"
    id="hero"
  >
    <Grid container justifyContent="space-between" alignItems="flex-end">
      {/* text kiri || text utama */}
      <Grid item lg={10} xs={12} mb={3} className={styles.titleWrapper}>
        <Typography {...rest} component="h1" className={styles.title}>
          {leftTitle.split(" ").map((title, key) => (
            <TextMask variants={animateVariants.text} key={key}>
              {title}
            </TextMask>
          ))}
        </Typography>
      </Grid>
      {/* end text kiri || text utama */}

      {/* text kanan */}
      <Grid item lg={2} xs={12} mb={3}>
        <span className={styles.textMask}>
          <motion.span
            className={styles.version}
            variants={animateVariants.text}
          >
            {rightTitle}
          </motion.span>
        </span>
      </Grid>
      {/* end text kanan */}

      {/* divider */}
      <Grid item xs={12}>
        <motion.div
          className={styles.divider}
          variants={animateVariants.divider}
        />
      </Grid>
      {/* divider */}
    </Grid>
  </motion.div>
);

/**
 * prop type komponen Hero
 *
 * @type {Object}
 */
Hero.propTypes = {
  leftTitle: PropTypes.string.isRequired,
  rightTitle: PropTypes.string.isRequired,
};

export default Hero;