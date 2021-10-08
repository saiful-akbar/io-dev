import { Box, Container, Grid } from "@mui/material";
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
  beroBanner: {
    padding: theme.spacing(20, 0, 5, 0),
    minHeight: "70vh",
    width: "100%",
  },
  heroTitle: {
    color: theme.palette.text.tertiary,
    fontWeight: 500,
    lineHeight: "100%",
    fontSize: "6rem",
    [theme.breakpoints.down("md")]: {
      fontSize: "4.5rem",
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
const nameVariants = {
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
              <motion.h1
                className={classes.heroTitle}
                transition={transition}
                variants={nameVariants}
              >
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
