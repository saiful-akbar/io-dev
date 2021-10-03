import { Box, Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import React from "react";

/**
 * Style
 */
/**
 * Style
 */
const useStyles = makeStyles((theme) => ({
  hero: {
    minHeight: "100vh",
    padding: theme.spacing(20, 0, 5, 0),
  },
  heroTitle: {
    color: theme.palette.text.tertiary,
    fontWeight: 400,
    lineHeight: "100%",
    fontSize: "6rem",
    [theme.breakpoints.down("md")]: {
      fontSize: "5rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "4rem",
    },
  },
  heroDivider: {
    width: "100%",
    borderBottom: `3px solid ${theme.palette.text.tertiary}`,
  },
  textTertiary: {
    color: theme.palette.text.tertiary,
  },
}));

/**
 * Animate variants
 */
const heroVariants = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
};

const titleVariants = {
  hidden: {
    opacity: 0,
    y: 100,
    skewY: 5,
  },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const dividerVariants = {
  hidden: {
    opacity: 0,
    width: 0,
  },
  visible: {
    opacity: 1,
    width: "100%",
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    width: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

/**
 * Komponen utama
 * @param {Object} project
 * @returns
 */
const HeroProject = ({ project }) => {
  const transition = { duration: 0.5, ease: "easeOut" };

  const classes = useStyles();

  return (
    <motion.div
      className={classes.hero}
      variants={heroVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ ...transition }}
      layoutId={`banner_${project.slug}`}
      style={{ backgroundColor: project.bannerColor }}
    >
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <motion.h1 className={classes.heroTitle} variants={titleVariants}>
              {project.name}
            </motion.h1>
          </Grid>

          <Grid item xs={12}>
            <Box my={10}>
              <motion.div variants={dividerVariants}>
                <div className={classes.heroDivider} />
              </motion.div>
            </Box>
          </Grid>

          <Grid item lg={10} xs={12}>
            <Grid container spacing={1}>
              <Grid item md={2} xs={3}>
                <Typography
                  variant="body1"
                  className={classes.textTertiary}
                  component={motion.h6}
                  variants={titleVariants}
                >
                  Category :
                </Typography>
              </Grid>
              <Grid item md={10} xs={9}>
                <Typography
                  variant="body1"
                  className={classes.textTertiary}
                  component={motion.h6}
                  variants={titleVariants}
                >
                  {project.category}
                </Typography>
              </Grid>

              <Grid item md={2} xs={3}>
                <Typography
                  variant="body1"
                  className={classes.textTertiary}
                  component={motion.h6}
                  variants={titleVariants}
                >
                  Tags :
                </Typography>
              </Grid>
              <Grid item md={10} xs={9}>
                <Typography
                  variant="body1"
                  className={classes.textTertiary}
                  component={motion.h6}
                  variants={titleVariants}
                >
                  {project.tags.join(", ")}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </motion.div>
  );
};

HeroProject.propTypes = {
  project: PropTypes.object.isRequired,
};
HeroProject.defaultProps = {
  project: {},
};

export default HeroProject;
