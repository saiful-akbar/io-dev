import React from "react";
import { useSelector } from "react-redux";
import MainLayout from "src/components/layouts/main-layout";
import HeroProject from "src/components/shared/hero-project";

/**
 * Komponen utama
 * @param {String} slug
 * @returns
 */
const Project = ({ match, history }) => {
  const { slug } = match.params;

  // redux
  const project = useSelector((state) =>
    state.workReducer.projects.find((data) => data.slug === slug)
  );

  // cek apakan project dengan slug yang dikirim ada atau tidak
  React.useEffect(() => {
    if (!project) history.push("/404");
  }, [history, project]);

  return (
    <MainLayout pageTitle={project && project.name}>
      <section id="hero-project">
        <HeroProject project={project && project} />
      </section>
    </MainLayout>
  );
};

export default Project;
