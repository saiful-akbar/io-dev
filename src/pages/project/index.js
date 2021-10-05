import React from "react";
import { useSelector } from "react-redux";
import MainLayout from "src/components/layouts/main-layout";
import HeroProject from "src/components/shared/hero-project";

/**
 * Komponen utama
 * @param {String} slug
 * @returns
 */
const Project = (props) => {
  const { match, history } = props;

  // redux
  const project = useSelector((state) =>
    state.workReducer.projects.find((data) => data.slug === match.params.slug)
  );

  // cek apakan project dengan slug yang dikirim ada atau tidak
  React.useEffect(() => {
    if (!project) history.push("/404");
  }, [history, project]);

  return (
    <MainLayout pageTitle={project && project.name}>
      <section style={{ minHeight: "250vh" }}>
        {project && <HeroProject project={project} />}
      </section>
    </MainLayout>
  );
};

export default Project;
