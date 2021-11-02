import React from "react";
import MainLayout from 'src/layouts/MainLayout';

/**
 * Komponen utama Work
 */
const Work = () => {
  return (
    <MainLayout title="Work" pt={15} pb={5}>
      <section>
        <h1>Hero</h1>
      </section>

      <section>
        <h1>Content</h1>
      </section>

      <section>
        <h1>Footer</h1>
      </section>
    </MainLayout>
  );
};

export default Work;