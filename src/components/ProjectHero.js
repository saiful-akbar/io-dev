import {
  Box, Container, Divider, Grid, Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import transition from 'src/transition';
import properCase from 'src/utils/properCase';

/**
 * Text animasi variants
 */
const textVariants = {
  hidden: {
    opacity: 0,
    y: '80%',
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
 * Image animasi variants
 */
const imageVariants = {
  hidden: {
    opacity: 0,
    y: '80%',
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
 * Divider animasi variants
 */
const dividerVariants = {
  hidden: {
    opacity: 0,
    originX: 0,
    scaleX: 0,
  },
  show: {
    opacity: 1,
    scaleX: 1,
    originX: 0,
    transition: {
      duration: 0.8,
      ease: transition.ease,
    },
  },
  exit: {
    opacity: 0,
  },
};

/**
 * Komponen utama ProjectHero
 *
 * @param {String} bannerColor
 * @param {String} image
 * @param {String} name
 * @param {String} category
 * @returns
 */
const ProjectHero = ({
  bannerColor,
  name,
  category,
  heroImage,
  year,
}) => {
  const ref = React.useRef(null);

  // redux
  const { sharedLayout } = useSelector((state) => state.workReducer);

  return (
    <Box
      id="project-hero"
      ref={ref}
      component={motion.div}
      initial="hidden"
      animate="show"
      exit="exit"
      variants={{
        hidden: {
          opacity: sharedLayout ? 1 : 0,
          y: sharedLayout ? 0 : 200,
        },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: sharedLayout ? 0 : transition.duration,
            ease: transition.ease,
            staggerChildren: 0.05,
            when: 'beforeChildren',
          },
        },
        exit: {
          opacity: 0,
          transition: {
            when: 'afterChildren',
          },
        },
      }}
      sx={{
        backgroundColor: bannerColor,
        width: '100%',
        minHeight: '100vh',
        pt: '25vh',
        pb: '20vh',
      }}
    >
      <Container maxWidth="md">
        <Grid container columnSpacing={{ xs: 0, md: 5 }} alignItems="flex-start">

          {/* left content */}
          <Grid item md={6} xs={12} container>

            {/* project name */}
            <Grid item xs={12}>
              <Typography
                component={motion.h1}
                sx={{
                  display: 'inline-block',
                  color: (theme) => theme.palette.text.lightPrimary,
                }}
              >
                {name.split(' ').map((nameValue, key) => (
                  <Typography
                    key={key}
                    variant="h1"
                    component="span"
                    sx={{
                      display: 'inline-block',
                      overflow: 'hidden',
                      paddingRight: '0.2em',
                      lineHeight: '100%',
                      fontSize: {
                        md: '4.5em',
                        sm: '4.3em',
                        xs: '4em',
                      },
                    }}
                  >
                    <motion.span variants={textVariants} style={{ display: 'inline-block' }}>
                      {properCase(nameValue)}
                    </motion.span>
                  </Typography>
                ))}
              </Typography>
            </Grid>
            {/* end project name */}

            <Grid item xs={12} my={5}>
              <Divider
                sx={{ borderColor: (theme) => theme.palette.text.lightDisabled }}
                component={motion.hr}
                variants={dividerVariants}
              />
            </Grid>

            {/* project hero detail */}
            <Grid item xs={12} container columnSpacing={3} alignItems="center">
              <Grid item xs={4} sx={{ overflow: 'hidden' }}>
                <Typography
                  variant="subtitle1"
                  component={motion.span}
                  variants={textVariants}
                  sx={{ display: 'inline-block', color: (theme) => theme.palette.text.lightSecondary }}
                >
                  Category :
                </Typography>
              </Grid>

              <Grid item xs={8} sx={{ overflow: 'hidden' }}>
                <Typography
                  variant="subtitle1"
                  component={motion.span}
                  variants={textVariants}
                  sx={{ display: 'inline-block', color: (theme) => theme.palette.text.lightPrimary }}
                >
                  {properCase(category)}
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={12} container columnSpacing={3} alignItems="center">
              <Grid item xs={4} sx={{ overflow: 'hidden' }}>
                <Typography
                  variant="subtitle1"
                  component={motion.span}
                  variants={textVariants}
                  sx={{ display: 'inline-block', color: (theme) => theme.palette.text.lightSecondary }}
                >
                  Year :
                </Typography>
              </Grid>

              <Grid item xs={8} sx={{ overflow: 'hidden' }}>
                <Typography
                  variant="subtitle1"
                  component={motion.span}
                  variants={textVariants}
                  sx={{ display: 'inline-block', color: (theme) => theme.palette.text.lightPrimary }}
                >
                  {year}
                </Typography>
              </Grid>
            </Grid>
            {/* end project hero detail */}

          </Grid>
          {/* end left content */}

          {/* right content */}
          <Grid
            item
            md={6}
            xs={12}
            sx={{
              overflow: 'hidden',
              display: 'flex',
              justifyContent: {
                lg: 'flex-end',
                xs: 'center',
              },
              marginTop: {
                md: 0,
                xs: 10,
              },
            }}
          >
            {/* hero image */}
            <Box
              boxShadow={3}
              src={heroImage}
              alt={name}
              component={motion.img}
              variants={imageVariants}
              sx={{
                m: 1,
                borderRadius: 3,
                maxWidth: '100%',
                maxHeight: 450,
                objectFit: 'cover',
              }}
            />
          </Grid>
          {/* end left content */}

        </Grid>
      </Container>
    </Box>
  );
};

ProjectHero.propTypes = {
  bannerColor: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  heroImage: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
};

export default ProjectHero;
