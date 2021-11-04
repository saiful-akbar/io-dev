import { Box, Container, Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import styles from "src/styles/projectDetail.module.scss";

const ProjectDetail = ({ data, ...rest }) => {
  const { title, description, subDescription } = data;

  return (
    <Box
      className={styles.root}
      mt={10}
      component="section"
      id={title.toLowerCase()}
      {...rest}
    >
      <Container maxWidth="md">
        <Grid container spacing={5}>
          <Grid item xs={12}>
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
