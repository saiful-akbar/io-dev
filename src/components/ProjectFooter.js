import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import styles from "src/styles/projectFooter.module.scss";
import { useDispatch } from "react-redux";
import actionType from "src/redux/actionType";
import { Grid, Typography, Container, Icon } from "@mui/material";
import transition from "src/transition";
import TextMask from "src/components/TextMask";
import { useHistory } from "react-router";

/**
 * Komponen ProjectFooter
 *
 * @param {Object} options.data Data project next
 */
export default function ProjectFooter({ data }) {
  const ref = React.useRef(null);
  const history = useHistory();
  const { bannerColor, name, slug } = data;

  // redux state & dispatch
  const dispatch = useDispatch();

  // state animasi root
  const [rootVariants, setRootVariants] = React.useState({
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        ...transition,
        staggerChildren: 0.05,
        when: "beforeChildren",
      },
    },
    exit: {
      opacity: 0,
    },
  });

  // state animasi text
  const [textVariants, setTextVariants] = React.useState({
    hidden: {
      opacity: 0,
      y: "80%",
    },
    show: {
      opacity: 1,
      y: 0,
      transition,
    },
    exit: {
      opacity: 0,
    },
  });

  // fungsi handle style cursor ketika ada event hover
  const handleCursorHover = (value) => {
    dispatch({
      type: actionType.setGlobalCursorHover,
      value,
    });
  };

  // fungsi handle jika footer di klik
  const handleTap = () => {
    const { top } = ref.current.getBoundingClientRect();
    const newRootVariants = rootVariants;
    const newTextVariants = textVariants;

    // ubah animasi exit pada fooer
    newRootVariants.exit = {
      opacity: 1,
      originY: 1,
      y: -top,
      height: window.innerHeight,
      transition: { ...transition },
    };

    // ubah animasi exit text
    newTextVariants.exit = {
      opacity: 0,
      transition,
    };

    // update animasi pada state
    setRootVariants(newRootVariants);
    setTextVariants(newTextVariants);

    // set sharedLayout pada redux state ke true
    dispatch({
      type: actionType.setProjectSharedLayout,
      value: true,
    });

    // push ke halaman next project
    history.push(`/project/${slug}`);
  };

  return (
    <motion.footer
      ref={ref}
      onTap={handleTap}
      className={styles.root}
      initial="hidden"
      animate="show"
      exit="exit"
      variants={rootVariants}
      style={{ originY: 1 }}
    >
      {/* banner */}
      <motion.div
        className={styles.banner}
        transition={transition}
        onHoverStart={() => handleCursorHover(true)}
        onHoverEnd={() => handleCursorHover(false)}
        whileHover={{ scaleY: 1.1, originY: 1 }}
        style={{
          originY: 1,
          backgroundImage: `linear-gradient(to bottom right, ${bannerColor.primary}, ${bannerColor.secondary})`,
        }}
      />
      {/* end banner */}

      {/* content */}
      <div className={styles.content}>
        <Container maxWidth="md">
          <Grid
            container
            spacing={3}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item md={2} xs={12}>
              <Typography variant="h6" className={styles.textWhite}>
                <TextMask variants={textVariants}>Next</TextMask>
              </Typography>
            </Grid>

            <Grid item md={8} xs={12}>
              <Typography variant="h4" className={styles.textWhite}>
                <TextMask variants={textVariants}>{name}</TextMask>
              </Typography>
            </Grid>

            <Grid item md={2} xs={12}>
              <TextMask variants={textVariants}>
                <Icon className={styles.textWhite} sx={{ fontSize: 40, mt: 3 }}>
                  east
                </Icon>
              </TextMask>
            </Grid>
          </Grid>
        </Container>
      </div>
      {/* end content */}
    </motion.footer>
  );
}

/**
 * prop types ProjectFooter
 *
 * @type {Object}
 */
ProjectFooter.propTypes = {
  data: PropTypes.object.isRequired,
};
