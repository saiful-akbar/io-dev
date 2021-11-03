import { Box, Icon } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import styles from "src/styles/projectCard.module.scss";
import { motion } from "framer-motion";
import TextMask from "src/components/TextMask";
import transition from "src/transition";
import { useDispatch } from "react-redux";
import actionType from "src/redux/actionType";
import { useHistory } from "react-router-dom";

/**
 * animasi variant
 */
const rootVariants = {
  hidden: {
    opacity: 1,
  },
  show: {
    transition: {
      staggerChildren: 0.05,
      when: "beforeChildren",
    },
  },
  exit: {
    transition: {
      when: "afterChildren",
    },
  },
};

const titleVariants = {
  hidden: {
    opacity: 0,
    y: "80%",
    transition: {
      duration: transition.duration / 1.5,
      ease: transition.ease,
    },
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: transition.duration / 1.5,
      ease: transition.ease,
    },
  },
  exit: {
    opacity: 0,
  },
};

const imageVariants = {
  hidden: {
    opacity: 0,
    y: 150,
  },
  show: {
    opacity: 1,
    y: 0,
    transition,
  },
  exit: {
    opacity: 0,
  },
};

/**
 * Kompoen utama ProjectCard
 *
 * @returns
 */
const ProjectCard = ({ project }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const ref = React.useRef();

  // state
  const [show, setShow] = React.useState(false);
  const [bannerVariants, setBannerVariants] = React.useState({
    hidden: {
      opacity: 0,
      y: "10vh",
      scale: 1,
    },
    show: {
      opacity: 1,
      y: 1,
      transition,
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.4,
      },
    },
  });

  // set value state cursorHover ketika element di hover
  const handleCursorHover = (isHover) => {
    dispatch({
      type: actionType.setGlobalCursorHover,
      value: isHover,
    });
  };

  // fungsi untuk menampilkan text ketika seluruh elemen ada dalam viewport
  const handleShowTextOnScroll = React.useCallback(() => {
    const { top, height } = ref.current.getBoundingClientRect();
    const diffTop = window.innerHeight - height;

    if (top < diffTop) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [ref, setShow]);

  // handle viewport scroll
  React.useEffect(() => {
    window.addEventListener("scroll", handleShowTextOnScroll);
    return () => {
      window.removeEventListener("scroll", handleShowTextOnScroll);
    };
  }, [handleShowTextOnScroll]);

  // handle click card
  const handleTap = (event) => {
    const { top, left } = event.target.getBoundingClientRect();
    const newBannerVariants = bannerVariants;

    newBannerVariants.exit = {
      borderRadius: 0,
      opacity: 1,
      y: -top,
      x: -left,
      height: window.innerHeight,
      width: window.innerWidth,
      transition: {
        ...transition,
        y: {
          ...transition,
          delay: transition.duration / 3,
        },
        height: {
          ...transition,
          delay: transition.duration / 3,
        },
      },
    };

    setBannerVariants(newBannerVariants);

    // set redux state workReducer sharedLayout
    dispatch({
      type: actionType.setProjectSharedLayout,
      value: true,
    });

    // push ke halaman project detail
    history.push(`/project/${project.slug}`);
  };

  return (
    <motion.div
      ref={ref}
      className={styles.root}
      initial="hidden"
      animate="show"
      exit="exit"
      variants={rootVariants}
    >
      <Box
        boxShadow={2}
        className={styles.banner}
        component={motion.div}
        transition={transition}
        whileHover={{ scale: 1.03 }}
        onHoverStart={() => handleCursorHover(true)}
        onHoverEnd={() => handleCursorHover(false)}
        onTap={handleTap}
        initial="hidden"
        animate="show"
        exit="exit"
        style={{ backgroundColor: project.bannerColor }}
        variants={bannerVariants}
      />

      <div className={styles.content}>
        <div className={styles.topText}>
          <TextMask
            variants={titleVariants}
            initial="hidden"
            animate={show ? "show" : "hidden"}
            exit="exit"
          >
            {project.name}
          </TextMask>

          <TextMask
            variants={titleVariants}
            initial="hidden"
            animate={show ? "show" : "hidden"}
            exit="exit"
          >
            <Icon sx={{ marginTop: 1.5 }}>east</Icon>
          </TextMask>
        </div>

        <Box
          boxShadow={2}
          component={motion.img}
          src={project.heroImage}
          alt={project.name}
          loading="eager"
          className={styles.image}
          variants={imageVariants}
        />

        <div className={styles.bottomText}>
          <TextMask
            variants={titleVariants}
            initial="hidden"
            animate={show ? "show" : "hidden"}
            exit="exit"
          >
            {project.category}
          </TextMask>

          <TextMask
            variants={titleVariants}
            initial="hidden"
            animate={show ? "show" : "hidden"}
            exit="exit"
          >
            {project.year}
          </TextMask>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * ProjectCard prop types
 */
ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectCard;
