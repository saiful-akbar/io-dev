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
import { transition } from "src/utils/animate";

/**
 * animate variants
 */
const animateVariants = {
  tab: {
    hidden: {
      opacity: 0,
      y: "20vh",
    },
    visible: {
      opacity: 1,
      y: 0,
      transition,
    },
    exit: {
      opacity: 0,
      transition,
    },
  },
};

/**
 * Komponen utama
 * @returns
 */
const Work = (props) => {
  const { history, location } = props;
  const qs = new URLSearchParams(location.search);
  const qsCategory = qs.get("category") === null ? "web" : qs.get("category");

  // redux
  const { categories, projects } = useSelector((state) => state.workReducer);
  const resultCategory = categories.find(
    (result) => result.toLowerCase() === qsCategory.toLowerCase()
  );

  // state
  const [value, setValue] = React.useState(
    resultCategory ? resultCategory : "web"
  );

  // handle change tab
  const handleChangeTab = (e, value) => {
    setValue(value.toLowerCase());
    history.push(`/?category=${value.toLowerCase()}`);
  };

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
              variants={animateVariants.tab}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <TabList onChange={handleChangeTab}>
                {categories.map((category) => (
                  <Tab label={category} value={category} key={category} />
                ))}
              </TabList>
            </motion.div>

            {/* project item */}
            <Grid container>
              {projects.map(
                (project) =>
                  project.category === value && (
                    <Grid item xs={12} my={7} key={project.slug}>
                      <ProjectCard
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
