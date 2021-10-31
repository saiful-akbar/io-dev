import React from "react";
import PropTypes from "prop-types";

const ProjectHero = ({ bgColor, image, name, category, year }) => {
  return <div></div>;
};

ProjectHero.propTypes = {
  bgColor: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
};

export default ProjectHero;
