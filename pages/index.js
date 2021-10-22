import { Typography, Container, Box } from '@mui/material';
import MainLayout from 'src/layouts/MainLayout';

export default function Work() {
  return (
    <MainLayout title="Work">
      <Container>
        <Box pt={15}>
          <Typography variant="h1">Work</Typography>
        </Box>
      </Container>
    </MainLayout>
  );
}
