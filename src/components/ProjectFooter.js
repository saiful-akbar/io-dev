import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion"
import styles from "src/styles/projectFooter.module.scss";
import { useDispatch } from "react-redux";
import actionType from "src/redux/actionType";
import {
  Grid,
  Typography,
  Container,
  Icon,
} from "@mui/material";
import transition from "src/transition";

/**
 * Komponen utama
 * 
 * @param {Object} options.data Data project next
 */
export default function ProjectFooter({ data }) {
  const {
    bannerColor,
    name,
  } = data;

  const dispacth = useDispatch();

  // handle cursor hover
  const handleCursorHover = (value) => {
    dispacth({
      type: actionType.setGlobalCursorHover,
      value,
    });
  };

  return (
    <motion.footer className={styles.root} >
    	<motion.div
    		className={styles.banner}
	    	transition={transition}
	    	onHoverStart={() => handleCursorHover(true)}
	    	onHoverEnd={() => handleCursorHover(false)}
	    	whileHover={{
	    		scaleY: 1.1,
	    		originY: 1,
	    	}}
	    	style={{
	    		backgroundImage: `linear-gradient(to top left, ${bannerColor.primary}, ${bannerColor.secondary})`,
	    		originY: 1,
	    	}}
    	/>

    	<div className={styles.content} >
	    	<Container maxWidth="md" >
					<Grid
						container
						spacing={3}
						justifyContent="space-between"
						alignItems="center"
					>
						<Grid item md={2} xs={12} >
							<Typography
								variant="h6"
								className={styles.textWhite}
							>
								Next
							</Typography>
						</Grid>

						<Grid item md={8} xs={12} >
							<Typography
								variant="h4"
								className={styles.textWhite}
							>
								{name}
							</Typography>
						</Grid>

						<Grid item md={2} xs={12} >
							<Icon
								className={styles.textWhite}
								sx={{ fontSize: 40, mt: 3 }}
							>
								east
							</Icon>
						</Grid>
					</Grid>
	    	</Container>
    	</div>
		</motion.footer>
  );
};

ProjectFooter.propTypes = {
  data: PropTypes.object.isRequired,
};