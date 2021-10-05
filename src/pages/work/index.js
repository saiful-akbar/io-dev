import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Container, Grid, Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useSelector } from "react-redux";
import MainLayout from "src/components/layouts/main-layout";
import Footer from "src/components/shared/footer";
import Hero from "src/components/shared/hero";
import ProjectCard from "src/components/shared/project-card";
import Section from "src/components/shared/section";

/**
 * Style
 */
const useStyles = makeStyles((theme) => ({
  tab: {
    [theme.breakpoints.down("md")]: {
      position: "sticky",
      top: 0,
      zIndex: theme.zIndex.appBar,
      backgroundColor: theme.palette.background.default,
      width: "100%",
      padding: theme.spacing(1, 0),
      // border: "1px solid black",
    },
  },
}));

/**
 * Komponen utama
 * @returns
 */
const Work = () => {
  const classes = useStyles();

  // redux
  const result = useSelector((state) => state.workReducer);

  // state
  const [value, setValue] = React.useState("web");
  const [work, setWork] = React.useState(null);

  React.useEffect(() => {
    setWork(result);
  }, [result, setWork]);

  return (
    <MainLayout pageTitle="Work" pt={20}>
      <Container>
        <Section id="hero">
          <Hero title="Work" />
        </Section>

        {/* project list */}
        <TabContext value={value}>
          <Section id="project-tab" className={classes.tab}>
            <TabList onChange={(e, newValue) => setValue(newValue)}>
              {work !== null &&
                work.categories.map((category) => (
                  <Tab label={category} value={category} key={category} />
                ))}
            </TabList>
          </Section>

          {/* project item */}
          <Box px={1}>
            <Grid container spacing={2}>
              {work !== null &&
                work.projects.map(
                  (project) =>
                    project.category === value && (
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
                    )
                )}
            </Grid>
          </Box>
        </TabContext>
      </Container>

      <Section id="footer">
        <Footer />
      </Section>
    </MainLayout>
  );
};

export default Work;
