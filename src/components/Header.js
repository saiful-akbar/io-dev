import clsx from 'clsx';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styles from 'src/styles/header.module.scss';
import transition from 'src/transition';
import { useDispatch } from 'react-redux';
import actionType from 'src/redux/actionType';
import { Box } from '@mui/material';

/**
 * animasi varian
 */
const headerVariants = {
  hidden: {
    opacity: 0,
    y: 150,
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
  },
};

/**
 * komponen NavItem
 * @param {string} title
 * @param {string} href
 * @returns
 */
const NavItem = ({ title, href }) => {
  const router = useRouter();
  const [width, setWidth] = useState(10);

  // ubah value width jika link active
  useEffect(() => {
    if (router.route === href) {
      setWidth(25);
    } else {
      setWidth(10);
    }
  }, [setWidth, router, href]);

  // fungsi handle hover nav link
  const handleHover = (value) => {
    if (router.route !== href) {
      if (value) {
        setWidth(20);
      } else {
        setWidth(10);
      }
    }
  };

  return (
    <Link href={href} scroll={false}>
      <motion.a
        onHoverStart={() => handleHover(true)}
        onHoverEnd={() => handleHover(false)}
        className={clsx(styles.navLink, {
          [styles.active]: router.route === href,
        })}
      >
        <span>{title}</span>

        <motion.div
          className={styles.divider}
          animate={{
            width,
            transition: {
              duration: 0.4,
              ease: transition.ease,
            },
          }}
        />
      </motion.a>
    </Link>
  );
};

/**
 * proptypes NavItem
 */
NavItem.propTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

/**
 * list link menu
 */
const links = [
  { title: 'Work', href: '/' },
  { title: 'About', href: '/about' },
];

/**
 * komponen utama
 * @returns
 */
const Header = ({ ...rest }) => {
  // redux
  const dispatch = useDispatch();

  const handleHover = (isHover) => {
    dispatch({
      type: actionType.setGlobalCursorHover,
      value: isHover,
    });
  };

  return (
    <React.Fragment {...rest}>

      {/* logo */}
      <Link href="/" scroll={false}>
        <a>
          <Box
            component={motion.img}
            boxShadow={2}
            src="/images/logo/logo-dark.png"
            alt="logo"
            className={styles.logo}
            variants={headerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            onHoverStart={() => handleHover(true)}
            onHoverEnd={() => handleHover(false)}
          />
        </a>
      </Link>

      {/* navbar */}
      <motion.nav
        className={styles.nav}
        variants={headerVariants}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        <ul>
          {links.map((link) => (
            <motion.li
              key={link.href}
              className={styles.navItem}
              onHoverStart={() => handleHover(true)}
              onHoverEnd={() => handleHover(false)}
            >
              <NavItem title={link.title} href={link.href} />
            </motion.li>
          ))}
        </ul>
      </motion.nav>
      {/* end navbar */}
    </React.Fragment>
  );
};

export default Header;
