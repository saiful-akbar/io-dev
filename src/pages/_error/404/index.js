import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import MainLayout from "src/components/layouts/main-layout";
import Section from "src/components/shared/section";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.02,
    },
  },
  exit: {
    opacity: 0,
  },
};

const titleVariants = {
  hidden: {
    opacity: 0,
    y: 100,
    skewY: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const NotFound = () => {
  return (
    <MainLayout pageTitle="404" pt={25}>
      <Section>
        <Container>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            component={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Typography
              variant="h1"
              color="textPrimary"
              component={motion.h1}
              variants={titleVariants}
            >
              404
            </Typography>
            <Typography
              variant="h3"
              color="textPrimary"
              component={motion.h2}
              variants={titleVariants}
              align="center"
            >
              Page Not Found
            </Typography>
          </Box>
        </Container>
      </Section>
    </MainLayout>
  );
};

export default NotFound;
