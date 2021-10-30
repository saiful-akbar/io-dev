import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import ProjectHero from 'src/components/ProjectHero';
import ProjectHeader from 'src/components/ProjectHeader';
import MainLayout from 'src/layouts/MainLayout';
import actionType from 'src/redux/actionType';
import iodev from 'src/database/iodev';
import { Container, Grid } from '@mui/material';

/**
 * Komponen utama ProjectDetail
 *
 * @param {Object} project
 * @returns
 */
function ProjectDetail({ project }) {
  // redux
  const dispatch = useDispatch();

  // kembalihan cursor hover ke false
  React.useEffect(() => {
    dispatch({
      type: actionType.setGlobalCursorHover,
      value: false,
    });
  }, [dispatch]);

  // render komponen
  return (
    <MainLayout title={project.name}>

      {/* header */}
      <ProjectHeader url={project.url} />

      {/* hero */}
      <ProjectHero
        bannerColor={project.bannerColor}
        heroImage={project.heroImage}
        name={project.name}
        category={project.category}
        year={project.year}
      />

      {/* content */}
      <Container maxWidth="md" sx={{ minHeight: '120vh' }}>
        <Grid container>
          <Grid item xs={12} mt={15}>
            Overview
          </Grid>

          <Grid item xs={12} my={5}>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad mollitia non atque facere quaerat numquam adipisci accusamus magnam rerum, aspernatur soluta, voluptate reiciendis et nihil sequi animi dignissimos! Ea, nostrum.</p>
          </Grid>
        </Grid>
      </Container>
      {/* end content */}

      {/* footer */}
    </MainLayout>
  );
}

/**
 * Prop types componen ProjectDetail
 */
ProjectDetail.propTypes = {
  project: PropTypes.object.isRequired,
};

/**
 * Buat static path untuk data project
 *
 * @returns Object
 */
export async function getStaticPaths() {
  const { projects } = iodev;

  // Dapatkan jalur yang ingin di pra-render berdasarkan slug project
  const paths = projects.map((value) => ({
    params: { slug: value.slug },
  }));

  // { fallback: false } jika slug tidak ditemukan akan diarahkan ke /404.
  return { paths, fallback: false };
}

/**
 * request data project dari database berdasarkan slug-nya
 *
 * @param {Object} params
 * @returns
 */
export async function getStaticProps({ params }) {
  const { projects } = iodev;

  // ambil data project berdasarkan slug-nya
  const project = projects.find((data) => data.slug === params.slug);

  // cek apakah data ada atau tidak
  if (!project) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  return {
    props: {
      project,
    },
  };
}

export default ProjectDetail;
