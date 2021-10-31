import { Box, Icon } from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';
import { useDispatch } from 'react-redux';
import actionType from 'src/redux/actionType';
import transition from 'src/transition';
import { useTheme } from '@mui/material/styles';

/**
 * Animasi varian
 */
/**
 * animasi varian
 */
const rootVariants = {
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
 * Komponen utama ProjectHeader
 *
 * @returns
 */
const ScrollToTop = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { text } = theme.palette;

  // state
  const [inView, setInView] = React.useState(false);
  const [show, setShow] = React.useState(true);

  // set inView ketika element ProjectHero ada atau tidak dalan viewport saat di-scroll
  const handleInViewOnScroll = React.useCallback(() => {
    const projectHeroEl = document.querySelector('#project-hero');
    const topEl = document.querySelector('#top');

    // cek element #top
    if (topEl) {
      const topElRect = topEl.getBoundingClientRect();
      if (topElRect.top < -10) {
        setShow(true);
      } else {
        setShow(false);
      }
    } else {
      setShow(true);
    }

    // cek element project hero
    if (projectHeroEl) {
      const { bottom } = projectHeroEl.getBoundingClientRect();
      if (bottom <= window.innerHeight - 50) {
        setInView(false);
      } else {
        setInView(true);
      }
    } else {
      setInView(false);
    }
  }, [setInView]);

  // jalankan fungsi handleInViewOnScroll saat viewport di-scroll
  React.useEffect(() => {
    window.addEventListener('scroll', handleInViewOnScroll);

    return () => {
      window.removeEventListener('scroll', handleInViewOnScroll);
    };
  }, [handleInViewOnScroll]);

  // ubah state cussorHover menjadi tru ketika komponen di hover
  const handleCursorHover = (value) => {
    dispatch({
      type: actionType.setGlobalCursorHover,
      value,
    });
  };

  // handle scroll to top
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  // render komponen
  return (
    <Box
      onTap={handleScrollToTop}
      component={motion.div}
      transition={transition}
      onHoverStart={() => handleCursorHover(true)}
      onHoverEnd={() => handleCursorHover(false)}
      initial="hidden"
      animate={show ? 'show' : 'hidden'}
      exit="exit"
      variants={rootVariants}
      whileHover={{
        scale: 1.3,
        backgroundColor: inView ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      }}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '100%',
        border: `1px solid ${inView ? text.lightDisabled : text.disabled}`,
        padding: 1.5,
        zIndex: 2000,
        position: 'fixed',
        bottom: {
          lg: 60,
          xs: 15,
        },
        right: {
          lg: 60,
          xs: 25,
        },
      }}
    >
      <Icon
        sx={{
          color: inView ? text.lightPrimary : text.primary,
        }}
      >
        north
      </Icon>
    </Box>
  );
};

export default ScrollToTop;
