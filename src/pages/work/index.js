import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Container, Grid } from "@mui/material";
import Tab from "@mui/material/Tab";
import { motion } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
import MainLayout from "src/components/layouts/main-layout";
import Footer from "src/components/shared/footer";
import Hero from "src/components/shared/hero";
import ProjectCard from "src/components/shared/project-card";
import Section from "src/components/shared/section";

/**
 * animation variants
 */
const tabVariants = {
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

/**
 * Komponen utama
 * @returns
 */
const Work = () => {
  const { categories, projects } = useSelector((state) => state.workReducer);
  const [value, setValue] = React.useState("web");

  return (
    <MainLayout pageTitle="Work" pt={20}>
      <Container>
        <section id="hero">
          <Hero title="Work" />
        </section>

        {/* project list */}
        <section id="content">
          <TabContext value={value}>
            <motion.div
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <TabList onChange={(e, newValue) => setValue(newValue)}>
                {categories.map((category) => (
                  <Tab label={category} value={category} key={category} />
                ))}
              </TabList>
            </motion.div>

            {/* project item */}
            <Grid container spacing={2}>
              {projects.map((project) => {
                if (project.category === value) {
                  return (
                    <Grid item xs={12} key={project.slug}>
                      <ProjectCard
                        name={project.name}
                        year={project.year}
                        category={project.category}
                        bannerColor={project.bannerColor}
                        slug={project.slug}
                        image={project.heroImage}
                      />
                    </Grid>
                  );
                }

                return null;
              })}
            </Grid>
          </TabContext>
        </section>
      </Container>

      <Section id="footer">
        <Footer />
      </Section>
    </MainLayout>
  );
};

export default Work;
