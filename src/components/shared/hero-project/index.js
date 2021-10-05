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
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  heroBanner: {
    padding: theme.spacing(20, 0, 10, 0),
    minHeight: "100vh",
    width: "100%",
  },
  heroTitle: {
    color: theme.palette.text.tertiary,
    fontWeight: 400,
    lineHeight: "100%",
    fontSize: "6rem",
    [theme.breakpoints.down("lg")]: {
      fontSize: "5rem",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "4rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "3rem",
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
    y: -50,
    transition: {
      duration: 0.5,
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
  const { ref, inView } = useInView();

  // redux
  const dispatch = useDispatch();
  const { domRect } = useSelector((state) => state.workReducer);
  const { header } = useSelector((state) => state.globalReducer);

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
            borderRadius: 6,
            opacity: domRect.top ? 1 : 0,
            y: domRect.top ? Math.ceil(domRect.top) : 250,
            width:
              domRect.right && domRect.left
                ? Math.ceil(domRect.right - domRect.left)
                : "100%",
            minHeight:
              domRect.bottom && domRect.top
                ? Math.ceil(domRect.bottom - domRect.top)
                : "100vh",
          },
          visible: {
            opacity: 1,
            y: 0,
            width: "100%",
            minHeight: "100vh",
            borderRadius: 0,
            transition: {
              duration: domRect.top ? 0.5 : 0.7,
              staggerChildren: 0.02,
              ease: "easeOut",
              when: "beforeChildren",
            },
          },
          exit: {
            opacity: 0,
            transition: {
              when: "afterChildren",
              staggerChildren: 0.02,
            },
          },
        }}
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
                <Grid item md={2} xs={4}>
                  <Typography
                    variant="body1"
                    className={classes.textTertiary}
                    component={motion.h6}
                    variants={titleVariants}
                  >
                    Category
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography
                    variant="body1"
                    className={classes.textTertiary}
                    component={motion.h6}
                    variants={titleVariants}
                  >
                    :
                  </Typography>
                </Grid>
                <Grid item md={9} xs={7}>
                  <Typography
                    variant="body1"
                    className={classes.textTertiary}
                    component={motion.h6}
                    variants={titleVariants}
                  >
                    {project.category}
                  </Typography>
                </Grid>

                <Grid item md={2} xs={4}>
                  <Typography
                    variant="body1"
                    className={classes.textTertiary}
                    component={motion.h6}
                    variants={titleVariants}
                  >
                    Tags
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography
                    variant="body1"
                    className={classes.textTertiary}
                    component={motion.h6}
                    variants={titleVariants}
                  >
                    :
                  </Typography>
                </Grid>
                <Grid item md={9} xs={7}>
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
    </div>
  );
};

HeroProject.propTypes = {
  project: PropTypes.object.isRequired,
};
HeroProject.defaultProps = {
  project: {},
};

export default HeroProject;
