import React from "react";
import PropTypes from "prop-types";
import styles from "src/styles/projectHero.module.scss";
import { Grid, Box, Container, Divider, Typography } from "@mui/material";
import transition from "src/transition";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import TextMask from "src/components/TextMask";

/**
 * Animasi variants
 */
const animateVariants = {
  text: {
    hidden: {
      opacity: 0,
      y: "80%",
    },
    show: {
      opacity: 1,
      y: 0,
      transition,
    },
    exit: {
      opacity: 0,
    },
  },
  divider: {
    hidden: {
      opacity: 0,
      scaleX: 0,
      originX: 0,
    },
    show: {
      opacity: 1,
      originX: 0,
      scaleX: 1,
      transition,
    },
    exit: {
      opacity: 0,
    },
  },
  image: {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: transition.ease,
      },
    },
    exit: {
      opacity: 0,
    },
  },
};

/**
 * Komponen utama ProjectHero
 *
 * @param  {Object} project Data project
 * @return {React Node}
 */
const ProjectHero = ({ data }) => {
  const { bannerColor, heroImage, name, category, year } = data;

  // redux state
  const { sharedLayout } = useSelector((state) => state.projectReducer);

  return (
    <Box
      className={styles.root}
      component={motion.div}
      initial="hidden"
      animate="show"
      exit="exit"
      variants={{
        hidden: {
          opacity: sharedLayout ? 1 : 0,
        },
        show: {
          opacity: 1,
          transition: {
            ...transition,
            when: "beforeChildren",
            staggerChildren: 0.05,
          },
        },
        exit: {
          opacity: 0,
        },
      }}
      sx={{
        backgroundImage: `linear-gradient(to bottom right, ${bannerColor.primary}, ${bannerColor.secondary})`,
      }}
    >
      <Container maxWidth="md">
        <Grid
          container
          spacing={3}
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Left content */}
          <Grid item md={6} xs={12} container spacing={3}>
            <Grid item xs={12}>
              <Typography
                component={motion.h1}
                variant="h1"
                className={styles.title}
              >
                {name.split(" ").map((text, key) => (
                  <TextMask variants={animateVariants.text} key={key}>
                    {text}
                  </TextMask>
                ))}
              </Typography>
            </Grid>

            <Grid item xs={12} my={5}>
              <Divider
                sx={{ borderColor: (theme) => theme.palette.text.lightPrimary }}
                component={motion.hr}
                variants={animateVariants.divider}
              />
            </Grid>

            <Grid item xs={12} container spacing={1}>
              <Grid item xs={4}>
                <Typography variant="subtitle1">
                  <TextMask
                    className={styles.subTitle}
                    variants={animateVariants.text}
                  >
                    Category :
                  </TextMask>
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1">
                  <TextMask
                    className={styles.subValue}
                    variants={animateVariants.text}
                  >
                    {category}
                  </TextMask>
                </Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography variant="subtitle1">
                  <TextMask
                    className={styles.subTitle}
                    variants={animateVariants.text}
                  >
                    Year :
                  </TextMask>
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2">
                  <TextMask
                    className={styles.subValue}
                    variants={animateVariants.text}
                  >
                    {year}
                  </TextMask>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* End left content */}

          {/* Right content */}
          <Grid item md={6} xs={12} className={styles.imageWrapper}>
            <Box
              component={motion.img}
              src={heroImage}
              alt={name}
              loading="eager"
              className={styles.heroImage}
              boxShadow={7}
              variants={animateVariants.image}
            />
          </Grid>
          {/* End right content */}
        </Grid>
      </Container>
    </Box>
  );
};

/**
 * Prop types komponen ProjectHero
 *
 * @type {Object}
 */
ProjectHero.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ProjectHero;
