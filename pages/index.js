import { Container } from '@mui/material';
import Hero from 'src/components/Hero';
import MainLayout from 'src/layouts/MainLayout';
import { projectAllFetch } from 'src/utils/projectFetch';

export default function Work() {
  return (
    <MainLayout title="Work">
      <Container>
        <Hero
          leftTitle={['W', 'o', 'r', 'k', '_']}
          rightTitle={`v${process.env.APP_VERSION}`}
        />
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
