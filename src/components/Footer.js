import InstagramIcon from "@mui/icons-material/Instagram";
import React from "react";
import styles from "src/styles/footer.module.scss";
import { useDispatch } from "react-redux";
import actionType from "src/redux/actionType";
import { motion } from "framer-motion";
import TextMask from "./TextMask";
import transition from "src/transition";

/**
 * Animasi variant
 */
const linkVariants = {
  hidden: {
    opacity: 0,
    y: "80%",
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
 * Komponen utama Footer
 *
 * @returns
 */
const Footer = () => {
  const dispatch = useDispatch();

  // set value state cursorHover ketika element di hover
  const handleCursorHover = (isHover) => {
    dispatch({
      type: actionType.setGlobalCursorHover,
      value: isHover,
    });
  };

  return (
    <footer className={styles.footer}>
      <motion.a
        href="https://instagram.com/saifulakbar13"
        target="_blank"
        rel="noreferrer"
        onHoverStart={() => handleCursorHover(true)}
        onHoverEnd={() => handleCursorHover(false)}
        initial="hidden"
        animate="show"
        exit="exit"
        variants={linkVariants}
      >
        <TextMask>
          <InstagramIcon style={{ fontSize: 25 }} />
        </TextMask>
      </motion.a>
    </footer>
  );
};

export default Footer;
