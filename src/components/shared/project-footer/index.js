import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import actionType from "src/reducer/actionType";

/**
 * Style
 */
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "relative",
    bottom: 0,
    minHeight: 250,
    display: "flex !important",
    alignItems: "center",
    justifyContent: "center",
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
    top: "50%",
    transform: "translateY(-50%)",
  },
  textTertiary: {
    color: theme.palette.text.tertiary,
  },
  icon: {
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
  const [isClicked, setClicked] = React.useState(false);

  // redux
  const dispatch = useDispatch();
  const { domRect } = useSelector((state) => state.workReducer);
  const { transition } = useSelector((state) => state.animateReducer);

  // animate variants
  const animateVariants = {
    banner: {
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
        originY: 1,
        opacity: 0,
        scaleY: 1.2,
        transition: {
          ...transition,
        },
      },
      clicked: {
        opacity: 1,
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
        y: "-10vh",
        transition: {
          ...transition,
        },
      },
      clicked: {
        opacity: 0,
        transition: {
          ...transition,
        },
      },
    },
    icon: {
      hidden: {
        opacity: 0,
        y: "20vh",
        skewY: 5,
      },
      visible: {
        opacity: 1,
        y: 0,
        skewY: 0,
        transition,
      },
      exit: {
        opacity: 0,
        y: "-10vh",
        transition,
      },
      clicked: {
        opacity: 0,
        transition,
      },
    },
  };

  // fungsi handle click go to next project
  const handleClick = () => {
    let newDomRect = domRect;
    newDomRect = { banner: ref.current.getBoundingClientRect() };

    // ubah state domRect pada project
    dispatch({
      type: actionType.setWorkDomRect,
      value: newDomRect,
    });

    setClicked(true);
    history.push(`/project/${next.slug}`);
  };

  return (
    <motion.footer
      onClick={handleClick}
      className={classes.root}
      variants={animateVariants.banner}
      transition={transition}
      initial="hidden"
      animate="visible"
      exit={isClicked ? "clicked" : "exit"}
    >
      <motion.div
        ref={ref}
        className={classes.banner}
        style={{ backgroundColor: next.bannerColor, originY: 1 }}
        transition={transition}
        whileHover={{ scaleY: 1.1, originY: 1 }}
      />

      <Container className={classes.container}>
        <Grid container spacing={2} display="flex" alignItems="center">
          <Grid item md={2} xs={12}>
            <Typography
              variant="subtitle1"
              className={classes.textTertiary}
              component={motion.h6}
              variants={animateVariants.title}
            >
              Next
            </Typography>
          </Grid>

          <Grid item md={9} xs={12}>
            <Typography
              variant="h5"
              className={classes.textTertiary}
              component={motion.h4}
              variants={animateVariants.title}
            >
              {next.name}
            </Typography>
          </Grid>

          <Grid item md={1} xs={12}>
            <motion.span variants={animateVariants.icon}>
              <ArrowForwardIcon
                className={classes.icon}
                style={{ fontSize: 35 }}
              />
            </motion.span>
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
