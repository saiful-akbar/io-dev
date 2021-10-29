import { Container } from '@mui/material';
import Hero from 'src/components/Hero';
import MainLayout from 'src/layouts/MainLayout';

export default function Custom500() {
  return (
    <MainLayout title="500">
      <Container maxWIdth="md">
        <Hero leftTitle="500_" rightTitle="Internal server error" />
      </Container>
    </MainLayout>
  );
}
