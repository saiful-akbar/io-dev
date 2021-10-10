import { Container, Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import MainLayout from "src/components/layouts/main-layout";
import ProjectHero from "src/components/shared/project-hero";
import ProjectFooter from "src/components/shared/project-footer";
import { motion } from "framer-motion";

const contentVariants = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.02,
    },
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

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
  const { projects } = useSelector((state) => state.workReducer);
  const project = useSelector((state) =>
    state.workReducer.projects.find((result) => result.slug === slug)
  );

  // state

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
        py={15}
        id="project-content"
        component={motion.section}
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Container>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            modi possimus totam voluptatem sint, provident enim debitis fugit
            quisquam ipsa dignissimos nemo, perspiciatis sit sunt maxime illo
            unde, illum quibusdam facilis non. Nesciunt velit voluptas illum
            suscipit sint hic asperiores. Doloremque quidem velit, vero sequi
            magnam dolorem ab dolorum! Adipisci fugit earum eius itaque
            repudiandae hic iure pariatur. Maiores, non, quibusdam tempora quod
            nam officiis sequi ducimus, aspernatur dignissimos temporibus
            laboriosam amet delectus ad deleniti perspiciatis eos. Nihil
            sapiente ipsa beatae unde a minima cumque consequuntur doloribus
            quaerat alias, quia, molestias eveniet? Placeat vitae quo animi aut
            sit. Officia, aliquid.
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            modi possimus totam voluptatem sint, provident enim debitis fugit
            quisquam ipsa dignissimos nemo, perspiciatis sit sunt maxime illo
            unde, illum quibusdam facilis non. Nesciunt velit voluptas illum
            suscipit sint hic asperiores. Doloremque quidem velit, vero sequi
            magnam dolorem ab dolorum! Adipisci fugit earum eius itaque
            repudiandae hic iure pariatur. Maiores, non, quibusdam tempora quod
            nam officiis sequi ducimus, aspernatur dignissimos temporibus
            laboriosam amet delectus ad deleniti perspiciatis eos. Nihil
            sapiente ipsa beatae unde a minima cumque consequuntur doloribus
            quaerat alias, quia, molestias eveniet? Placeat vitae quo animi aut
            sit. Officia, aliquid.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            modi possimus totam voluptatem sint, provident enim debitis fugit
            quisquam ipsa dignissimos nemo, perspiciatis sit sunt maxime illo
            unde, illum quibusdam facilis non. Nesciunt velit voluptas illum
            suscipit sint hic asperiores. Doloremque quidem velit, vero sequi
            magnam dolorem ab dolorum! Adipisci fugit earum eius itaque
            repudiandae hic iure pariatur. Maiores, non, quibusdam tempora quod
            nam officiis sequi ducimus, aspernatur dignissimos temporibus
            laboriosam amet delectus ad deleniti perspiciatis eos. Nihil
            sapiente ipsa beatae unde a minima cumque consequuntur doloribus
            quaerat alias, quia, molestias eveniet? Placeat vitae quo animi aut
            sit. Officia, aliquid.
          </p>
        </Container>
      </Box>

      <section id="project-footer">
        {nextProject !== null && <ProjectFooter next={nextProject} />}
      </section>
    </MainLayout>
  );
};

export default Project;
