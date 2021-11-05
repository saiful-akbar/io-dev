import { Box, Container, Chip, Grid, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import ProjectDetail from "src/components/ProjectDetail";
import ProjectFooter from "src/components/ProjectFooter";
import ProjectHeader from "src/components/ProjectHeader";
import ProjectHero from "src/components/ProjectHero";
import MainLayout from "src/layouts/MainLayout";
import actionType from "src/redux/actionType";
import ProjectFetch from "src/utils/projectFetch";

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

      <section id="project-detail">
        {projectData.details.map((detail, key) => (
          <ProjectDetail data={detail} key={key} />
        ))}

        <Box my={10} component="section" id="tags">
          <Container maxWidth="md">
            <Grid container spacing={1}>
              <Grid item xs={12} mb={5}>
                <Typography variant="subtitle2" color="textSecondary">
                  _Tags
                </Typography>
              </Grid>

              {projectData.tags.map((tag) => (
                <Grid item key={tag}>
                  <Chip label={tag} />
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
