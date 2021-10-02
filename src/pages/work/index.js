import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Container, Grid } from "@mui/material";
import Tab from "@mui/material/Tab";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
import MainLayout from "src/components/layouts/main-layout";
import Hero from "src/components/shared/hero";
import Project from "src/components/shared/project";

// animate variants
const sectionVariants = {
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

const Work = () => {
  // redux state
  const { categories, projects } = useSelector((state) => state.workReducer);

  // tab value
  const [value, setValue] = React.useState("web");

  // render element
  return (
    <MainLayout pageTitle="Work">
      {/* section hero */}
      <motion.section
        id="hero"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Container>
          <Hero title="Work" />
        </Container>
      </motion.section>
      {/* end section hero */}

      {/* section project list */}
      <motion.section
        id="content"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Container>
          {/* tab project list */}
          <TabContext value={value}>
            <TabList onChange={(e, newValue) => setValue(newValue)}>
              {categories.map((category) => (
                <Tab label={category} value={category} key={category} />
              ))}
            </TabList>
            {/* end tab project list */}

            {/* project list */}

            <AnimatePresence exitBeforeEnter>
              <Grid container spacing={2} key={value}>
                {projects.map(
                  (project) =>
                    project.category === value && (
                      <Grid item xs={12} key={project.slug}>
                        <Project
                          name={project.name}
                          year={project.year}
                          category={project.category}
                          bannerColor={project.bannerColor}
                          slug={project.slug}
                          image={project.heroImage}
                        />
                      </Grid>
                    )
                )}
              </Grid>
            </AnimatePresence>
            {/* end project list */}
          </TabContext>
        </Container>
      </motion.section>
      {/* end section project list */}
    </MainLayout>
  );
};

export default Work;
