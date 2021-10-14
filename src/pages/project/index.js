import {
  Container,
  Box,
  Grid,
  Typography,
  Divider,
  Chip,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import MainLayout from "src/components/layouts/main-layout";
import ProjectHero from "src/components/shared/project-hero";
import ProjectFooter from "src/components/shared/project-footer";
import { motion } from "framer-motion";

/**
 * Komponen utama
 * @param {String} slug
 * @returns
 */
const Project = (props) => {
  const { match, history } = props;
  const { slug } = match.params;
  const [nextProject, setNextProject] = React.useState(null);

  // redux
  const { transition } = useSelector((state) => state.animateReducer);
  const { projects } = useSelector((state) => state.workReducer);
  const project = useSelector((state) =>
    state.workReducer.projects.find((result) => result.slug === slug)
  );

  const animateVariants = {
    content: {
      hidden: {
        opacity: 0,
        y: "25vh",
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          ...transition,
          staggerChildren: 0.02,
        },
      },
      exit: {
        opacity: 0,
        y: "-10vh",
        transition: {
          ...transition,
        },
      },
    },
  };

  // cek apakan project dengan slug yang dikirim ada atau tidak
  React.useEffect(() => {
    if (project) {
      for (let i = 0; i < projects.length; i++) {
        if (projects[i].slug === slug) {
          if (projects[i + 1] === undefined) {
            setNextProject(projects[0]);
          } else {
            setNextProject(projects[i + 1]);
          }
        }
      }
    } else {
      history.push("/404");
    }
  }, [slug, projects, project, history, setNextProject]);

  return (
    <MainLayout pageTitle={project && project.name}>
      <section id="project-hero">
        {project !== null && (
          <ProjectHero
            bannerColor={project.bannerColor}
            heroImage={project.heroImage}
            name={project.name}
            category={project.category}
          />
        )}
      </section>

      <Box
        component={motion.section}
        variants={animateVariants.content}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Container maxWidth="md">
          <Grid container spacing={3} py={10}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="textSecondary">- Overview -</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae
                voluptate ipsa esse neque fugiat iste magni suscipit! A
                laboriosam voluptatem, iure incidunt architecto nulla sit minus
                corporis delectus excepturi? Dicta!
              </Typography>
            </Grid>
          </Grid>
        </Container>

        <Divider />

        <Container maxWidth="md">
          <Grid container spacing={3} py={10}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="textSecondary">- UI -</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo corporis delectus laudantium id exercitationem,
                placeat molestiae quasi ipsum vel hic iure minima dolorem
                voluptas non sapiente libero reiciendis? Tenetur recusandae cum
                officiis, sed, inventore consequuntur modi, repudiandae ab odit
                perferendis aut fugiat. Modi esse qui quia quis, iure alias
                assumenda hic. Quasi ipsam nostrum tempore iste iusto! Vitae
                incidunt voluptatibus neque illum qui veritatis temporibus
                provident numquam, cumque quod, ipsum, molestiae consequatur
                error tempore eos.
              </Typography>
            </Grid>
          </Grid>
        </Container>

        <Divider />

        <Container maxWidth="md">
          <Grid container spacing={3} py={10}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="textSecondary">- Tags -</Typography>
            </Grid>
             <Grid item xs key={tag}>
              {project !== null && project.tags.map((tag) => (
                <Chip label={tag.toLowerCase()} sx={{ mx: 1 }} />      
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>

      <section id="project-footer">
        {nextProject !== null && <ProjectFooter next={nextProject} />}
      </section>
    </MainLayout>
  );
};

export default Project;
