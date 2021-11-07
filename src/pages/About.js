import { Container } from "@mui/material";
import React from "react";
import Hero from "src/components/Hero";
import MainLayout from "src/layouts/MainLayout";
import { useDispatch } from "react-redux";
import actionType from "src/redux/actionType";

/**
 * Komponen utama Work
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

  return (
    <MainLayout title="About" pt={20} pb={5}>
      <Container maxWidth="md">
        <Hero
          leftTitle="About_"
          rightTitle={`v${process.env.REACT_APP_VERSION}`}
        />
      </Container>
    </MainLayout>
  );
};

export default About;
