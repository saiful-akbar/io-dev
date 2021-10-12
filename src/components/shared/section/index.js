import { motion } from "framer-motion";
import PropTypes from "prop-types";
import React from "react";
import { Box } from "@mui/material";

/**
 * animate variants
 */
const sectionVariants = {
  hidden: {
    opacity: 0,
    y: "20vh",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    y: "-10vh",
    transition: {
      duration: 0.7,
      ease: "easeInOut",
    },
  },
};

/**
 * Kompoen utama
 * @param {React node} children
 * @returns
 */
const Section = ({ children, ...rest }) => {
  return (
    <Box
      {...rest}
      component={motion.section}
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </Box>
  );
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Section;
