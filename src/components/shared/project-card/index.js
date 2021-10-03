import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { motion } from "framer-motion";
import { Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { InView } from "react-intersection-observer";
import { useHistory } from "react-router-dom";

/**
 * Style
 */
const useStyles = makeStyles((theme) => ({
  projectContainer: {
    position: "relative",
    minHeight: 460,
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
    borderRadius: 6,
  },
  projectHeroImage: {
    pointerEvents: "none",
    position: "absolute",
    objectFit: "contain",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
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
    top: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(4, 5),
    color: theme.palette.text.tertiary,
    width: "100%",
  },
  projectTitleBottom: {
    pointerEvents: "none",
    position: "absolute",
    bottom: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(4, 5),
    color: theme.palette.text.tertiary,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));

/**
 * animation variants
 */
const projectVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.02,
    },
  },
  exit: {
    opacity: 0,
    y: -50,
  },
  clicked: {
    opacity: 1,
    transition: {
      when: "afterChildren",
    },
  },
};

const projectImageVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
  clicked: {
    opacity: 0,
  },
};

const projectTitleVariants = {
  hidden: {
    y: 50,
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    y: -50,
    opacity: 0,
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
  const transition = { duration: 0.5, ease: "easeOut" };

  const classes = useStyles();
  const history = useHistory();

  const [isClicked, setClicked] = React.useState(false);

  // handle click card
  const handleClick = () => {
    setClicked(true);
    history.push(`/project/${slug}`);
  };

  return (
    <motion.div
      {...rest}
      onClick={handleClick}
      className={classes.projectContainer}
      variants={projectVariants}
      transition={{ ...transition }}
      initial="hidden"
      animate="visible"
      exit={isClicked ? "clicked" : "exit"}
      layoutId={`banner_${slug}`}
    >
      {/* banner */}
      <motion.div
        className={classes.projectBanner}
        style={{ backgroundColor: bannerColor }}
        whileHover={{ scale: 0.98 }}
        transition={{ ...transition }}
      />

      {/* image */}
      <motion.img
        loading="lazy"
        alt={`project_${slug}`}
        src={image}
        className={classes.projectHeroImage}
        variants={projectImageVariants}
      />

      {/* title top */}
      <InView>
        {({ ref, inView }) => (
          <motion.div
            className={classes.projectTitleTop}
            ref={ref}
            variants={projectTitleVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            exit="exit"
          >
            <Typography variant="subtitle1" noWrap>
              {name}
            </Typography>

            <motion.span>
              <ChevronRightIcon style={{ fontSize: 30 }} />
            </motion.span>
          </motion.div>
        )}
      </InView>

      {/* title top */}
      <InView>
        {({ ref, inView }) => (
          <motion.div
            className={classes.projectTitleBottom}
            ref={ref}
            variants={projectTitleVariants}
            animate={inView ? "visible" : "hidden"}
            initial="hidden"
            exit="exit"
          >
            <Typography variant="subtitle2" noWrap>
              {category}
            </Typography>
            <Typography variant="subtitle2" noWrap>
              {year}
            </Typography>
          </motion.div>
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
