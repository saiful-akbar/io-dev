import { Container, Grid } from "@mui/material";
import React from "react";
import Hero from "src/components/Hero";
import MainLayout from "src/layouts/MainLayout";
import { useDispatch } from "react-redux";
import actionType from "src/redux/actionType";
import Footer from "src/components/Footer";

/**
 * Komponen utama Work
 */
const About = () => {
  const dispatch = useDispatch();

  // kembalihan cursor hover ke false
  React.useEffect(() => {
    dispatch({
      type: actionType.setGlobalCursorHover,
      value: false,
    });
  }, [dispatch]);

  return (
    <MainLayout title="404" pt={20} pb={2}>
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Hero leftTitle="404_" rightTitle="Not Found" />
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12} mt={10}>
            <Footer />
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  );
};

export default About;