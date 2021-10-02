import { Container, Grid, Typography, Box } from "@mui/material";
import React from "react";
import MainLayout from "src/components/layouts/main-layout";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      staggerChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      staggerChildren: 0.01,
    },
  },
};

const titleVariants = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -100,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const InternalServerError = () => {
  return (
    <MainLayout pageTitle="500 Internal Server Error">
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
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
                500
              </Typography>
              <Typography
                variant="h2"
                color="textPrimary"
                component={motion.h2}
                variants={titleVariants}
                align="center"
              >
                Internal Server Error
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  );
};

export default InternalServerError;
