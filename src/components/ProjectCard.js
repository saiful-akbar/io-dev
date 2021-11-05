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
 * Kompoen utama ProjectCard
 *
 * @returns
 */
const ProjectCard = ({ project }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const rootRef = React.useRef();
  const body = document.querySelector("body");

  // data project
  const { heroImage, name, category, year, bannerColor, slug } = project;

  // state
  const [show, setShow] = React.useState(false);
  const [animateVariants, setAnimateVariants] = React.useState({
    root: {
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
        opacity: 0,
      },
    },
    banner: {
      hidden: {
        opacity: 0,
        y: 150,
      },
      show: {
        opacity: 1,
        y: 1,
        transition,
      },
      exit: {
        opacity: 0,
        transition: {
          duration: 0.5,
        },
      },
    },
    text: {
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
    },
    image: {
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
    },
  });

  // Handle cursor hover
  const handleCursorHover = (isHover) => {
    dispatch({
      type: actionType.setGlobalCursorHover,
      value: isHover,
    });
  };

  // fungsi untuk menampilkan text ketika seluruh elemen ada dalam viewport
  const handleShowTextOnScroll = React.useCallback(() => {
    const { top, height } = rootRef.current.getBoundingClientRect();
    const diffTop = window.innerHeight - height;

    if (top < diffTop) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [rootRef, setShow]);

  // handle viewport scroll
  React.useEffect(() => {
    window.addEventListener("scroll", handleShowTextOnScroll);
    return () => {
      window.removeEventListener("scroll", handleShowTextOnScroll);
    };
  }, [handleShowTextOnScroll]);

  // handle click card
  const handleTap = () => {
    dispatch({
      type: actionType.setProjectSharedLayout,
      value: true,
    });

    const rootRect = rootRef.current.getBoundingClientRect();
    const bodyRect = body.getBoundingClientRect();
    const newAnimateVariants = animateVariants;

    newAnimateVariants.root.exit = {
      borderRadius: 0,
      opacity: 1,
      y: -rootRect.top,
      x: -rootRect.left,
      height: window.innerHeight,
      width: bodyRect.width,
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

    newAnimateVariants.banner.exit = {
      opacity: 1,
      borderRadius: 0,
      transition,
    };

    newAnimateVariants.text.exit = {
      opacity: 0,
      transition,
    };

    newAnimateVariants.image.exit = {
      opacity: 0,
      transition,
    };

    setAnimateVariants(newAnimateVariants);

    // push ke halaman project detail
    history.push(`/project/${slug}`);
  };

  return (
    <motion.div
      ref={rootRef}
      className={styles.root}
      initial="hidden"
      animate="show"
      exit="exit"
      variants={animateVariants.root}
      onTap={handleTap}
    >
      <Box
        boxShadow={2}
        className={styles.banner}
        component={motion.div}
        transition={transition}
        whileHover={{ scale: 1.03 }}
        onHoverStart={() => handleCursorHover(true)}
        onHoverEnd={() => handleCursorHover(false)}
        initial="hidden"
        animate="show"
        exit="exit"
        variants={animateVariants.banner}
        sx={{
          backgroundImage: `linear-gradient(to top left, ${bannerColor.primary}, ${bannerColor.secondary})`,
        }}
      />

      <div className={styles.content}>
        <div className={styles.topText}>
          <TextMask
            variants={animateVariants.text}
            initial="hidden"
            animate={show ? "show" : "hidden"}
            exit="exit"
          >
            {name}
          </TextMask>

          <TextMask
            variants={animateVariants.text}
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
          src={heroImage}
          alt={name}
          loading="eager"
          className={styles.image}
          variants={animateVariants.image}
        />

        <div className={styles.bottomText}>
          <TextMask
            variants={animateVariants.text}
            initial="hidden"
            animate={show ? "show" : "hidden"}
            exit="exit"
          >
            {category}
          </TextMask>

          <TextMask
            variants={animateVariants.text}
            initial="hidden"
            animate={show ? "show" : "hidden"}
            exit="exit"
          >
            {year}
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
