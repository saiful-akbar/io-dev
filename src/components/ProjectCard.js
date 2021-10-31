import { Box, Icon } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import actionType from 'src/redux/actionType';
import transition from 'src/transition';

const useStyles = makeStyles(() => ({
  textMask: {
    display: 'inline-block',
    verticalAlign: 'center',
    overflow: 'hidden',
    '& span': {
      display: 'inline-block',
    },
  },
}));

/**
 * animasi variant
 */
const rootVariants = {
  hidden: false,
  show: {
    transition: {
      staggerChildren: 0.05,
      when: 'beforeChildren',
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      when: 'afterChildren',
    },
  },
};

const titleVariants = {
  hidden: {
    opacity: 0,
    y: '100%',
    transition: {
      duration: transition.duration / 2,
      ease: transition.ease,
    },
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: transition.duration / 2,
      ease: transition.ease,
    },
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
  const router = useRouter();
  const ref = React.useRef();
  const classes = useStyles();

  // redux
  const dispatch = useDispatch();

  // state
  const [show, setShow] = React.useState(false);
  const [animateExit, setAnimateExit] = React.useState({ opacity: 0 });

  // fungsi untuk menampilkan text ketika seluruh elemen ada dalam viewport
  const handleShowTextOnScroll = React.useCallback(() => {
    const {
      top,
      height,
    } = ref.current.getBoundingClientRect();

    const diffTop = window.innerHeight - height;

    if (top < diffTop) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [ref, setShow]);

  // handle viewport scroll
  React.useEffect(() => {
    window.addEventListener('scroll', handleShowTextOnScroll);

    return () => {
      window.removeEventListener('scroll', handleShowTextOnScroll);
    };
  }, [handleShowTextOnScroll]);

  // set value state cursorHover ketika element di hover
  const handleCursorHover = (isHover) => {
    dispatch({
      type: actionType.setGlobalCursorHover,
      value: isHover,
    });
  };

  // handle click card
  const handleTap = (event) => {
    const domRect = event.target.getBoundingClientRect();

    setAnimateExit({
      borderRadius: 0,
      opacity: 1,
      y: -domRect.top,
      x: -domRect.left,
      height: window.innerHeight,
      width: window.innerWidth,
      transition: {
        ...transition,
        y: {
          ...transition,
          delay: transition.duration / 4,
        },
        height: {
          ...transition,
          delay: transition.duration / 4,
        },
      },
    });

    // set redux state workReducer sharedLayout
    dispatch({
      type: actionType.setWorkSharedLayout,
      value: true,
    });

    // push ke halaman project detail
    router.push(`/project/${slug}`, undefined, {
      scroll: false,
    });
  };

  return (
    <Box
      {...rest}
      component={motion.div}
      ref={ref}
      variants={rootVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      onTap={handleTap}
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: {
          md: 460,
          xs: 400,
        },
      }}
    >

      {/* banner */}
      <Box
        boxShadow={3}
        component={motion.div}
        onHoverStart={() => handleCursorHover(true)}
        onHoverEnd={() => handleCursorHover(false)}
        transition={transition}
        initial="hidden"
        animate="show"
        exit="exit"
        whileHover={{ scale: 1.03 }}
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
          exit: animateExit,
        }}
        sx={{
          backgroundColor: bannerColor,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: 3,
          overflow: 'hidden',
        }}
      />

      {/* Image */}
      <Box
        boxShadow={3}
        component={motion.img}
        variants={imageVariants}
        src={image}
        alt={name}
        loading="eager"
        sx={{
          objectFit: 'contain',
          maxWidth: '80%',
          maxHeight: '65%',
          pointerEvents: 'none',
          position: 'absolute',
          borderRadius: '10px',
        }}
      />

      {/* Top text */}
      <Box
        sx={{
          position: 'absolute',
          top: 30,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#fff',
          fontSize: 17,
          fontWeight: 500,
          padding: '0 35px',
          pointerEvents: 'none',
        }}
      >
        <span className={classes.textMask}>
          <motion.span
            variants={titleVariants}
            initial="hidden"
            animate={show ? 'show' : 'hidden'}
            exit="exit"
          >
            {name}
          </motion.span>
        </span>

        <span className={classes.textMask}>
          <motion.span
            variants={titleVariants}
            initial="hidden"
            animate={show ? 'show' : 'hidden'}
            exit="exit"
          >
            <Icon>east</Icon>
          </motion.span>
        </span>
      </Box>
      {/* End top text */}

      {/* Bottom text */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 30,
          width: '100%',
          display: {
            md: 'flex',
            xs: 'none',
          },
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#fff',
          fontSize: 13,
          fontWeight: 500,
          padding: '0 35px',
          pointerEvents: 'none',
        }}
      >
        <span className={classes.textMask}>
          <motion.span
            variants={titleVariants}
            initial="hidden"
            animate={show ? 'show' : 'hidden'}
            exit="exit"
          >
            {category}
          </motion.span>
        </span>

        <span className={classes.textMask}>
          <motion.span
            variants={titleVariants}
            initial="hidden"
            animate={show ? 'show' : 'hidden'}
            exit="exit"
          >
            {year}
          </motion.span>
        </span>
      </Box>
      {/* End bottom text */}

    </Box>
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
