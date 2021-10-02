import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import MainLayout from "src/components/layouts/main-layout";
import Hero from "src/components/shared/hero";

const Work = () => {
  return (
    <MainLayout pageTitle="Work">
      <section id="hero">
        <Container>
          <Hero title="Work" />
        </Container>
      </section>

      <section id="content">
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" color="textPrimary">
                Halaman
              </Typography>
              <Typography variant="h2" color="textSecondary">
                Work
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </section>
    </MainLayout>
  );
};

export default Work;
