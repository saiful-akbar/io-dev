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
    minHeight: 300,
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

const bannerVariants = {
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
    scaleY: 1.2,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  clicked: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
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
  clicked: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const iconVariants = {
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
  clicked: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

/**
 * komponen utama
 * @param {*} param0
 * @returns
 */
const ProjectFooter = ({ next }) => {
  const transition = { duration: 0.5, ease: "easeOut" };

  const classes = useStyles();
  const history = useHistory();
  const ref = React.useRef(null);

  // state
  const [isClicked, setClicked] = React.useState(false);

  // redux
  const dispatch = useDispatch();
  const { domRect } = useSelector((state) => state.workReducer);

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
      variants={bannerVariants}
      transition={transition}
      initial="hidden"
      animate="visible"
      exit={isClicked ? "clicked" : "exit"}
    >
      <motion.div
        ref={ref}
        className={classes.banner}
        style={{ backgroundColor: next.bannerColor }}
        transition={transition}
        variants={bannerVariants}
        whileHover={{ scaleY: 1.1 }}
      />

      <Container className={classes.container}>
        <Grid container spacing={2} display="flex" alignItems="center">
          <Grid item md={2} xs={12}>
            <Typography
              variant="subtitle1"
              className={classes.textTertiary}
              component={motion.h6}
              variants={titleVariants}
            >
              Next
            </Typography>
          </Grid>

          <Grid item md={9} xs={12}>
            <Typography
              variant="h4"
              className={classes.textTertiary}
              component={motion.h4}
              variants={titleVariants}
            >
              {next.name}
            </Typography>
          </Grid>

          <Grid item md={1} xs={12}>
            <motion.span variants={iconVariants}>
              <ArrowForwardIcon
                className={classes.icon}
                style={{ fontSize: 40 }}
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
