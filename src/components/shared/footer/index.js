import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  link: {
    color: theme.palette.text.primary,
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <a
        href="https://instagram.com/saifulakbar13"
        target="_blank"
        rel="noreferrer"
        className={classes.link}
      >
        <InstagramIcon style={{ fontSize: 25 }} />
      </a>
    </footer>
  );
};

export default Footer;
