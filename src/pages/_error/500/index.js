import React from "react";
import MainLayout from "src/components/layouts/main-layout";

const InternalServerError = () => {
  return (
    <MainLayout pageTitle="500 Internal Server Error">
      <h1>500 | Internal Server Error</h1>
    </MainLayout>
  );
};

export default InternalServerError;
