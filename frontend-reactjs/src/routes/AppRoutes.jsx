import React from "react";
import { useRoutes } from "react-router-dom";
import { customerRoutes } from "./CustomerRoutes";
import ScrollToTop from "./ScrollToTop";

const AppRoutes = () => {
  const routing = useRoutes(customerRoutes);

  return (
    <>
      <ScrollToTop />
      {routing}
    </>
  );
};

export default AppRoutes;
