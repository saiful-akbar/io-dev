import { Box, Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import React from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import actionType from "src/reducer/actionType";

/**
 * Style
 */
const useStyles = makeStyles((theme) => ({
  hero: {
    display: "flex",
    justifyContent: "center",
  },
  heroBanner: {
    padding: theme.spacing(25, 0, 10, 0),
    minHeight: "70vh",
    width: "100%",
  },
  heroTitle: {
    color: theme.palette.text.tertiary,
    fontWeight: 400,
    lineHeight: "100%",
    fontSize: "7rem",
    [theme.breakpoints.down("lg")]: {
      fontSize: "6rem",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "5rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "4.5rem",
    },
  },
  heroDivider: {
    width: "100%",
    borderBottom: `2px solid ${theme.palette.text.tertiary}`,
  },
  textTertiary: {
    color: theme.palette.text.tertiary,
  },
  imageWrapper: {
    width: "100%",
    border: "1px solid white",
  },
  heroImage: {
    objectFit: "contain",
    maxWidth: "100%",
    maxHeight: 500,
  },
}));

/**
 * Animate variants
 */
const titleVariants = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
  },
};

const dividerVariants = {
  hidden: {
    opacity: 0,
    width: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    width: "100%",
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    width: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const imageVariants = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
  },
};

/**
 * Komponen utama
 * @param {Object} project
 * @returns
 */
const ProjectHero = ({ project }) => {
  const transition = { duration: 0.5, ease: "easeOut" };
  const classes = useStyles();
  const { ref, inView } = useInView();

  // redux
  const dispatch = useDispatch();
  const { header } = useSelector((state) => state.globalReducer);
  const { domRect } = useSelector((state) => state.workReducer);

  // destructering domRect
  const { banner } = domRect;

  // set warna header ketika element heri ada tau tidak dalam viewport
  React.useEffect(() => {
    const newHeader = header;

    if (inView) {
      newHeader.color = "light";
    } else {
      newHeader.color = "dark";
    }

    dispatch({
      type: actionType.setGlobalHeader,
      value: newHeader,
    });

    return () => {
      newHeader.color = "dark";
      dispatch({
        type: actionType.setGlobalHeader,
        value: newHeader,
      });
    };

    // eslint-disable-next-line
  }, [dispatch, inView]);

  return (
    <div className={classes.hero} ref={ref}>
      <motion.div
        style={{ backgroundColor: project.bannerColor }}
        className={classes.heroBanner}
        layoutId={project.slug}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ ...transition }}
        variants={{
          hidden: {
            borderRaius: 10,
            opacity: banner ? 1 : 0,
            y: banner ? Math.ceil(banner.top) : 100,
            width: banner ? Math.ceil(banner.right - banner.left) : "100%",
            height: banner ? Math.ceil(banner.bottom - banner.top) : "100%",
          },
          visible: {
            borderRaius: 0,
            opacity: 1,
            y: 0,
            width: "100%",
            height: "100%",
            transition: {
              staggerChildren: 0.02,
              duration: 0.5,
              ease: "easeOut",
              when: "beforeChildren",
            },
          },
          exit: {
            opacity: 0,
            transition: {
              when: "afterChildren",
            },
          },
        }}
      >
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <motion.h1
                className={classes.heroTitle}
                transition={transition}
                variants={titleVariants}
              >
                {project.name}
              </motion.h1>
            </Grid>

            <Grid item xs={12}>
              <Box my={10}>
                <motion.div
                  className={classes.heroDivider}
                  variants={dividerVariants}
                />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Grid container>
                <Grid item md={2} xs={4}>
                  <Typography
                    variant="subtitle1"
                    className={classes.textTertiary}
                    component={motion.div}
                    transition={transition}
                    variants={titleVariants}
                  >
                    Category :
                  </Typography>
                </Grid>
                <Grid item md={10} xs={8}>
                  <Typography
                    variant="body1"
                    className={classes.textTertiary}
                    component={motion.div}
                    transition={transition}
                    variants={titleVariants}
                  >
                    {project.category}
                  </Typography>
                </Grid>

                <Grid item md={2} xs={4}>
                  <Typography
                    variant="subtitle1"
                    className={classes.textTertiary}
                    component={motion.div}
                    transition={transition}
                    variants={titleVariants}
                  >
                    Tags :
                  </Typography>
                </Grid>
                <Grid item md={10} xs={8}>
                  <Typography
                    variant="body1"
                    className={classes.textTertiary}
                    component={motion.div}
                    transition={transition}
                    variants={titleVariants}
                  >
                    {project.tags.join(", ")}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Box my={10}>
                <motion.div
                  className={classes.heroDivider}
                  variants={dividerVariants}
                />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box
                style={{ width: "100%" }}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <motion.img
                  className={classes.heroImage}
                  src={project.heroImage}
                  variants={imageVariants}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </motion.div>
    </div>
  );
};

ProjectHero.propTypes = {
  project: PropTypes.object.isRequired,
};
ProjectHero.defaultProps = {
  project: {},
};

export default ProjectHero;
