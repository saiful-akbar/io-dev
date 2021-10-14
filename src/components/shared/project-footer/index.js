import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

/**
 * Style
 */
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    minHeight: "40vh",
    position: "relative",
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  rootClicked: {
    height: "100vh",
    position: "fixed",
    top: 0,
  },
  banner: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "100%",
  },
  container: {
    pointerEvents: "none",
    position: "absolute",
  },
  textTertiary: {
    color: theme.palette.text.tertiary,
  },
}));

/**
 * komponen utama
 * @param {*} param0
 * @returns
 */
const ProjectFooter = ({ next }) => {
  const classes = useStyles();
  const history = useHistory();
  const ref = React.useRef(null);

  // state
  const [isClicked, setIsClicked] = React.useState(false);

  // redux
  const { transition } = useSelector((state) => state.animateReducer);

  // fungsi handle click go to next project
  const handleClick = () => {
    setIsClicked(true);
    history.push(`/project/${next.slug}`);
  };

  // animate variants
  const animateVariants = {
    banner: {
      hidden: {
        opacity: 0,
        y: "20vh",
        originY: 1,
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
        scaleY: 1.2,
        transition: {
          ...transition,
        },
      },
      clicked: {
        originY: 1,
        y: ref.current ? -ref.current.getBoundingClientRect().top : 0,
        height: "100vh",
        transition: {
          ...transition,
        },
      },
    },
    title: {
      hidden: {
        opacity: 0,
        y: "20vh",
        skewY: 5,
      },
      visible: {
        opacity: 1,
        y: 0,
        skewY: 0,
        transition: {
          ...transition,
        },
      },
      exit: {
        opacity: 0,
      },
      clicked: {
        opacity: 0,
      },
    },
  };

  return (
    <motion.footer
      ref={ref}
      onClick={handleClick}
      className={classes.root}
      variants={animateVariants.banner}
      initial="hidden"
      animate="visible"
      exit={isClicked ? "clicked" : "exit"}
    >
      <motion.div
        style={{ backgroundColor: next.bannerColor, originY: 1 }}
        className={classes.banner}
        transition={transition}
        layoutId={`banner-${next.slug}`}
        whileHover={{ scaleY: 1.05, originY: 1 }}
      />

      <Container
        className={classes.container}
        component={motion.div}
        transition={transition}
        variants={animateVariants.title}
        layout
      >
        <Grid container spacing={2} display="flex" alignItems="center">
          <Grid item md={2} xs={12}>
            <Typography variant="subtitle1" className={classes.textTertiary}>
              Next
            </Typography>
          </Grid>

          <Grid item md={9} xs={12}>
            <Typography variant="h5" className={classes.textTertiary}>
              {next.name}
            </Typography>
          </Grid>

          <Grid item md={1} xs={12}>
            <ArrowForwardIcon
              className={classes.textTertiary}
              style={{ fontSize: 35 }}
            />
          </Grid>
        </Grid>
      </Container>
    </motion.footer>
  );
};

ProjectFooter.propTypes = {
  next: PropTypes.object.isRequired,
};

export default ProjectFooter;
