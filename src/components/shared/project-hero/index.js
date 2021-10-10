import { Grid } from "@mui/material";
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
  },
  heroContainer: {
    minHeight: "100vh",
    width: "100%",
    paddingBottom: theme.spacing(10),
    paddingTop: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      paddingTop: theme.spacing(15),
    },
  },
  heroImage: {
    objectFit: "contain",
    maxWidth: "90%",
    maxHeight: 600,
  },
  title: {
    color: theme.palette.text.tertiary,
    fontWeight: 400,
    fontSize: "3em",
    [theme.breakpoints.down("lg")]: {
      fontSize: "2em",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "1.3em",
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
        height: domRect ? domRect.banner.height : "auto",
      },
      visible: {
        borderRaius: 0,
        opacity: 1,
        y: 0,
        width: "100%",
        height: "auto",
        transition: {
          duration: 0.5,
          ease: "easeOut",
          staggerChildren: 0.02,
          when: "beforeChildren",
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
          ease: "easeOut",
          duration: 0.5,
        },
      },
    },
    title: {
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
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          className={classes.heroContainer}
        >
          <Grid
            item
            md={3}
            xs={8}
            order={{ md: 1, xs: 2 }}
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              px: 3,
              pt: 5,
            }}
          >
            <motion.h1
              className={classes.title}
              variants={animateVariants.title}
            >
              {name}
            </motion.h1>
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            order={{ md: 2, xs: 1 }}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <motion.img
              loading="eager"
              src={heroImage}
              alt={name}
              className={classes.heroImage}
              variants={animateVariants.heroImage}
              transition={transition}
            />
          </Grid>
          <Grid
            item
            md={3}
            xs={4}
            order={{ md: 3, xs: 3 }}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              px: 3,
              pt: 5,
            }}
          >
            <motion.h1
              className={classes.title}
              variants={animateVariants.title}
            >
              {category}
            </motion.h1>
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
