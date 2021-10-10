import { Box, Grid } from "@mui/material";
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
  banner: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      paddingTop: "10vh",
    },
  },
  heroImage: {
    objectFit: "contain",
    width: "100%",
    height: "80vh",
    [theme.breakpoints.down("md")]: {
      height: "70vh",
    },
    [theme.breakpoints.down("md")]: {
      height: "60vh",
    },
  },
  title: {
    color: theme.palette.text.tertiary,
    fontWeight: 400,
    lineHeight: "100%",
    fontSize: "4em",
    [theme.breakpoints.down("lg")]: {
      fontSize: "3em",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "2em",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5em",
    },
  },
}));

/**
 * Komponen utama
 * @param {Object} project
 * @returns
 */
const ProjectHero = ({ bannerColor, heroImage, name, category }) => {
  const transition = { duration: 0.5, ease: "easeOut" };
  const classes = useStyles();
  const { ref, inView } = useInView();

  // redux
  const dispatch = useDispatch();
  const { header } = useSelector((state) => state.globalReducer);
  const { domRect } = useSelector((state) => state.workReducer);

  // set warna header ketika element ada dalam viewport
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

  // animation variants
  const animateVariants = {
    banner: {
      hidden: {
        borderRaius: 10,
        opacity: domRect ? 1 : 0,
        y: domRect ? domRect.banner.top : 100,
        width: domRect ? domRect.banner.width : "100%",
        height: domRect ? domRect.banner.height : "100vh",
      },
      visible: {
        borderRaius: 0,
        opacity: 1,
        y: 0,
        width: "100%",
        height: "100vh",
        transition: {
          duration: 0.5,
          ease: "easeOut",
          staggerChildren: 0.02,
          when: domRect && "beforeChildren",
        },
      },
      exit: {
        opacity: 0,
        y: -50,
        transition: {
          duration: 0.5,
          ease: "easeOut",
          when: "afterChildren",
        },
      },
    },
    heroImage: {
      hidden: {
        opacity: 0,
        y: 100,
        originY: 1,
        scaleY: 0,
      },
      visible: {
        opacity: 1,
        y: 0,
        scaleY: 1,
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      },
      exit: {
        opacity: 0,
        y: -50,
        transition: {
          ease: "easeOut",
          duration: 0.5,
        },
      },
    },
    title: {
      hidden: {
        opacity: 0,
        y: 100,
        originY: 1,
        scaleY: 0,
      },
      visible: {
        opacity: 1,
        y: 0,
        scaleY: 1,
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      },
      exit: {
        opacity: 0,
        y: -50,
        transition: {
          ease: "easeOut",
          duration: 0.5,
        },
      },
    },
  };

  return (
    <div className={classes.hero}>
      <motion.div
        ref={ref}
        style={{ backgroundColor: bannerColor }}
        className={classes.banner}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={animateVariants.banner}
      >
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item md={3} xs={6} order={{ md: 1, xs: 2 }}>
            <Box display="flex" justifyContent="flex-start" p={3}>
              <motion.h1
                className={classes.title}
                variants={animateVariants.title}
              >
                {name}
              </motion.h1>
            </Box>
          </Grid>
          <Grid item md={6} xs={12} order={{ md: 2, xs: 1 }}>
            <motion.img
              loading="eager"
              src={heroImage}
              alt={name}
              className={classes.heroImage}
              variants={animateVariants.heroImage}
              transition={transition}
            />
          </Grid>
          <Grid item md={3} xs={6} order={{ md: 3, xs: 3 }}>
            <Box display="flex" justifyContent="flex-end" p={3}>
              <motion.h1
                className={classes.title}
                variants={animateVariants.title}
              >
                {category}
              </motion.h1>
            </Box>
          </Grid>
        </Grid>
      </motion.div>
    </div>
  );
};

ProjectHero.propTypes = {
  bannerColor: PropTypes.string.isRequired,
  heroImage: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default ProjectHero;
