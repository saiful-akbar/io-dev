import React from "react";
import { Box, Icon } from "@mui/material";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import actionType from "src/redux/actionType";
import transition from "src/transition";
import styles from "src/styles/scrollToTop.module.scss";

/**
 * Animasi varian
 */
const rootVariants = {
  hidden: {
    opacity: 0,
    y: "10vh",
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
 * @returns
 */
const ScrollToTop = () => {
  const dispatch = useDispatch();

  // state
  const [show, setShow] = React.useState(true);
  const [isHover, setIsHover] = React.useState(false);

  // set inView ketika element ProjectHero ada atau tidak dalan viewport saat di-scroll
  const handleInViewOnScroll = React.useCallback(() => {
    const topEl = document.querySelector("#top");
    const { top } = topEl.getBoundingClientRect();

    // cek element #top
    if (top < -10) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, []);

  // jalankan fungsi handleInViewOnScroll saat viewport di-scroll
  React.useEffect(() => {
    window.addEventListener("scroll", handleInViewOnScroll);
    return () => {
      window.removeEventListener("scroll", handleInViewOnScroll);
    };
  }, [handleInViewOnScroll]);

  // ubah state cussorHover menjadi tru ketika komponen di hover
  const handleCursorHover = (value) => {
    setIsHover(value);
    dispatch({
      type: actionType.setGlobalCursorHover,
      value,
    });
  };

  // handle scroll to top
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  // render komponen
  return (
    <Box
      className={styles.root}
      onTap={handleScrollToTop}
      component={motion.div}
      transition={transition}
      onHoverStart={() => handleCursorHover(true)}
      onHoverEnd={() => handleCursorHover(false)}
      initial="hidden"
      animate={show ? "show" : "hidden"}
      exit="exit"
      variants={rootVariants}
    >
      <Box
        boxShadow={5}
        component={motion.div}
        className={styles.banner}
        transition={transition}
        animate={{
          borderRadius: isHover ? "100%" : "25%",
          rotate: isHover ? 180 : 0,
        }}
      />
      <Icon className={styles.icon}>north</Icon>
    </Box>
  );
};

export default ScrollToTop;
