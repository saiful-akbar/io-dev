import { Grid, Container } from "@mui/material";
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
  heroContainer: {
    minHeight: "100vh",
    padding: theme.spacing(15, 0, 10, 0),
    display: "flex !important",
    alignItems: "center",
  },
  heroImage: {
    objectFit: "contain",
    width: "100%",
    maxHeight: 500,
  },
  title: {
    textAlign: "center",
    marginBottom: theme.spacing(3),
    color: theme.palette.text.tertiary,
    lineHeight: "100%",
    fontWeight: 500,
    fontSize: "5em",
    [theme.breakpoints.down("lg")]: {
      fontSize: "4em",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "3em",
    },
  },
  category: {
    textAlign: "center",
    color: theme.palette.text.tertiary,
    lineHeight: "100%",
    fontWeight: 500,
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
  const classes = useStyles();
  const { ref, inView } = useInView();

  // redux
  const dispatch = useDispatch();
  const { header } = useSelector((state) => state.globalReducer);
  const { domRect } = useSelector((state) => state.workReducer);
  const { transition } = useSelector((state) => state.animateReducer);

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
        y: domRect ? domRect.banner.top : "25vh",
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
          ...transition,
          staggerChildren: 0.04,
          when: "beforeChildren",
        },
      },
      exit: {
        opacity: 0,
        y: "-0vh",
        transition: {
          ...transition,
        },
      },
    },
    heroImage: {
      hidden: {
        opacity: 0,
        y: "20vh",
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          ...transition,
        },
      },
      exit: {
        y: "-10vh",
        opacity: 0,
        transition: {
          ...transition,
        },
      },
    },
    title: {
      hidden: {
        opacity: 0,
        y: "25vh",
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          ...transition,
        },
      },
      exit: {
        opacity: 0,
        y: "-10vh",
        transition: {
          ...transition,
        },
      },
    },
  };

  return (
    <div className={classes.hero}>
      <motion.div
        ref={ref}
        style={{ backgroundColor: bannerColor }}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={animateVariants.banner}
      >
        <Container className={classes.heroContainer}>
          <Grid container spacing={5}>
            <Grid
              item
              mb={3}
              md={8}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <motion.img
                loading="eager"
                src={heroImage}
                alt={name}
                className={classes.heroImage}
                variants={animateVariants.heroImage}
                transition={{
                  duration: 0.7,
                  ease: "easeInOut",
                }}
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <motion.h1
                className={classes.title}
                variants={animateVariants.title}
              >
                {name}
              </motion.h1>
              <br />
              <motion.h1
                className={classes.category}
                variants={animateVariants.title}
              >
                -- {category.toUpperCase()} --
              </motion.h1>
            </Grid>
          </Grid>
        </Container>
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
