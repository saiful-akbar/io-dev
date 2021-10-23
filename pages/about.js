import { Container } from '@mui/material';
import Hero from 'src/components/Hero';
import MainLayout from 'src/layouts/MainLayout';

export default function About() {
  return (
    <MainLayout title="About">
      <Container>
        <Hero
          leftTitle={['A', 'b', 'o', 'u', 't', '_']}
          rightTitle={`v${process.env.APP_VERSION}`}
        />
      </Container>
    </MainLayout>
  );
}
