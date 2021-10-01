import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "src/components/layouts/main-layout";

const About = () => {
  return (
    <MainLayout pageTitle="About">
      <h1>Halaman About</h1>
      <Link to="/">Home</Link>
    </MainLayout>
  );
};

export default About;
