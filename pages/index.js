import { Container, Grid } from '@mui/material';
import Hero from 'src/components/Hero';
import MainLayout from 'src/layouts/MainLayout';
import ProjectClass from 'src/utils/class/ProjectClass';
import ProjectCard from 'src/components/ProjectCard';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import actionType from 'src/redux/actionType';
import { useEffect } from 'react';

/**
 * komponen utama
 * @param {Array} project
 * @returns
 */
export default function Work({ projects }) {
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
    <MainLayout title="Work">
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Hero
              leftTitle={['W', 'o', 'r', 'k', '_']}
              rightTitle={`v${process.env.APP_VERSION}`}
            />
          </Grid>

          <Grid
            item
            xs={12}
            mt={10}
            container
            spacing={3}
          >
            {projects.map((project) => (
              <Grid item xs={12} py={10} key={project.id}>
                <ProjectCard
                  bannerColor={project.bannerColor}
                  image={project.heroImage}
                  name={project.name}
                  category={project.category}
                  year={project.year}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

      </Container>
    </MainLayout>
  );
}

/**
 * Work prop types
 */
Work.propTypes = {
  projects: PropTypes.array.isRequired,
};

/**
 * request data project dari api server
 * @returns
 */
export function getStaticProps() {
  const project = new ProjectClass();
  const result = project.all();

  return {
    props: {
      projects: result,
    },
  };
}
