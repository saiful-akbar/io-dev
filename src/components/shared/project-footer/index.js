import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Container, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import actionType from 'src/reducer/actionType';
import { transition } from 'src/utils/animate';

/**
 * Style
 */
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minHeight: '40vh',
    position: 'relative',
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%',
  },
  container: {
    pointerEvents: 'none',
    position: 'absolute',
  },
  textTertiary: {
    color: theme.palette.text.tertiary,
  },
}));

/**
 * Animasi varian
 * @param {*} param0
 * @returns
 */

const titleVariants = {
  hidden: {
    opacity: 0,
    y: '20vh',
    skewY: 5,
  },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition,
  },
  exit: {
    opacity: 0,
    transition,
  },
};

/**
 * komponen utama
 * @param {*} param0
 * @returns
 */
const ProjectFooter = ({ slug, name, bannerColor }) => {
  const classes = useStyles();
  const history = useHistory();
  const ref = React.useRef(null);

  // redux
  const dispatch = useDispatch();

  // state
  const [exit, setExit] = React.useState({
    y: 0,
    opacity: 0,
    originY: 1,
    transition,
  });

  // fungsi handle click go to next project
  const handleClick = () => {
    const { top } = ref.current.getBoundingClientRect();

    // set animasi exit
    setExit({
      height: window.innerHeight,
      y: -top,
      opacity: 1,
      originY: 1,
      transition: {
        ...transition,
      },
    });

    // ubah value sharedlayout pada workReducer
    dispatch({
      type: actionType.setWorkSharedLayout,
      value: true,
    });

    // push
    history.push(`/project/${slug}`);
  };

  return (
    <motion.footer
      ref={ref}
      onClick={handleClick}
      className={classes.root}
      transition={transition}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={{
        hidden: {
          opacity: 0,
          y: '20vh',
          originY: 1,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition,
        },
        exit: {
          ...exit,
        },
      }}
    >
      <motion.div
        style={{ backgroundColor: bannerColor, originY: 1 }}
        className={classes.banner}
        transition={transition}
        whileHover={{ scaleY: 1.05, originY: 1 }}
        layout
      />

      <Container
        className={classes.container}
        component={motion.div}
        variants={titleVariants}
      >
        <Grid container spacing={2} display="flex" alignItems="center">
          <Grid item md={2} xs={12}>
            <Typography variant="subtitle1" className={classes.textTertiary}>
              Next
            </Typography>
          </Grid>

          <Grid item md={9} xs={12}>
            <Typography variant="h5" className={classes.textTertiary}>
              {name}
            </Typography>
          </Grid>

          <Grid item md={1} xs={12}>
            <ArrowForwardIcon
              className={classes.textTertiary}
              style={{ fontSize: 35 }}
            />
          </Grid>
        </Grid>
      </Container>
    </motion.footer>
  );
};

ProjectFooter.propTypes = {
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  bannerColor: PropTypes.string.isRequired,
};

export default ProjectFooter;
