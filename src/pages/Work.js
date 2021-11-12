import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Container, Grid, Tab } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "src/components/Footer";
import Hero from "src/components/Hero";
import ProjectCard from "src/components/ProjectCard";
import MainLayout from "src/layouts/MainLayout";
import actionType from "src/redux/actionType";
import transition from "src/transition";
import CategoryFetch from "src/utils/categoryFetch";
import ProjectFetch from "src/utils/projectFetch";

/**
 * animasi variant
 */
const tabVariants = {
  hidden: {
    opacity: 0,
    y: 150,
  },
  show: {
    opacity: 1,
    y: 0,
    transition,
  },
  exit: {
    opacity: 0,
  },
};

/**
 * Komponen utama Work
 */
const Work = ({ history, location }) => {
  const dispatch = useDispatch();
  const { appVersion } = useSelector((state) => state.globalReducer);

  const categoryFetch = new CategoryFetch();
  const projectFetch = new ProjectFetch();

  // ambil semua data category dan project
  const categories = categoryFetch.all();
  const projects = projectFetch.all();

  // query string seacrh params
  const qs = new URLSearchParams(location.search);
  const categoryParams = qs.get("category") || "web";

  // state
  const [tabValue, setTabValue] = React.useState(categoryParams);

  React.useEffect(() => {
    // kembalihan cursor hover ke false
    dispatch({
      type: actionType.setGlobalCursorHover,
      value: false,
    });

    // set warna background root element
    dispatch({
      type: actionType.setGlobalBgColor,
      value: "#fff",
    });
  }, [dispatch]);

  // fungsi handle change tab
  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
    history.push(`/?category=${newValue}`);
  };

  // handle cursor hover
  const handleCursorHover = (value) => {
    dispatch({
      type: actionType.setGlobalCursorHover,
      value,
    });
  };

  return (
    <MainLayout title="Work" pt={20} pb={2}>
      <Container maxWidth="md">
        <Grid container spacing={3}>
        
          {/* hero */}
          <Grid item xs={12}>
            <Hero
              leftTitle="Work_"
              rightTitle={appVersion}
            />
          </Grid>

          {/* content */}
          <Grid item xs={12} mt={10}>
            <TabContext value={tabValue}>
              <Grid container>

                {/* tab category project */}
                <Grid
                  item
                  xs={12}
                  component={motion.div}
                  variants={tabVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  <TabList onChange={handleChangeTab} aria-label="tab project">
                    {categories.map((category) => {
                      const projectPerCategory = projects.filter(
                        (project) => project.category === category
                      );

                      return (
                        <Tab
                          key={category}
                          label={category.toUpperCase()}
                          value={category}
                          sx={{ fontWeight: "bold" }}
                          onMouseEnter={() => handleCursorHover(true)}
                          onMouseLeave={() => handleCursorHover(false)}
                          disabled={
                            projectPerCategory.length <= 0 ? true : false
                          }
                        />
                      );
                    })}
                  </TabList>
                </Grid>
                {/* end teb acategory project */}

                {/* project list */}
                <Grid item xs={12}>
                  {categories.map((category) => (
                    <TabPanel key={category} value={category.toLowerCase()}>
                      <Grid container>
                        {projects.map((project) => {
                          return (
                            project.category === category && (
                              <Grid item xs={12} my={7} key={project.slug}>
                                <ProjectCard project={project} />
                              </Grid>
                            )
                          );
                        })}
                      </Grid>
                    </TabPanel>
                  ))}
                </Grid>
                {/* end project list */}

              </Grid>
            </TabContext>
          </Grid>
          {/* end content */}

          {/* footer */}
          <Grid item xs={12}>
            <Footer />
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  );
};

export default Work;