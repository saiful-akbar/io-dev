import { Typography, Container, Box } from '@mui/material';
import MainLayout from 'src/layouts/MainLayout';

export default function About() {
  return (
    <MainLayout title="About">
      <Container>
        <Box pt={15}>
          <Typography variant="h1">About</Typography>
        </Box>
      </Container>
    </MainLayout>
  );
}
