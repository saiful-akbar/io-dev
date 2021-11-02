import React from "react";
import MainLayout from 'src/layouts/MainLayout';
import ProjectFetch from 'src/utils/projectFetch';
import { Link } from 'react-router-dom';
import { Container } from '@mui/material';

/**
 * Komponen utama Work
 */
const Work = () => {
  const projectFetch = new ProjectFetch();
  const projects = projectFetch.all();

  return (
    <MainLayout title="Work" pt={15} pb={5}>
      <Container maxWidth="md">
        <section>
          <ul>
            {projects.map((project) => (
              <li key={project.slug}>
                <Link to={`/project/${project.slug}`}>
                  <h4>{project.name}</h4>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </MainLayout>
  );
};

export default Work;