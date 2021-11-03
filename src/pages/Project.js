import React from "react";
import MainLayout from "src/layouts/MainLayout";
import ProjectFetch from "src/utils/projectFetch";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import actionType from "src/redux/actionType";

/**
 * Komponen utam project
 *
 * @param  {Object} options.match
 * @return {React Node}
 */
const Project = ({ match }) => {
  const { slug } = match.params;
  const dispatch = useDispatch();

  // project data
  const projectFetch = new ProjectFetch();
  const data = projectFetch.find(slug);
  // const next = projectFetch.next(slug);

  // kembalihan cursor hover ke false
  React.useEffect(() => {
    dispatch({
      type: actionType.setGlobalCursorHover,
      value: false,
    });
  }, [dispatch]);

  // React.useEffect(() => {
  //   console.log("next: ", next);
  // }, [next]);

  // Jika data project tidak ada atau undefined arahkan ke 404
  if (typeof data === "undefined") {
    return <Redirect to="/404" />;
  }

  return (
    <MainLayout title={data.name} pt={15} pb={5}>
      <section>
        <h1>{data.name}</h1>
      </section>
    </MainLayout>
  );
};

export default Project;
