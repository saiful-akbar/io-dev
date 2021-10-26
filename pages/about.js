import { Container } from '@mui/material';
import Hero from 'src/components/Hero';
import MainLayout from 'src/layouts/MainLayout';
import { useDispatch } from 'react-redux';
import actionType from 'src/redux/actionType';
import { useEffect } from 'react';

/**
 * komponen utama
 * @returns
 */
export default function About() {
  // redux
  const dispatch = useDispatch();

  // kembalihan cursor hover ke false
  useEffect(() => {
    dispatch({
      type: actionType.setGlobalCursorHover,
      value: false,
    });
  }, [dispatch]);

  return (
    <MainLayout title="About">
      <Container>
        <Hero
          leftTitle="About."
          rightTitle={`v${process.env.APP_VERSION}`}
        />
      </Container>
    </MainLayout>
  );
}
