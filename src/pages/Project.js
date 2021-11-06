import React from "react";
import { Box, Container, Chip, Grid, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { motion } from "framer-motion";
import { InView } from "react-intersection-observer";
import ProjectContent from "src/components/ProjectContent";
import ProjectFooter from "src/components/ProjectFooter";
import ProjectHeader from "src/components/ProjectHeader";
import ProjectHero from "src/components/ProjectHero";
import MainLayout from "src/layouts/MainLayout";
import actionType from "src/redux/actionType";
import ProjectFetch from "src/utils/projectFetch";
import styles from "src/styles/project.module.scss";
import transition from "src/transition";

/**
 * Animasi variant
 */
const animateVariants = {
  root: {
    hidden: {
      opacity: 0,
      y: 150,
      transition,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        ...transition,
        when: "beforeChildren",
      },
    },
    exit: {
      opacity: 0,
    },
  },
  text: {
    hidden: {
      opacity: 0,
      transition,
    },
    show: {
      opacity: 1,
      transition,
    },
    exit: {
      opacity: 0,
    },
  },
  chip: {
    hidden: {
      opacity: 0,
      scale: 0.8,
      transition,
    },
    show: {
      opacity: 1,
      scale: 1,
      transition,
    },
    exit: {
      opacity: 0,
    },
  },
};

/**
 * Komponen utam project
 *
 * @param  {Object} options.match
 * @return {React Node}
 */
const Project = ({ match }) => {
  const { slug } = match.params;
  const dispatch = useDispatch();

  // project data
  const projectFetch = new ProjectFetch();
  const projectData = projectFetch.find(slug);
  const projectNext = projectFetch.next(slug);

  // kembalikan cursor hover ke false
  React.useEffect(() => {
    dispatch({
      type: actionType.setGlobalCursorHover,
      value: false,
    });
  }, [dispatch]);

  // Jika data project tidak ada atau undefined arahkan ke 404
  if (typeof projectData === "undefined") {
    return <Redirect to="/404" />;
  }

  return (
    <MainLayout title={projectData.name}>
      <ProjectHeader url={projectData.url} />

      <section id="project-hero">
        <ProjectHero data={projectData} />
      </section>

      <section id="project-content" className={styles.projectContent}>
        {projectData.details.map((detail, key) => (
          <ProjectContent data={detail} key={key} />
        ))}

        <Box
          my={10}
          component={motion.div}
          initial="hidden"
          animate="show"
          exit="exit"
          variants={animateVariants.root}
        >
          <Container maxWidth="sm">
            <Grid container spacing={1}>
              <Grid item xs={12} mb={5}>
                <InView triggerOnce>
                  {({ inView, ref }) => (
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      component={motion.h6}
                      ref={ref}
                      initial="hidden"
                      animate={inView ? "show" : "hidden"}
                      exit="exit"
                      variants={animateVariants.text}
                    >
                      _Tags
                    </Typography>
                  )}
                </InView>
              </Grid>

              {projectData.tags.map((tag) => (
                <Grid item key={tag}>
                  <InView triggerOnce>
                    {({ inView, ref }) => (
                      <motion.div
                        ref={ref}
                        initial="hidden"
                        animate={inView ? "show" : "hidden"}
                        exit="exit"
                        variants={animateVariants.chip}
                      >
                        <Chip label={tag} />
                      </motion.div>
                    )}
                  </InView>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </section>

      <section id="project-footer">
        <ProjectFooter data={projectNext} />
      </section>
    </MainLayout>
  );
};

export default Project;
