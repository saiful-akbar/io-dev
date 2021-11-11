import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import Footer from "src/components/Footer";
import Hero from "src/components/Hero";
import MainLayout from "src/layouts/MainLayout";
import actionType from "src/redux/actionType";
import styles from "src/styles/about.module.scss";
import transition from "src/transition";
import { InView } from "react-intersection-observer";
import TextMask from "src/components/TextMask";
import { motion } from "framer-motion";
import ClientFetch from "src/utils/clientFetch";

/**
 * Animasi variants
 */
const animateVariants = {
  root: {
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
  },
  text: {
    hidden: {
      opacity: 0,
      y: "80%",
      transition: {
        duration: transition.duration / 1.5,
        ease: transition.ease,
      },
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: transition.duration / 1.5,
        ease: transition.ease,
      },
    },
    exit: {
      opacity: 0,
    },
  },
  divider: {
    hidden: {
      opacity: 0,
      scaleX: 0,
      originX: 0,
      transition,
    },
    show: {
      opacity: 1,
      scaleX: 1,
      originX: 0,
      transition,
    },
    exit: {
      opacity: 0,
    },
  },
};

/**
 * Komponen About
 */
const About = () => {
  const dispatch = useDispatch();
  const clientFetch = new ClientFetch();
  const clients = clientFetch.all();

  React.useEffect(() => {
    // kembalihan cursor hover ke false
    dispatch({
      type: actionType.setGlobalCursorHover,
      value: false,
    });

    // set warna background #root
    dispatch({
      type: actionType.setGlobalBgColor,
      value: "#E7E3D7",
    });
  }, [dispatch]);

  // Handle style cursor ketika ada event hover
  const handleCursorHover = (isHover) => {
    dispatch({
      type: actionType.setGlobalCursorHover,
      value: isHover,
    });
  };

  // render komponen
  return (
    <MainLayout title="About" pt={20} pb={2}>
      <Container maxWidth="md">
        <Grid container spacing={3}>
          {/* hero */}
          <Grid item xs={12}>
            <Hero leftTitle="About_" rightTitle="Us" />
          </Grid>
          {/* end hero */}

          <Grid
            item
            xs={12}
            container
            component={motion.div}
            variants={animateVariants.root}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {/* words */}
            <Grid
              item
              xs={12}
              mt={10}
              container
              spacing={3}
              justifyContent="flex-end"
            >
              <Grid item md={4} xs={12} mb={3}>
                <InView triggerOnce>
                  {({ inView, ref }) => (
                    <Typography
                      variant="subtitle1"
                      color="textSecondary"
                      ref={ref}
                    >
                      <TextMask
                        variants={animateVariants.text}
                        initial="hidden"
                        animate={inView ? "show" : "hidden"}
                        exit="exit"
                      >
                        01
                      </TextMask>
                    </Typography>
                  )}
                </InView>

                <InView triggerOnce>
                  {({ inView, ref }) => (
                    <Typography
                      variant="subtitle1"
                      color="textPrimary"
                      ref={ref}
                    >
                      <TextMask
                        variants={animateVariants.text}
                        initial="hidden"
                        animate={inView ? "show" : "hidden"}
                        exit="exit"
                      >
                        Words
                      </TextMask>
                    </Typography>
                  )}
                </InView>
              </Grid>

              <Grid item md={8} xs={12}>
                <Typography variant="body1" color="textPrimary">
                  Hello, thank you for visiting our website. We are freelance
                  website developer and UI/UX designer.
                </Typography>

                <Typography variant="body2" color="textPrimary" mt={5}>
                  We believe you can hire us without any doubt because we never
                  fail in our projects and make our clients happy with our
                  skills and knowledge. Thank you.
                </Typography>
              </Grid>

              <Grid item md={8} xs={12} mt={10}>
                <InView triggerOnce>
                  {({ inView, ref }) => (
                    <motion.div
                      ref={ref}
                      className={styles.divider}
                      variants={animateVariants.divider}
                      initial="hidden"
                      animate={inView ? "show" : "hidden"}
                    />
                  )}
                </InView>
              </Grid>
            </Grid>
            {/* end words */}

            {/* client */}
            <Grid
              item
              xs={12}
              container
              spacing={3}
              justifyContent="flex-end"
              mt={10}
            >
              <Grid item md={4} xs={12} mb={3}>
                <InView triggerOnce>
                  {({ inView, ref }) => (
                    <Typography
                      variant="subtitle1"
                      color="textSecondary"
                      ref={ref}
                    >
                      <TextMask
                        variants={animateVariants.text}
                        initial="hidden"
                        animate={inView ? "show" : "hidden"}
                        exit="exit"
                      >
                        02
                      </TextMask>
                    </Typography>
                  )}
                </InView>

                <InView triggerOnce>
                  {({ inView, ref }) => (
                    <Typography
                      variant="subtitle1"
                      color="textPrimary"
                      ref={ref}
                    >
                      <TextMask
                        variants={animateVariants.text}
                        initial="hidden"
                        animate={inView ? "show" : "hidden"}
                        exit="exit"
                      >
                        Client
                      </TextMask>
                    </Typography>
                  )}
                </InView>
              </Grid>

              <Grid item md={8} xs={12}>
                {clients.map((client) => (
                  <Typography
                    key={client}
                    variant="h3"
                    color="textPrimary"
                    mb={2}
                  >
                    - {client}.
                  </Typography>
                ))}
              </Grid>

              <Grid item md={8} xs={12} mt={10}>
                <InView triggerOnce>
                  {({ inView, ref }) => (
                    <motion.div
                      ref={ref}
                      className={styles.divider}
                      variants={animateVariants.divider}
                      initial="hidden"
                      animate={inView ? "show" : "hidden"}
                    />
                  )}
                </InView>
              </Grid>
            </Grid>
            {/* end client */}

            {/* contact */}
            <Grid
              item
              xs={12}
              container
              spacing={3}
              justifyContent="flex-end"
              mt={10}
            >
              <Grid item md={4} xs={12} mb={3}>
                <InView triggerOnce>
                  {({ inView, ref }) => (
                    <Typography
                      variant="subtitle1"
                      color="textSecondary"
                      ref={ref}
                    >
                      <TextMask
                        variants={animateVariants.text}
                        initial="hidden"
                        animate={inView ? "show" : "hidden"}
                        exit="exit"
                      >
                        03
                      </TextMask>
                    </Typography>
                  )}
                </InView>

                <InView triggerOnce>
                  {({ inView, ref }) => (
                    <Typography
                      variant="subtitle1"
                      color="textPrimary"
                      ref={ref}
                    >
                      <TextMask
                        variants={animateVariants.text}
                        initial="hidden"
                        animate={inView ? "show" : "hidden"}
                        exit="exit"
                      >
                        Contact
                      </TextMask>
                    </Typography>
                  )}
                </InView>
              </Grid>

              <Grid item md={8} xs={12}>
                <Grid container mb={4}>
                  <Grid
                    item
                    lg={2}
                    md={4}
                    xs={12}
                    sx={{
                      mb: { md: 0, xs: 2 },
                    }}
                  >
                    <Typography variant="h6" color="textSecondary">
                      Email :
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    lg={10}
                    md={8}
                    xs={12}
                    sx={{ display: "flex", alignItems: "flex-start" }}
                  >
                    <Typography
                      variant="h5"
                      color="textPrimary"
                      component={motion.a}
                      onHoverStart={() => handleCursorHover(true)}
                      onHoverEnd={() => handleCursorHover(false)}
                      href="mailto:saifulakbar.job@gmail.com"
                      target="_blank"
                      rel="noreferrer"
                      sx={{
                        borderBottom: 2,
                        borderColor: "textPrimary",
                        lineHeight: "100%",
                      }}
                    >
                      saifulakbar.job@gmail.com
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container mb={4}>
                  <Grid
                    item
                    lg={2}
                    md={4}
                    xs={12}
                    sx={{ mb: { md: 0, xs: 2 } }}
                  >
                    <Typography variant="h6" color="textSecondary">
                      Tel :
                    </Typography>
                  </Grid>

                  <Grid item lg={10} md={8} xs={12}>
                    <Typography variant="h5" color="textPrimary" mb={1}>
                      (+62) 813-8904-8009
                    </Typography>
                    <Typography variant="h5" color="textPrimary">
                      (+62) 812-8048-6235
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container mt={10}>
                  <Grid item xs={12}>
                    <Typography
                      variant="h2"
                      color="textPrimary"
                      component={motion.a}
                      onHoverStart={() => handleCursorHover(true)}
                      onHoverEnd={() => handleCursorHover(false)}
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.google.co.id/maps/place/Jl.+Aria+Putra,+Kedaung,+Kec.+Pamulang,+Kota+Tangerang+Selatan,+Banten+15415/@-6.3163167,106.7391574,19z/data=!4m5!3m4!1s0x2e69efeebdf7204b:0x341a0b3e446fbca9!8m2!3d-6.3163167!4d106.7397046"
                      sx={{ borderBottom: 2, borderColor: "textPrimary" }}
                    >
                      Find Us Here
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item md={8} xs={12} mt={10}>
                <InView triggerOnce>
                  {({ inView, ref }) => (
                    <motion.div
                      ref={ref}
                      className={styles.divider}
                      variants={animateVariants.divider}
                      initial="hidden"
                      animate={inView ? "show" : "hidden"}
                    />
                  )}
                </InView>
              </Grid>
            </Grid>
            {/* end contact */}
          </Grid>

          {/* footer */}
          <Grid item xs={12} mt={10}>
            <Footer />
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  );
};

export default About;
