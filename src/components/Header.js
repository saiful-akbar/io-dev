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

/**
 * animasi varian
 */
const headerVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      ...transition,
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
    if (router.asPath === href) {
      setWidth(25);
    } else {
      setWidth(10);
    }
  }, [setWidth, router, href]);

  // fungsi handle hover nav link
  const handleHover = (value) => {
    if (router.asPath !== href) {
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
          [styles.active]: router.asPath === href,
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
const Header = () => {
  // redux
  const dispatch = useDispatch();

  const handleHover = (isHover) => {
    dispatch({
      type: actionType.setGlobalCursorHover,
      value: isHover,
    });
  };

  return (
    <>
      {/* logo */}
      <motion.div
        className={styles.logo}
        variants={headerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        onHoverStart={() => handleHover(true)}
        onHoverEnd={() => handleHover(false)}
      >
        <Link href="/" scroll={false}>
          <a>
            <img
              src="/images/logo/logo-dark.png"
              alt="logo"
              className={styles.image}
            />
          </a>
        </Link>
      </motion.div>

      {/* navbar */}
      <motion.nav
        className={styles.nav}
        variants={headerVariants}
        initial="initial"
        animate="animate"
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
    </>
  );
};

export default Header;
