import { Container } from '@mui/material';
import Hero from 'src/components/Hero';
import MainLayout from 'src/layouts/MainLayout';

export default function Custom404() {
  return (
    <MainLayout title="404">
      <Container>
        <Hero
          leftTitle={['4', '0', '4', '_']}
          rightTitle="Page not found"
        />
      </Container>
    </MainLayout>
  );
}
