import React from "react";
import PropTypes from "prop-types";
import styles from "src/styles/textmask.module.scss";
import { motion } from "framer-motion";

/**
 * Komponen utam TextMask
 * @param {String} text
 * @returns
 */
const TextMask = ({ text, ...rest }) => {
  return (
    <span className={styles.textMask}>
      <motion.span {...rest}>{text}</motion.span>
    </span>
  );
};

TextMask.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TextMask;
