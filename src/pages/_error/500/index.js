import { Container } from '@mui/material';
import React from 'react';
import MainLayout from 'src/components/layouts/main-layout';
import Hero from 'src/components/shared/hero';

const InternalServerError = () => (
  <MainLayout pageTitle="500" pt={25}>
    <Container>
      <Hero title="500" />
    </Container>
  </MainLayout>
);

export default InternalServerError;
