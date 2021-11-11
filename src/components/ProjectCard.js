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
 * komponen ProjectCard
 *
 * @param  {Object} options.project
 * @return {React Node}
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
        when: "afterChildren",
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
    // update redux state sharedLayout
    dispatch({
      type: actionType.setProjectSharedLayout,
      value: true,
    });

    const rootRect = rootRef.current.getBoundingClientRect();
    const bodyRect = body.getBoundingClientRect();
    const newAnimateVariants = animateVariants;

    // update animasi exit root
    newAnimateVariants.root.exit = {
      opacity: 1,
      when: "afterChildren",
    };

    // update animasi exit banner
    newAnimateVariants.banner.exit = {
      borderRadius: 0,
      opacity: 1,
      y: -rootRect.top,
      x: -rootRect.left,
      height: window.innerHeight,
      width: bodyRect.width,
      transition: {
        ...transition,
        x: {
          ...transition,
          delay: transition.duration / 4,
        },
        width: {
          ...transition,
          delay: transition.duration / 4,
        },
      },
    };

    // update animasi exit text
    newAnimateVariants.text.exit = {
      opacity: 0,
      transition,
    };

    // update animasi exit image
    newAnimateVariants.image.exit = {
      opacity: 0,
      transition,
    };

    // update animasi pada state
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
      {/* banner */}
      <Box
        boxShadow={7}
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
          backgroundImage: `linear-gradient(to bottom right, ${bannerColor.primary}, ${bannerColor.secondary})`,
        }}
      />
      {/* end banner */}

      {/* card content */}
      <div className={styles.content}>
        {/* top text */}
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
        {/* end top text */}

        {/* hero image */}
        <Box
          boxShadow={7}
          component={motion.img}
          src={heroImage}
          alt={name}
          loading="eager"
          className={styles.image}
          variants={animateVariants.image}
        />

        {/* bottom text */}
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
        {/* end bottom text */}
      </div>
      {/* enf card content */}
    </motion.div>
  );
};

/**
 * prop types ProjectCard
 */
ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectCard;
