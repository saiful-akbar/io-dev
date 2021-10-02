import { Container } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import MainLayout from "src/components/layouts/main-layout";
import Hero from "src/components/shared/hero";

// animate variants
const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const About = () => {
  return (
    <MainLayout pageTitle="About Us">
      <motion.section
        id="hero"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Container>
          <Hero title="About Us" />
        </Container>
      </motion.section>
    </MainLayout>
  );
};

export default About;
