import { Box, Container, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import React from "react";
import { InView } from "react-intersection-observer";
import styles from "src/styles/projectContent.module.scss";
import transition from "src/transition";

/**
 * Animasi variant
 */
const animateVariants = {
  root: {
    hidden: {
      opacity: 0,
      y: 150,
      transition,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        ...transition,
        when: "beforeChildren",
      },
    },
    exit: {
      opacity: 0,
    },
  },
  text: {
    hidden: {
      opacity: 0,
      transition: {
        duration: 1,
        ease: transition.ease,
      },
    },
    show: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: transition.ease,
      },
    },
    exit: {
      opacity: 0,
    },
  },
  image: {
    hidden: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 1,
        ease: transition.ease,
      },
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
 * Kompoenn utama ProjectContent
 *
 * @param {Object} data
 * @returns
 */
const ProjectContent = ({ data, color, ...rest }) => {
  const { title, description, subDescription, images } = data;

  return (
    <Box
      {...rest}
      className={styles.root}
      mt={10}
      component={motion.div}
      initial="hidden"
      animate="show"
      exit="exit"
      variants={animateVariants.root}
    >
      <Container maxWidth="sm">
        <Grid container spacing={3}>
          <Grid item xs={12} mb={3}>
            <InView triggerOnce>
              {({ inView, ref }) => (
                <Typography
                  ref={ref}
                  variant="subtitle2"
                  component={motion.h6}
                  initial="hidden"
                  animate={inView ? "show" : "hidden"}
                  exit="exit"
                  variants={animateVariants.text}
                  sx={{ color }}
                >
                  _{title}
                </Typography>
              )}
            </InView>
          </Grid>

          {description !== null && (
            <Grid item xs={12}>
              <InView triggerOnce>
                {({ inView, ref }) => (
                  <Typography
                    ref={ref}
                    variant="body1"
                    color="textPrimary"
                    component={motion.p}
                    initial="hidden"
                    animate={inView ? "show" : "hidden"}
                    exit="exit"
                    variants={animateVariants.text}
                    sx={{ fontSize: { md: 23, xs: 19 } }}
                  >
                    {description}
                  </Typography>
                )}
              </InView>
            </Grid>
          )}

          {subDescription !== null && (
            <Grid item xs={12}>
              <InView triggerOnce>
                {({ inView, ref }) => (
                  <Typography
                    ref={ref}
                    variant="body2"
                    color="textSecondary"
                    component={motion.p}
                    initial="hidden"
                    animate={inView ? "show" : "hidden"}
                    exit="exit"
                    variants={animateVariants.text}
                  >
                    {subDescription}
                  </Typography>
                )}
              </InView>
            </Grid>
          )}
        </Grid>
      </Container>

      {images.length > 0 &&
        images.map((img, key) => {
          if (img.orientation === "horizontal") {
            return (
              <div key={key} className={styles.horizontal}>
                {img.src.map((src) => (
                  <div key={src} className={styles.imageWrapper}>
                    <InView triggerOnce>
                      {({ inView, ref }) => (
                        <motion.img
                          ref={ref}
                          src={src}
                          alt={title}
                          loading="lazy"
                          className={styles.image}
                          initial="hidden"
                          animate={inView ? "show" : "hidden"}
                          exit="exit"
                          variants={animateVariants.image}
                        />
                      )}
                    </InView>
                  </div>
                ))}
              </div>
            );
          }

          return (
            <Container maxWidth="md" key={key}>
              <Grid
                container
                justifyContent="space-around"
                alignItems="flex-start"
                mt={8}
                rowSpacing={5}
                columnSpacing={{ xs: 1, md: img.src.length > 1 ? 7 : 1 }}
              >
                {img.src.map((src, key) => (
                  <Grid
                    item
                    md={img.src.length > 1 ? 6 : 12}
                    xs={12}
                    key={src}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mt: {
                        md: key % 2 !== 0 ? 10 : 0,
                      },
                      mb: {
                        md: 0,
                        xs: 3,
                      },
                    }}
                  >
                    <InView triggerOnce>
                      {({ inView, ref }) => (
                        <Box
                          ref={ref}
                          boxShadow={7}
                          component={motion.img}
                          src={src}
                          alt={title}
                          loading="lazy"
                          className={styles.imageVertical}
                          initial="hidden"
                          animate={inView ? "show" : "hidden"}
                          exit="exit"
                          variants={animateVariants.image}
                        />
                      )}
                    </InView>
                  </Grid>
                ))}
              </Grid>
            </Container>
          );
        })}

      <Box mt={10} sx={{ borderBottom: 1, borderColor: "divider" }} />
    </Box>
  );
};

ProjectContent.propTypes = {
  data: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
};

export default ProjectContent;
