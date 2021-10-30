import { Box, Icon } from '@mui/material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import actionType from 'src/redux/actionType';
import styles from 'src/styles/project-card.module.scss';
import transition from 'src/transition';

/**
 * animasi variant
 */
const rootVariants = {
  hidden: false,
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
  exit: {
    transition: {
      when: 'afterChildren',
      staggerChildren: 5,
    },
  },
};

const titleVariants = {
  hidden: {
    opacity: 0,
    y: '100%',
    transition,
  },
  show: {
    opacity: 1,
    y: 0,
    transition,
  },
  exit: {
    opacity: 0,
  },
};

const imageVariants = {
  hidden: {
    opacity: 0,
    y: '10vh',
  },
  show: {
    opacity: 1,
    y: 0,
    transition,
  },
  exit: {
    opacity: 0,
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
  bannerColor, image, name, category, year, slug, ...rest
}) => {
  const ref = useRef(null);
  const router = useRouter();

  // redux
  const dispatch = useDispatch();

  // state
  const [show, setShow] = useState(false);
  const [exit, setExit] = useState({
    opacity: 0,
  });

  // fungsi untuk menampilkan text ketika seluruh elemen ada dalam viewport
  const handleShowTextOnScroll = React.useCallback(
    () => {
      const { top, height } = ref.current.getBoundingClientRect();
      const diffTop = window.innerHeight - height;

      if (top < diffTop) {
        return setShow(true);
      }

      return setShow(false);
    },
    [ref, setShow],
  );

  // handle viewport scroll
  useEffect(() => {
    window.addEventListener('scroll', handleShowTextOnScroll);

    return () => {
      window.removeEventListener('scroll', handleShowTextOnScroll);
    };
  }, [handleShowTextOnScroll]);

  // set value state cursorHover ketika element di hover
  const handleHover = (isHover) => {
    dispatch({
      type: actionType.setGlobalCursorHover,
      value: isHover,
    });
  };

  // handle click card
  const handleClick = () => {
    const { top, left } = ref.current.getBoundingClientRect();
    setExit({
      opacity: 1,
      y: -top,
      x: -left,
      height: window.innerHeight,
      width: window.innerWidth,
      borderRadius: 0,
      transition: {
        duration: 0.6,
        ease: transition.ease,
        width: {
          duration: 0.6,
          ease: transition.ease,
          delay: 0.6 / 3,
        },
        x: {
          duration: 0.6,
          ease: transition.ease,
          delay: 0.6 / 3,
        },
      },
    });

    // set redux state workReducer sharedLayout
    dispatch({
      type: actionType.setWorkSharedLayout,
      value: true,
    });

    // push ke halaman project detail
    router.push(`/project/${slug}`, undefined, { scroll: false });
  };

  return (
    <motion.div
      {...rest}
      className={styles.root}
      variants={rootVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      ref={ref}
      onClick={handleClick}
    >
      <Box
        component={motion.div}
        boxShadow={3}
        style={{ backgroundColor: bannerColor }}
        className={styles.banner}
        onHoverStart={() => handleHover(true)}
        onHoverEnd={() => handleHover(false)}
        whileHover={{ scale: 1.03 }}
        transition={{ ...transition }}
        initial="hidden"
        animate="show"
        exit="exit"
        variants={{
          hidden: {
            opacity: 0,
            y: '10vh',
            scale: 1,
          },
          show: {
            opacity: 1,
            y: 1,
            transition,
          },
          exit: {
            ...exit,
          },
        }}
      />

      <Box
        boxShadow={3}
        component={motion.img}
        src={image}
        alt={name}
        className={styles.image}
        variants={imageVariants}
        sx={{ borderRadius: 5 }}
      />

      <div className={styles.topText} data-show={show}>
        <span className={styles.textMask}>
          <motion.span
            variants={titleVariants}
            initial="hidden"
            animate={show ? 'show' : 'hidden'}
            exit="exit"
          >
            {name}
          </motion.span>
        </span>

        <span className={styles.textMask}>
          <motion.span
            variants={titleVariants}
            initial="hidden"
            animate={show ? 'show' : 'hidden'}
            exit="exit"
          >
            <Icon>east</Icon>
          </motion.span>
        </span>
      </div>

      <div className={styles.bottomText}>
        <span className={styles.textMask}>
          <motion.span
            variants={titleVariants}
            initial="hidden"
            animate={show ? 'show' : 'hidden'}
            exit="exit"
          >
            {category}
          </motion.span>
        </span>

        <span className={styles.textMask}>
          <motion.span
            variants={titleVariants}
            initial="hidden"
            animate={show ? 'show' : 'hidden'}
            exit="exit"
          >
            {year}
          </motion.span>
        </span>
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
  slug: PropTypes.string.isRequired,
};

export default ProjectCard;
