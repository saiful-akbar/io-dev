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

  // kembalihan cursor hover ke false
  React.useEffect(() => {
    dispatch({
      type: actionType.setGlobalCursorHover,
      value: false,
    });
  }, [dispatch]);

  return (
    <MainLayout title="404" pt={20} pb={5}>
      <Container maxWidth="md">
        <Hero leftTitle="404_" rightTitle={process.env.REACT_APP_VERSION} />
      </Container>
    </MainLayout>
  );
};

export default About;
