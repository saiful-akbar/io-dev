import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * Style
 */
const useStyles = makeStyles((theme) => ({
  button: {
    width: 250,
    height: 70,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 35,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  buttonBanner: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
    height: '100%',
    borderRadius: 35,
  },
  buttonText: {
    fontSize: '1.3em',
    fontWeight: 500,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 3),
    color: theme.palette.text.tertiary,
  },
}));

/**
 * animati transisi
 * @returns
 */
const transition = {
  duration: 0.8,
  ease: [0.70, 0.25, 0.1, 1.0],
};

/**
 * komponen utama
 * @param {string} title
 * @param {string} url
 * @param {string} bannerColor
 * @returns
 */
const ProjectButtonUrl = ({ title, url, bannerColor }) => {
  const classes = useStyles();
  const [buttonHover, setButtonHover] = React.useState(false);

  return (
    <motion.a
      className={classes.button}
      href={url}
      target="_blank"
      rel="noreferrer"
      onHoverStart={() => setButtonHover(true)}
      onHoverEnd={() => setButtonHover(false)}
    >
      <motion.div
        className={classes.buttonBanner}
        style={{ backgroundColor: bannerColor }}
        transition={{ ...transition }}
        animate={{ width: buttonHover ? 70 : '100%' }}
      />

      <div className={classes.buttonText}>
        {title}
        {' '}
        <Box
          display="flex"
          alignItems="center"
          ml={3}
          component={motion.div}
          transition={{ ...transition }}
          animate={{ x: buttonHover ? 50 : 0 }}
        >
          <ArrowForwardIcon style={{ fontSize: 30 }} />
        </Box>
      </div>
    </motion.a>
  );
};

ProjectButtonUrl.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  bannerColor: PropTypes.string.isRequired,
};

export default ProjectButtonUrl;
