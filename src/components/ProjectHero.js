import React from 'react';
import PropTypes from 'prop-types';
import styles from 'src/styles/project-hero.module.scss';
import { motion } from 'framer-motion';
import { Container, Grid } from '@mui/material';
import properCase from 'src/utils/properCase';
import Image from 'next/image';

/**
 * Komponen utama ProjectHero
 *
 * @param {String} bannerColor
 * @param {String} image
 * @param {String} name
 * @param {String} category
 * @returns
 */
const ProjectHero = ({
  bannerColor,
  name,
  category,
  heroImage,
}) => (
  <motion.div className={styles.root} style={{ backgroundColor: bannerColor }}>
    <Container maxWidth="md">
      <Grid
        container
        rowSpacing={5}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Grid item md={6} xs={12}>
          <Grid container rowSpacing={5}>
            <Grid item xs={12}>
              <h1 className={styles.title}>
                {name.split(' ').map((nameValue, key) => (
                  <span className={styles.textMask} key={key}>
                    <span className={styles.text}>
                      {properCase(nameValue)}
                    </span>
                  </span>
                ))}
              </h1>
            </Grid>

            <Grid item xs={12}>
              <span className={styles.category}>
                -
                {' '}
                {properCase(category)}
                {' '}
                -
              </span>
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={6} xs={12}>
          <div className={styles.heroImage}>
            <Image
              className={styles.image}
              src={heroImage}
              alt={name}
              layout="fill"
              objectFit="cover"
              loading="eager"
            />
          </div>
        </Grid>
      </Grid>
    </Container>
  </motion.div>
);

ProjectHero.propTypes = {
  bannerColor: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  heroImage: PropTypes.string.isRequired,
};

export default ProjectHero;
