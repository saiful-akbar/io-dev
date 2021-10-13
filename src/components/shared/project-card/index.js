import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import React from "react";
import { InView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import actionType from "src/reducer/actionType";

/**
 * Style
 */
const useStyles = makeStyles((theme) => ({
  projectContainer: {
    position: "relative",
    minHeight: 500,
    width: "100%",
    margin: theme.spacing(5, 0),
    overflow: "hidden",
  },
  projectBanner: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  projectHeroImage: {
    pointerEvents: "none",
    position: "absolute",
    objectFit: "contain",
    top: "50%",
    left: "50%",
    borderRadius: 6,
    height: 300,
    width: "60%",
    [theme.breakpoints.down("md")]: {
      width: "80%",
    },
  },
  projectTitleTop: {
    pointerEvents: "none",
    position: "absolute",
    color: theme.palette.text.tertiary,
    // top: 0,
    // display: "flex",
    // justifyContent: "space-between",
    // alignItems: "center",
    // padding: theme.spacing(4, 5),
    // width: "100%",
  },
  projectTitleBottom: {
    pointerEvents: "none",
    position: "absolute",
    color: theme.palette.text.tertiary,
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
    // bottom: 0,
    // display: "flex",
    // justifyContent: "space-between",
    // alignItems: "center",
    // padding: theme.spacing(4, 5),
    // width: "100%",
  },
}));

/**
 * komponen utama
 * @param {String} bannerColor
 * @param {String} name
 * @param {String} image
 * @param {String} category
 * @param {String} year
 * @param {String} slug
 * @returns
 */
const ProjectCard = ({
  bannerColor,
  name,
  image,
  category,
  year,
  slug,
  ...rest
}) => {
  const classes = useStyles();
  const history = useHistory();
  const bannerRef = React.useRef(null);
  const [clicked, setClicked] = React.useState(false);

  // redux
  const dispatch = useDispatch();
  const { domRect } = useSelector((state) => state.workReducer);
  const { transition } = useSelector((state) => state.animateReducer);

  // animate variants
  const animateVariants = {
    project: {
      hidden: { opacity: 0, y: "20vh" },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          staggerChildren: 0.02,
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
        opacity: 1,
        transition: {
          when: "afterChildren",
        },
      },
    },
    image: {
      hidden: {
        opacity: 0,
        x: "-50%",
        y: "-30%",
      },
      visible: {
        opacity: 1,
        y: "-50%",
        transition: {
          ...transition,
        },
      },
      exit: {
        opacity: 0,
        transition: {
          ...transition,
        },
      },
      clicked: {
        opacity: 0,
        y: "-65%",
        transition: {
          ...transition,
        },
      },
    },
    title: {
      hidden: {
        y: "5vh",
        opacity: 0,
        transition: {
          ...transition,
        },
      },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          ...transition,
        },
      },
      exit: {
        opacity: 0,
      },
      clicked: {
        opacity: 0,
        y: "-5vh",
        transition: {
          ...transition,
        },
      },
    },
  };

  // handle click card
  const handleClick = () => {
    setClicked(true);

    let newDomRect = domRect;
    newDomRect = {
      banner: bannerRef.current.getBoundingClientRect(),
    };

    dispatch({ type: actionType.setWorkDomRect, value: newDomRect });
    history.push(`/project/${slug}`);
  };

  return (
    <motion.div
      {...rest}
      onClick={handleClick}
      className={classes.projectContainer}
      variants={animateVariants.project}
      initial="hidden"
      animate="visible"
      exit={clicked ? "clicked" : "exit"}
    >
      {/* banner */}
      <motion.div
        ref={bannerRef}
        className={classes.projectBanner}
        style={{ backgroundColor: bannerColor }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        whileHover={{ scale: 0.98 }}
      />

      {/* image */}
      <motion.img
        loading="lazy"
        alt={`project_${slug}`}
        src={image}
        className={classes.projectHeroImage}
        variants={animateVariants.image}
      />

      {/* title top left */}
      <InView delay={100}>
        {({ ref, inView }) => (
          <Typography
            variant="subtitle1"
            component={motion.h6}
            className={classes.projectTitleTop}
            ref={ref}
            variants={animateVariants.title}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            exit={clicked ? "clicked" : "exit"}
            style={{ top: 45, left: 40 }}
          >
            {name}
          </Typography>
        )}
      </InView>

      {/* title top right */}
      <InView delay={100}>
        {({ ref, inView }) => (
          <motion.span
            ref={ref}
            className={classes.projectTitleTop}
            variants={animateVariants.title}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            exit={clicked ? "clicked" : "exit"}
            style={{ top: 45, right: 40 }}
          >
            <ChevronRightIcon style={{ fontSize: 40 }} />
          </motion.span>
        )}
      </InView>

      {/* title bottom left */}
      <InView delay={100}>
        {({ ref, inView }) => (
          <Typography
            variant="subtitle2"
            component={motion.h6}
            className={classes.projectTitleBottom}
            ref={ref}
            variants={animateVariants.title}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            exit={clicked ? "clicked" : "exit"}
            style={{ bottom: 45, left: 40 }}
          >
            {category.toUpperCase()}
          </Typography>
        )}
      </InView>

      {/* title bottom right */}
      <InView delay={100}>
        {({ ref, inView }) => (
          <Typography
            variant="subtitle2"
            component={motion.h6}
            className={classes.projectTitleBottom}
            ref={ref}
            variants={animateVariants.title}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            exit={clicked ? "clicked" : "exit"}
            style={{ bottom: 45, right: 40 }}
          >
            {year}
          </Typography>
        )}
      </InView>
    </motion.div>
  );
};

ProjectCard.propTypes = {
  bannerColor: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default ProjectCard;
