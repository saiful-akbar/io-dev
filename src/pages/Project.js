import React from "react";
import MainLayout from "src/layouts/MainLayout";
import ProjectFetch from "src/utils/projectFetch";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import actionType from "src/redux/actionType";
import { Box, Container, Grid } from "@mui/material";
import ProjectHeader from "src/components/ProjectHeader"
import ProjectHero from "src/components/ProjectHero"
import ProjectFooter from "src/components/ProjectFooter"

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

      <Box id="project-hero" component="section">
        <ProjectHero data={projectData} />
      </Box>

      <Box
        id="project-content"
        component="section"
        py={5}
        sx={{ minHeight: '100vh' }}
      >
        <Container maxWidth="md">
          <Grid container spacing={3}>
            {[...new Array(10)].map((i, key) => (
              <Grid item xs={12} key={key} my={5}>
                <p>
                  Lorem ipsum dolor sit, amet consectetur, adipisicing elit. Placeat nesciunt quisquam, voluptas laborum eos eius magni vero voluptate maxime consequatur? Tempora neque animi beatae fugit accusantium quisquam suscipit sed voluptatum culpa voluptatem, eum nesciunt! Quasi, nemo, rem obcaecati repellendus eius praesentium et natus ipsum expedita consequatur a, debitis provident, eligendi.
                </p>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box id="project-footer" component="section">
        <ProjectFooter data={projectNext} />
      </Box>
    </MainLayout>
  );
};

export default Project;