import { Box, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React from 'react';
import styles from 'src/styles/hero.module.scss';
import transition from 'src/transition';

/**
 * animasi variants
 */
const heroVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.02,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
    },
  },
};

const titleVariants = {
  hidden: {
    opacity: 0,
    y: 100,
    skewY: 15,
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
  },
};

/**
 * komponen utama
 * @param {Array} title
 * @returns
 */
const Hero = ({ leftTitle, rightTitle }) => (
  <Box
    pt={20}
    component={motion.div}
    variants={heroVariants}
    initial="hidden"
    animate="show"
    exit="exit"
  >
    <Grid
      container
      spacing={3}
      justifyContent="space-between"
      alignItems="flex-end"
    >
      <Grid item lg={10} xs={12} className={styles.titleWrapper}>
        {leftTitle.map((text, key) => (
          <Typography
            key={key}
            className={styles.title}
            component={motion.h1}
            variants={titleVariants}
          >
            {text}
          </Typography>
        ))}
      </Grid>

      <Grid item lg={2} xs={12}>
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
  </Box>
);

Hero.propTypes = {
  leftTitle: PropTypes.array.isRequired,
  rightTitle: PropTypes.string.isRequired,
};

export default Hero;
