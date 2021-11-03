import { motion } from "framer-motion";
import PropTypes from "prop-types";
import React from "react";
import styles from "src/styles/textmask.module.scss";

/**
 * Komponen utam TextMask
 * @param {String} text
 * @returns
 */
const TextMask = ({ children, ...rest }) => {
  return (
    <span className={styles.textMask}>
      <motion.span {...rest}>{children}</motion.span>
    </span>
  );
};

TextMask.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TextMask;
