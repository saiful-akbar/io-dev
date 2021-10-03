import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.text.primary,
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer id="footer">
      <Box p={2} display="flex" justifyContent="center" alignItems="center">
        <a
          href="https://instagram.com/saifulakbar13"
          target="_blank"
          rel="noreferrer"
          className={classes.link}
        >
          <InstagramIcon style={{ fontSize: 25 }} />
        </a>
      </Box>
    </footer>
  );
};

export default Footer;
