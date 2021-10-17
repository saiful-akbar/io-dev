import { Grid, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import actionType from 'src/reducer/actionType';
import { transition } from 'src/utils/animate';

/**
 * Style
 */
const useStyles = makeStyles((theme) => ({
  hero: {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(15, 0, 10, 0),
    [theme.breakpoints.down('lg')]: {
      alignItems: 'flex-start',
    },
  },
  heroImage: {
    objectFit: 'contain',
    width: '100%',
    maxHeight: '70vh',
  },
  projectName: {
    textAlign: 'center',
    marginBottom: theme.spacing(3),
    color: theme.palette.text.tertiary,
    lineHeight: '100%',
    fontWeight: 500,
    fontSize: '5em',
    [theme.breakpoints.down('lg')]: {
      fontSize: '4em',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '3em',
    },
  },
  projectCategory: {
    textAlign: 'center',
    color: theme.palette.text.tertiary,
    lineHeight: '100%',
    fontWeight: 500,
    fontSize: '3em',
    [theme.breakpoints.down('lg')]: {
      fontSize: '2em',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '1.3em',
    },
  },
}));

/**
 * Animasi varian
 */

const imageVariants = {
  hidden: {
    opacity: 0,
    y: '20vh',
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
};

const titleVariants = {
  hidden: {
    opacity: 0,
    y: '20vh',
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
};

/**
 * Komponen utama
 * @param {Object} project
 * @returns
 */
const ProjectHero = ({
  bannerColor, heroImage, name, category,
}) => {
  const classes = useStyles();
  const { ref, inView } = useInView();

  // redux dispatch
  const dispatch = useDispatch();

  // redux state
  const { header } = useSelector((state) => state.globalReducer);
  const { sharedLayout } = useSelector((state) => state.workReducer);

  // state
  const [opacity] = React.useState(sharedLayout ? 1 : 0);
  const [y] = React.useState(sharedLayout ? 0 : '20vh');

  // set warna header ketika element ada dalam viewport
  React.useEffect(() => {
    const newHeader = header;

    if (inView) {
      newHeader.color = 'light';
    } else {
      newHeader.color = 'dark';
    }

    dispatch({
      type: actionType.setGlobalHeader,
      value: newHeader,
    });

    return () => {
      newHeader.color = 'dark';
      dispatch({
        type: actionType.setGlobalHeader,
        value: newHeader,
      });
    };

    // eslint-disable-next-line
  }, [dispatch, inView]);

  return (
    <motion.div
      ref={ref}
      className={classes.hero}
      style={{ backgroundColor: bannerColor }}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={{
        hidden: {
          opacity,
          y,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            ...transition,
            when: 'beforeChildren',
            staggerChildren: 0.05,
          },
        },
        exit: {
          opacity: 0,
          transition: {
            ...transition,
            staggerChildren: 0.05,
          },
        },
      }}
    >
      <Container>
        <Grid container spacing={5}>
          <Grid
            item
            mb={3}
            md={6}
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <motion.img
              loading="eager"
              src={heroImage}
              alt={name}
              className={classes.heroImage}
              variants={imageVariants}
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <motion.h1 className={classes.projectName} variants={titleVariants}>
              {name}
            </motion.h1>

            <br />

            <motion.h1
              className={classes.projectCategory}
              variants={titleVariants}
            >
              --
              {' '}
              {category.toUpperCase()}
              {' '}
              --
            </motion.h1>
          </Grid>
        </Grid>
      </Container>
    </motion.div>
  );
};

ProjectHero.propTypes = {
  bannerColor: PropTypes.string.isRequired,
  heroImage: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default ProjectHero;
