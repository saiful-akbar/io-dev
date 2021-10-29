import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Container, Grid } from '@mui/material';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Hero from 'src/components/Hero';
import ProjectCard from 'src/components/ProjectCard';
import MainLayout from 'src/layouts/MainLayout';
import actionType from 'src/redux/actionType';
import ProjectClass from 'src/utils/class/ProjectClass';
import CategoryClass from 'src/utils/class/CategoryClass';
import { motion } from 'framer-motion';
import transition from 'src/transition';
import { useRouter } from 'next/router';

/**
 * animasi variant
 */
const tabVariants = {
  hidden: {
    opacity: 0,
    y: '100%',
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ...transition,
      delay: transition.duration,
    },
  },
  exit: {
    opacity: 0,
    transition,
  },
};

/**
 * komponen utama
 * @param {Array} project
 * @returns
 */
export default function Work({ projects, categories }) {
  const router = useRouter();

  // redux
  const dispatch = useDispatch();

  // state
  const [tabValue, setTabValue] = useState('web');

  // kembalihan cursor hover ke false
  useEffect(() => {
    dispatch({
      type: actionType.setGlobalCursorHover,
      value: false,
    });
  }, [dispatch]);

  // set tabValue jika ada query string
  useEffect(() => {
    if (router.query.category !== undefined) {
      switch (router.query.category) {
        case 'web':
          setTabValue('web');
          break;

        case 'ui/ux':
          setTabValue('ui/ux');
          break;

        default:
          setTabValue('web');
          break;
      }
    }
  }, [router]);

  // fungsi handle change tab
  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
    router.push(`/?category=${newValue}`, undefined, { shallow: true });
  };

  return (
    <MainLayout title="Work">
      <Container maxWidth="md">
        <Grid container>
          <Grid item xs={12}>
            <Hero
              leftTitle="Work_"
              rightTitle={`v${process.env.APP_VERSION}`}
            />
          </Grid>

          <Grid item xs={12}>
            <TabContext value={tabValue}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  mt={10}
                  component={motion.div}
                  variants={tabVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  <TabList onChange={handleChangeTab} aria-label="tab project">
                    {categories.map((category) => (
                      <Tab
                        key={category}
                        label={category.toUpperCase()}
                        value={category.toLowerCase()}
                      />
                    ))}
                  </TabList>
                </Grid>

                <Grid item xs={12}>
                  {categories.map((category) => (
                    <TabPanel key={category} value={category.toLowerCase()}>
                      <Grid container>

                        {projects.map((project) => {
                          if (project.category.toLowerCase() === category.toLowerCase()) {
                            return (
                              <Grid item xs={12} my={7} key={project.id}>
                                <ProjectCard
                                  key={project.id}
                                  bannerColor={project.bannerColor}
                                  image={project.heroImage}
                                  name={project.name}
                                  category={project.category}
                                  year={project.year}
                                  slug={project.slug}
                                />
                              </Grid>
                            );
                          }

                          return null;
                        })}

                      </Grid>
                    </TabPanel>
                  ))}
                </Grid>
              </Grid>
            </TabContext>
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  );
}

/**
 * Work prop types
 */
Work.propTypes = {
  projects: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
};

/**
 * request data project dari api server
 * @returns
 */
export function getStaticProps() {
  const project = new ProjectClass();
  const category = new CategoryClass();

  return {
    props: {
      projects: project.all(),
      categories: category.all(),
    },
  };
}
