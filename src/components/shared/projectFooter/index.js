import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Container, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import actionType from "src/reducer/actionType";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

/**
 * Style
 */
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: theme.spacing(18, 0),
    cursor: "pointer",
  },
  textTertiary: {
    color: theme.palette.text.tertiary,
  },
  icon: {
    color: theme.palette.text.tertiary,
    fontSize: "4em !important",
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
    transition: {
      duration: 0.5,
      ease: "easeOut",
      when: "afterChildren",
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
  const [isHover, setHover] = React.useState(false);

  // redux
  const dispatch = useDispatch();
  const { domRect } = useSelector((state) => state.workReducer);

  // fungsi handle click go to next project
  const handleClick = () => {
    const newDomRect = domRect;
    newDomRect.banner = ref.current.getBoundingClientRect();

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
      ref={ref}
      style={{ backgroundColor: next.bannerColor }}
      className={classes.root}
      variants={bannerVariants}
      transition={transition}
      initial="hidden"
      animate="visible"
      exit={isClicked ? "clicked" : "exit"}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
    >
      <Container>
        <Grid
          container
          spacing={2}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
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
          <Grid item md={8} xs={12}>
            <Typography
              variant="h4"
              className={classes.textTertiary}
              component={motion.h4}
              variants={titleVariants}
            >
              {next.name}
            </Typography>
          </Grid>

          <Grid item md={2} xs={12}>
            <motion.span
              variants={iconVariants}
              initial="hidden"
              animate={isHover ? "visible" : "exit"}
              exit={isClicked ? "clicked" : "exit"}
            >
              <ArrowForwardIcon className={classes.icon} />
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
