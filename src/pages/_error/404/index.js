import { Container } from "@mui/material";
import React from "react";
import MainLayout from "src/components/layouts/main-layout";
import Hero from "src/components/shared/hero";

const NotFound = () => {
  return (
    <MainLayout pageTitle="404" pt={25}>
      <Container>
        <Hero title="404" />
      </Container>
    </MainLayout>
  );
};

export default NotFound;
