import { Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React from 'react';
import styles from 'src/styles/hero.module.scss';
import transition from 'src/transition';

/**
 * animasi variants
 */
const heroVariants = {
  hidden: false,
  show: {
    transition: {
      staggerChildren: 0.02,
    },
  },
  exit: {
    transition: {
      when: 'afterChildren',
    },
  },
};

const titleVariants = {
  hidden: {
    opacity: 0,
    y: 130,
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
    transition,
  },
};

const dividerVariants = {
  hidden: {
    opacity: 0,
    width: 0,
  },
  show: {
    opacity: 1,
    width: '100%',
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
 * komponen utama
 * @param {Array} title
 * @returns
 */
const Hero = ({ leftTitle, rightTitle }) => (
  <motion.div
    className={styles.root}
    variants={heroVariants}
    initial="hidden"
    animate="show"
    exit="exit"
  >
    <Grid
      container
      justifyContent="space-between"
      alignItems="flex-end"
    >
      <Grid item lg={10} xs={12} mb={3} className={styles.titleWrapper}>
        <Typography
          className={styles.title}
          component={motion.h1}
          variants={titleVariants}
        >
          {leftTitle}
        </Typography>
      </Grid>

      <Grid item lg={2} xs={12} mb={3}>
        <Typography
          noWrap
          component={motion.div}
          className={styles.version}
          variants={titleVariants}
        >
          {rightTitle}
        </Typography>
      </Grid>

      <Grid item xs={12} mt={15}>
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
