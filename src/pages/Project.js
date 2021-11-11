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
      opacity: 1,
      y: 0,
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

  React.useEffect(() => {
    // kembalikan cursor hover ke false
    dispatch({
      type: actionType.setGlobalCursorHover,
      value: false,
    });

    // set warna background #root
    dispatch({
      type: actionType.setGlobalBgColor,
      value: "#f4f4f4",
    });
  }, [dispatch, projectData]);

  // Jika data project tidak ada atau undefined arahkan ke 404
  if (typeof projectData === "undefined") {
    return <Redirect to="/404" />;
  }

  return (
    <MainLayout title={`Work - ${projectData.name}`}>

      {/* header */}
      <ProjectHeader url={projectData.url} />

      {/* hero */}
      <section id="project-hero">
        <ProjectHero data={projectData} />
      </section>

      {/* content */}
      <section id="project-content" className={styles.projectContent}>
        {projectData.details.map((detail, key) => (
          <ProjectContent
            key={key}
            data={detail}
            color={projectData.bannerColor.secondary}
          />
        ))}

        <Box
          my={10}
          component={motion.div}
          variants={animateVariants.root}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          <Container maxWidth="sm">
            <Grid container spacing={1}>
              <Grid item xs={12} mb={5}>
                <InView triggerOnce>
                  {({ inView, ref }) => (
                    <Typography
                      variant="subtitle2"
                      component={motion.h6}
                      ref={ref}
                      initial="hidden"
                      animate={inView ? "show" : "hidden"}
                      exit="exit"
                      variants={animateVariants.text}
                      sx={{
                        color: projectData.bannerColor.secondary,
                      }}
                    >
                      _Technology Used
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
      {/* end content */}

      {/* footer */}
      <section id="project-footer">
        <ProjectFooter data={projectNext} />
      </section>
    </MainLayout>
  );
};

export default Project;