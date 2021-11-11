import { Box } from "@mui/material";
import clsx from "clsx";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import actionType from "src/redux/actionType";
import styles from "src/styles/header.module.scss";
import transition from "src/transition";
import { logoDark } from "src/components/ImageLoader";

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
      delay: transition.duration / 4,
    },
  },
  exit: {
    opacity: 0,
  },
};

/**
 * komponen NavItem
 *
 * @param {string} title
 * @param {string} href
 *
 * @returns
 */
const NavItem = ({ title, href }) => {
  const location = useLocation();
  const [width, setWidth] = React.useState(10);

  // cek apakah link active atau tidak
  // jika link active update state width
  React.useEffect(() => {
    if (location.pathname === href) {
      setWidth(25);
    } else {
      setWidth(10);
    }
  }, [setWidth, location, href]);

  // fungsi handle style ketika di-hover
  const handleCursorHover = (value) => {
    // cek apakah url = link pada menu
    // jika berbeda update state width
    if (location.pathname !== href) {
      if (value) {
        setWidth(20);
      } else {
        setWidth(10);
      }
    }
  };

  return (
    <NavLink to={href} exact>
      <motion.div
        onHoverStart={() => handleCursorHover(true)}
        onHoverEnd={() => handleCursorHover(false)}
        className={clsx(styles.navLink, {
          [styles.active]: Boolean(location.pathname === href),
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
      </motion.div>
    </NavLink>
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
  {
    title: "Work",
    href: "/",
    path: "/:category",
  },
  {
    title: "About",
    href: "/about",
    path: "/about",
  },
];

/**
 * komponen Header
 *
 * @returns
 */
const Header = ({ ...rest }) => {
  // redux state & dispatch
  const dispatch = useDispatch();

  // fungsi handle style pada cursor ketika ada event hover
  const handleCursorHover = (isHover) => {
    dispatch({
      type: actionType.setGlobalCursorHover,
      value: isHover,
    });
  };

  // render komponen
  return (
    <motion.header {...rest} className={styles.header}>
      {/* logo */}
      <NavLink to="/" exact>
        <Box
          component={motion.img}
          boxShadow={5}
          src={logoDark}
          alt="logo"
          className={styles.logo}
          variants={headerVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          onHoverStart={() => handleCursorHover(true)}
          onHoverEnd={() => handleCursorHover(false)}
        />
      </NavLink>
      {/* end logo */}

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
              onHoverStart={() => handleCursorHover(true)}
              onHoverEnd={() => handleCursorHover(false)}
            >
              <NavItem title={link.title} href={link.href} path={link.path} />
            </motion.li>
          ))}
        </ul>
      </motion.nav>
      {/* end navbar */}
    </motion.header>
  );
};

export default Header;
