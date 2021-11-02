import { Container } from "@mui/material";
import React from "react";
import Hero from "src/components/Hero";
import MainLayout from "src/layouts/MainLayout";

/**
 * Komponen utama Work
 */
const About = () => {
  return (
    <MainLayout title="About" pt={20} pb={5}>
      <Container maxWidth="md">
        <Hero leftTitle="About_" rightTitle={process.env.REACT_APP_VERSION} />
      </Container>
    </MainLayout>
  );
};

export default About;
