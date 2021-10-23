import React from 'react';
import PropTypes from 'prop-types';
import styles from 'src/styles/project-card.module.scss';
import { Box, Icon } from '@mui/material';
import { useDispatch } from 'react-redux';
import actionType from 'src/redux/actionType';
import { motion } from 'framer-motion';
import transition from 'src/transition';

/**
 * animasi variant
 */
const rootVariants = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ...transition,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      ...transition,
    },
  },
};

/**
 * komponen utama
 * @param {String} bannerColor
 * @param {String} image
 * @param {String} name
 * @param {String} category
 * @param {String} year
 * @returns
 */
const ProjectCard = ({
  bannerColor,
  image,
  name,
  category,
  year,
}) => {
  // redux
  const dispatch = useDispatch();

  // kembalihan cursor hover ke false
  const handleHover = (isHover) => {
    dispatch({
      type: actionType.setGlobalCursorHover,
      value: isHover,
    });
  };

  return (
    <motion.div
      className={styles.root}
      variants={rootVariants}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <Box
        boxShadow={3}
        style={{ backgroundColor: bannerColor }}
        className={styles.banner}
        component={motion.div}
        onHoverStart={() => handleHover(true)}
        onHoverEnd={() => handleHover(false)}
        whileHover={{ scale: 1.03 }}
        transition={{ ...transition }}

      />

      <img
        src={image}
        alt={name}
        className={styles.image}
      />

      <div className={styles.topText}>
        <div>{name}</div>
        <Icon>east</Icon>
      </div>

      <div className={styles.bottomText}>
        <div>{category}</div>
        <div>{year}</div>
      </div>
    </motion.div>
  );
};

ProjectCard.propTypes = {
  bannerColor: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
};

export default ProjectCard;
