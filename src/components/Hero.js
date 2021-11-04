import React from "react";
import PropTypes from "prop-types";
import styles from "src/styles/hero.module.scss";
import transition from "src/transition";
import { Grid } from "@mui/material";
import { motion } from "framer-motion";
import TextMask from "./TextMask";

/**
 * hero animasi variants
 */
const heroVariants = {
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
};

/**
 * title animasi varian
 */
const titleVariants = {
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
};

/**
 * divider animasi variant
 */
const dividerVariants = {
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
};

/**
 * komponen utama
 * @param {Array} title
 * @returns
 */
const Hero = ({ leftTitle, rightTitle }) => (
  <motion.div
    variants={heroVariants}
    initial="hidden"
    animate="show"
    exit="exit"
  >
    <Grid container justifyContent="space-between" alignItems="flex-end">
      <Grid item lg={10} xs={12} mb={3} className={styles.titleWrapper}>
        <h1 className={styles.title}>
          {leftTitle.split(" ").map((title, key) => (
            <TextMask variants={titleVariants} key={key}>
              {title}
            </TextMask>
          ))}
        </h1>
      </Grid>

      <Grid item lg={2} xs={12} mb={3}>
        <span className={styles.textMask}>
          <motion.span className={styles.version} variants={titleVariants}>
            {rightTitle}
          </motion.span>
        </span>
      </Grid>

      <Grid item xs={12}>
        <motion.div className={styles.divider} variants={dividerVariants} />
      </Grid>
    </Grid>
  </motion.div>
);

Hero.propTypes = {
  leftTitle: PropTypes.string.isRequired,
  rightTitle: PropTypes.string.isRequired,
};

export default Hero;