import { Container, Grid } from "@mui/material";
import React from "react";
import Hero from "src/components/Hero";
import MainLayout from "src/layouts/MainLayout";
import { useDispatch } from "react-redux";
import actionType from "src/redux/actionType";
// import styles from "src/styles/about.module.scss";

/**
 * Komponen About
 */
const About = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    // kembalihan cursor hover ke false
    dispatch({
      type: actionType.setGlobalCursorHover,
      value: false,
    });

    // set warna background #root
    dispatch({
      type: actionType.setGlobalBgColor,
      value: "#E2D7BE",
    });
  }, [dispatch]);

  // render komponen
  return (
    <MainLayout title="About" pt={20} pb={5}>
      <Container maxWidth="md">

        {/* hero */}
        <Hero leftTitle="About_" rightTitle="Us" />

        {/* content */}
        <Grid container spacing={3}>
          <Grid></Grid>
        </Grid>
        {/* end content */}

      </Container>
    </MainLayout>
  );
};

export default About;