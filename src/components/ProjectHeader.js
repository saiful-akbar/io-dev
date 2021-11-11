import { Box, Icon } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import actionType from "src/redux/actionType";
import transition from "src/transition";
import styles from "src/styles/projectHeader.module.scss";

/**
 * animasi varian
 */
const headerVariants = {
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
 * Komponen utama ProjectHeader
 *
 * @param {String} url
 * @returns
 */
const ProjectHeader = ({ url }) => {
  const dispatch = useDispatch();

  // state
  const [inView, setInView] = React.useState(true);

  // set inView ketika element ProjectHero ada dalam viewport
  const handleInViewOnScroll = React.useCallback(() => {
    const projectHeroEl = document.querySelector("#project-hero");

    if (projectHeroEl) {
      const { bottom } = projectHeroEl.getBoundingClientRect();
      if (bottom <= 60) {
        setInView(false);
      } else {
        setInView(true);
      }
    }
  }, [setInView]);

  // jalankan fungsi handleInViewOnScroll saat viewport di-scroll
  React.useEffect(() => {
    window.addEventListener("scroll", handleInViewOnScroll);

    return () => {
      window.removeEventListener("scroll", handleInViewOnScroll);
    };
  }, [handleInViewOnScroll]);

  // fungsi handle style cursor saat ada event hover
  const handleCursorHover = (value) => {
    dispatch({
      type: actionType.setGlobalCursorHover,
      value,
    });
  };

  // render komponen
  return (
    <React.Fragment>

      {/* logo */}
      <Link to="/">
        <Box
          component={motion.img}
          boxShadow={5}
          src="/images/logo/logo-dark.webp"
          alt="logo"
          className={styles.logo}
          onHoverStart={() => handleCursorHover(true)}
          onHoverEnd={() => handleCursorHover(false)}
          initial="hidden"
          animate="show"
          exit="exit"
          variants={headerVariants}
        />
      </Link>
      {/* end logo */}

      <motion.div
        className={styles.wrapper}
        variants={headerVariants}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        {/* button kembali */}
        <Link to="/">
          <motion.div
            data-inview={inView}
            className={styles.iconBack}
            transition={transition}
            onHoverStart={() => handleCursorHover(true)}
            onHoverEnd={() => handleCursorHover(false)}
            whileHover={{ backgroundColor: inView ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)" }}
          >
            <Icon className={styles.icon} data-inview={inView}>
              west
            </Icon>
          </motion.div>
        </Link>
        {/* end button kembali */}

        {/* button url */}
        <motion.a
          href={url}
          target="_blank"
          rel="noreferrer"
          data-inview={inView}
          className={styles.iconUrl}
          transition={transition}
          onHoverStart={() => handleCursorHover(true)}
          onHoverEnd={() => handleCursorHover(false)}
          whileHover={{ backgroundColor: inView ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)" }}
        >
          <Icon className={styles.icon} data-inview={inView}>
            north_east
          </Icon>
        </motion.a>
        {/* end button url */}

      </motion.div>
    </React.Fragment>
  );
};

/**
 * prop types ProjectHeader
 * 
 * @type {Object}
 */
ProjectHeader.propTypes = {
  url: PropTypes.string.isRequired,
};

export default ProjectHeader;