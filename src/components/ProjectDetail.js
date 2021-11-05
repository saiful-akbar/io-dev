import { Box, Container, Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import styles from "src/styles/projectDetail.module.scss";

const ProjectDetail = ({ data, ...rest }) => {
  const { title, description, subDescription, images } = data;

  return (
    <Box
      className={styles.root}
      mt={10}
      component="section"
      id={title.toLowerCase()}
      {...rest}
    >
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12} mb={3}>
            <Typography variant="subtitle2" color="textSecondary">
              _{title}
            </Typography>
          </Grid>

          {description !== null && (
            <Grid item xs={12}>
              <Typography variant="body1" color="textPrimary">
                {description}
              </Typography>
            </Grid>
          )}

          {subDescription !== null && (
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">
                {description}
              </Typography>
            </Grid>
          )}

          {images.length > 0 && (
            <Grid item xs={12}>
              <div className={styles.sectionImage}>
                {images.map((img) => (
                  <div key={img} className={styles.imageWrapper}>
                    <img
                      component="img"
                      src={img}
                      alt={title}
                      loading="lazy"
                      className={styles.image}
                    />
                  </div>
                ))}
              </div>
            </Grid>
          )}
        </Grid>
      </Container>

      <Box mt={10} sx={{ borderBottom: 1, borderColor: "divider" }} />
    </Box>
  );
};

ProjectDetail.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ProjectDetail;
