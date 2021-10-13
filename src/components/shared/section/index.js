import { motion } from "framer-motion";
import PropTypes from "prop-types";
import React from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

/**
 * Kompoen utama
 * @param {React node} children
 * @returns
 */
const Section = ({ children, ...rest }) => {
  const { transition } = useSelector((state) => state.animateReducer);

  const animateVariants = {
    section: {
      hidden: {
        opacity: 0,
        y: "20vh",
      },
      visible: {
        opacity: 1,
        y: 0,
        transition,
      },
      exit: {
        opacity: 0,
        y: "-10vh",
        transition,
      },
    },
  };

  return (
    <Box
      {...rest}
      component={motion.section}
      variants={animateVariants.section}
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
