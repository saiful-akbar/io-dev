import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import actionType from "src/reducer/actionType";
import { transition } from "src/utils/animate";

/**
 * Style
 */
const useStyles = makeStyles((theme) => ({
  projectContainer: {
    position: "relative",
    minHeight: 500,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  projectBanner: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  projectHeroImage: {
    position: "absolute",
    pointerEvents: "none",
    objectFit: "contain",
    maxHeight: "65%",
    maxWidth: "80%",
  },
  projectTitleTop: {
    pointerEvents: "none",
    position: "absolute",
    color: theme.palette.text.tertiary,
    lineHeight: "100%",
  },
  projectTitleBottom: {
    lineHeight: "100%",
    pointerEvents: "none",
    position: "absolute",
    color: theme.palette.text.tertiary,
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));

/**
 * Animasi varian
 */
const projectVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 1,
  },
};

const imageVariants = {
  hidden: {
    y: "20vh",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition,
  },
  exit: {
    opacity: 0,
    transition,
  },
};

const textVariants = {
  hidden: {
    opacity: 0,
    y: "20vh",
    skewY: 10,
    transition,
  },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition,
  },
  exit: {
    opacity: 0,
    transition,
  },
};

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
const ProjectCard = ({ bannerColor, name, image, category, year, slug }) => {
  const classes = useStyles();
  const history = useHistory();
  const rootRef = React.useRef(null);

  // redux dispatch
  const dispatch = useDispatch();

  // animate exit state
  const [show, setShow] = React.useState(false);
  const [exit, setExit] = React.useState({
    opacity: 0,
    transition: {
      ...transition,
    },
  });

  // fungsi untuk menampilkan text ketika seluruh elemen ada dalam viewport
  const handleShowText = React.useCallback(
    (e) => {
      const { top, height } = rootRef.current.getBoundingClientRect();
      const diffTop = window.innerHeight - height;

      if (top < diffTop && top > 0) {
        setShow(true);
      } else {
        setShow(false);
      }
    },
    [rootRef, setShow]
  );

  // handle viewport scroll
  React.useEffect(() => {
    window.addEventListener("scroll", handleShowText);

    return () => {
      window.removeEventListener("scroll", handleShowText);
    };
  }, [handleShowText]);

  // handle click card
  const handleClick = () => {
    const { top, left } = rootRef.current.getBoundingClientRect();

    // set animation exit sharedLayout
    setExit({
      opacity: 1,
      y: -top,
      x: -left,
      height: window.innerHeight,
      width: window.innerWidth,
      transition: {
        ...transition,
        height: {
          ...transition,
          delay: transition.duration / 3,
        },
        y: {
          ...transition,
          delay: transition.duration / 3,
        },
      },
    });

    // set state sharedLayout
    dispatch({
      type: actionType.setWorkSharedLayout,
      value: true,
    });

    history.push(`/project/${slug}`);
  };

  return (
    <motion.div
      onClick={handleClick}
      className={classes.projectContainer}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={projectVariants}
    >
      <motion.div
        ref={rootRef}
        className={classes.projectBanner}
        style={{ backgroundColor: bannerColor }}
        transition={transition}
        whileHover={{ scale: 1.03 }}
        variants={{
          hidden: {
            opacity: 0,
            y: "20vh",
          },
          visible: {
            opacity: 1,
            y: 0,
            transition,
          },
          exit: {
            ...exit,
          },
        }}
      />

      {/* image */}
      <motion.img
        loading="lazy"
        alt={name}
        src={image}
        className={classes.projectHeroImage}
        variants={imageVariants}
      />

      {/* title top left */}
      <Typography
        noWrap
        variant="subtitle1"
        component={motion.h6}
        className={classes.projectTitleTop}
        style={{ top: 45, left: 40 }}
        variants={textVariants}
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        exit="exit"
      >
        {name}
      </Typography>

      {/* title top right */}
      <motion.span
        className={classes.projectTitleTop}
        style={{ top: 40, right: 40 }}
        variants={textVariants}
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        exit="exit"
      >
        <ChevronRightIcon style={{ fontSize: 35 }} />
      </motion.span>

      {/* title bottom left */}
      <Typography
        variant="caption"
        component={motion.h6}
        className={classes.projectTitleBottom}
        style={{ bottom: 45, left: 40 }}
        variants={textVariants}
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        exit="exit"
      >
        {category.toUpperCase()}
      </Typography>

      {/* title bottom right */}
      <Typography
        variant="caption"
        component={motion.h6}
        className={classes.projectTitleBottom}
        style={{ bottom: 45, right: 40 }}
        variants={textVariants}
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        exit="exit"
      >
        {year}
      </Typography>
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
