import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "src/components/layouts/main-layout";

const Home = () => {
  return (
    <MainLayout pageTitle="Home">
      <Typography variant="h1" color="textPrimary">
        Halaman
      </Typography>
      <Typography variant="h2" color="textSecondary">
        Home
      </Typography>

      <Link to="/about">about</Link>
    </MainLayout>
  );
};

export default Home;
