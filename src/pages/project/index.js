import {
  Chip, Container, Divider, Grid, Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { motion } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import MainLayout from 'src/components/layouts/main-layout';
import ProjectButtonUrl from 'src/components/shared/project-button-url';
import ProjectFooter from 'src/components/shared/project-footer';
import ProjectHero from 'src/components/shared/project-hero';
import { transition } from 'src/utils/animate';

/**
 * Style
 */
const useStyles = makeStyles((theme) => ({
  images: {
    objectFit: 'contain',
    width: '100%',
    maxHeight: '70vh',
  },
  description: {
    fontSize: '1.3em',
  },
  github: {
    width: 250,
    height: 70,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 35,
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  githubBanner: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
    height: '100%',
    borderRadius: 35,
  },
  githubText: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 3),
    color: theme.palette.text.tertiary,
  },
}));

/**
 * animasi varian
 */
const contentVariants = {
  hidden: {
    opacity: 0,
    y: '20vh',
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...transition,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      ...transition,
    },
  },
};

/**
 * Komponen utama
 * @param {String} slug
 * @returns
 */
const Project = () => {
  const history = useHistory();
  const { slug } = useParams();
  const classes = useStyles();

  // redux state
  const { projects } = useSelector((state) => state.workReducer);
  const project = useSelector((state) => state.workReducer.projects.find(
    (result) => result.slug === slug,
  ));

  // state
  const [nextProject, setNextProject] = React.useState(null);

  // cek apakan project dengan slug yang dikirim ada atau tidak
  React.useEffect(() => {
    if (project) {
      for (let i = 0; i < projects.length; i += 1) {
        if (projects[i].slug === slug) {
          if (projects[i + 1] === undefined) {
            setNextProject(projects[0]);
          } else {
            setNextProject(projects[i + 1]);
          }
        }
      }
    } else {
      history.push('/404');
    }
  }, [slug, projects, project, history, setNextProject]);

  if (project) {
    return (
      <MainLayout pageTitle={project.name}>
        <section id="project-hero">
          <ProjectHero
            bannerColor={project.bannerColor}
            heroImage={project.heroImage}
            name={project.name}
            category={project.category}
          />
        </section>

        <motion.section
          id="project-content"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={contentVariants}
        >
          {project.details.map((detail) => (
            <React.Fragment key={detail.title}>
              <Container maxWidth="md">
                <Grid container spacing={5} py={10}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="textSecondary">
                      ...
                      {' '}
                      {detail.title}
                    </Typography>
                  </Grid>

                  {detail.description !== null && (
                    <Grid item xs={12}>
                      <p className={classes.description}>
                        {detail.description}
                      </p>
                    </Grid>
                  )}

                  {detail.images.length !== 0 && (
                    <Grid
                      item
                      xs={12}
                      container
                      spacing={3}
                      sx={{ display: 'flex', justifyContent: 'center' }}
                    >
                      {detail.images.map((image) => (
                        <Grid
                          item
                          key={image}
                          md={detail.images.length > 1 ? 3 : 12}
                          sm={detail.images.length > 1 ? 4 : 12}
                          xs={detail.images.length > 1 ? 6 : 12}
                        >
                          <img
                            src={image}
                            alt={detail.title}
                            className={classes.images}
                            loading="lazy"
                          />
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Grid>
              </Container>

              <Divider />
            </React.Fragment>
          ))}

          <Container maxWidth="md">
            <Grid container spacing={3} py={10}>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="textSecondary">
                  ... Technology Used
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {project.technology.map((tag) => (
                  <Chip key={tag} label={tag.toUpperCase()} sx={{ m: 1 }} />
                ))}
              </Grid>
            </Grid>
          </Container>

          <Divider />

          <Container maxWidth="md">
            <Grid container spacing={3} py={10}>
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <ProjectButtonUrl
                  title="Github"
                  url={project.url}
                  bannerColor={project.bannerColor}
                />
              </Grid>
            </Grid>
          </Container>
        </motion.section>

        <section id="project-footer">
          {nextProject !== null && (
          <ProjectFooter
            slug={nextProject.slug}
            name={nextProject.name}
            bannerColor={nextProject.bannerColor}
          />
          )}
        </section>
      </MainLayout>
    );
  }

  return null;
};

export default Project;
