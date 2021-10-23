import { Box, Container, Typography } from '@mui/material';
import { useEffect } from 'react';
import MainLayout from 'src/layouts/MainLayout';
import { projectAllFetch } from 'src/utils/projectFetch';

export default function Work(props) {
  useEffect(() => {
    console.log(props);
  }, []);

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

/**
 * request data project dari api server
 * @returns
 */
export async function getServerSideProps() {
  try {
    const res = await projectAllFetch();

    return {
      props: { ...res.data },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
}
