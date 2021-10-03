import { Container } from "@mui/material";
import React from "react";
import MainLayout from "src/components/layouts/main-layout";
import Footer from "src/components/shared/footer";
import Hero from "src/components/shared/hero";
import Section from "src/components/shared/section";

const About = () => {
  return (
    <MainLayout pageTitle="About Us" pt={20}>
      <Container>
        <Section id="hero">
          <Hero title="About Us" />
        </Section>
      </Container>

      <Section>
        <Footer />
      </Section>
    </MainLayout>
  );
};

export default About;
