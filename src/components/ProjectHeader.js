import { Box, Icon } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import PropTypes from 'prop-types';
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
const headerVariants = {
  hidden: {
    opacity: 0,
    y: 150,
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
 * @param {String} url
 * @returns
 */
const ProjectHeader = ({ url }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { text } = theme.palette;

  // state
  const [inView, setInView] = React.useState(true);

  // set inView ketika element ProjectHero ada atau tidak dalan viewport saat di-scroll
  const handleInViewOnScroll = React.useCallback(() => {
    const projectHeroEl = document.querySelector('#project-hero');

    if (projectHeroEl) {
      const { bottom } = projectHeroEl.getBoundingClientRect();
      if (bottom <= 60) {
        setInView(false);
      } else {
        setInView(true);
      }
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

  // render komponen
  return (
    <>
      <Link href="/" scroll={false}>
        <a>
          <Box
            component={motion.img}
            boxShadow={2}
            src="/images/logo/logo-dark.png"
            alt="logo"
            onHoverStart={() => handleCursorHover(true)}
            onHoverEnd={() => handleCursorHover(false)}
            initial="hidden"
            animate="show"
            exit="exit"
            variants={headerVariants}
            sx={{
              zIndex: 2000,
              objectFit: 'contain',
              width: {
                lg: 60,
                xs: 50,
              },
              height: {
                lg: 60,
                xs: 50,
              },
              position: {
                lg: 'fixed',
                xs: 'absolute',
              },
              top: {
                lg: 60,
                xs: 15,
              },
              left: {
                lg: 60,
                xs: 25,
              },
            }}
          />
        </a>
      </Link>

      <Box
        component={motion.div}
        initial="hidden"
        animate="show"
        exit="exit"
        variants={headerVariants}
        sx={{
          zIndex: 2000,
          display: 'flex',
          flexDirection: {
            lg: 'column',
            xs: 'row',
          },
          position: {
            lg: 'fixed',
            xs: 'absolute',
          },
          top: {
            lg: 60,
            xs: 15,
          },
          right: {
            lg: 60,
            xs: 25,
          },
        }}
      >
        <Link href="/" scroll={false}>
          <a>
            <Box
              layout
              component={motion.div}
              transition={transition}
              onHoverStart={() => handleCursorHover(true)}
              onHoverEnd={() => handleCursorHover(false)}
              whileHover={{
                backgroundColor:
                  inView
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(0, 0, 0, 0.1)',
              }}
              sx={{
                borderRadius: 3,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 1.5,
                marginBottom: {
                  lg: 2,
                  xs: 0,
                },
                marginRight: {
                  lg: 0,
                  xs: 2,
                },
                border: `1px solid ${inView ? text.lightDisabled : text.disabled}`,
              }}
            >
              <Icon
                sx={{
                  color: inView ? text.lightPrimary : text.primary,
                }}
              >
                west
              </Icon>
            </Box>
          </a>
        </Link>

        <Box
          layout
          href={url}
          target="_blank"
          rel="noreferrer"
          component={motion.a}
          transition={transition}
          onHoverStart={() => handleCursorHover(true)}
          onHoverEnd={() => handleCursorHover(false)}
          whileHover={{
            backgroundColor:
              inView
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.1)',
          }}
          sx={{
            borderRadius: 3,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 1.5,
            border: `1px solid ${inView ? text.lightDisabled : text.disabled}`,
          }}
        >
          <Icon
            sx={{
              color: inView ? text.lightPrimary : text.primary,
            }}
          >
            north_east
          </Icon>
        </Box>
      </Box>
    </>
  );
};

ProjectHeader.propTypes = {
  url: PropTypes.string.isRequired,
};

export default ProjectHeader;
