import React from "react";
import MainLayout from "src/layouts/MainLayout";
import { Container } from "@mui/material";
import Hero from "src/components/Hero";
// import ProjectFetch from "src/utils/projectFetch";

/**
 * Komponen utama Work
 */
const Work = () => {
  // const projectFetch = new ProjectFetch();
  // const projects = projectFetch.all();

  return (
    <MainLayout title="Work" pt={15} pb={5}>
      <Container maxWidth="md">
        <Hero leftTitle="Work_" rightTitle={process.env.REACT_APP_VERSION} />
      </Container>
    </MainLayout>
  );
};

export default Work;
