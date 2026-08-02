import React from "react";
import { useRoutes } from "react-router-dom";
import { customerRoutes } from "./CustomerRoutes";
import { sellerRoutes } from "./SellerRoutes";
import ScrollToTop from "./ScrollToTop";

const AppRoutes = () => {
  const routes = [...customerRoutes, ...sellerRoutes];
  const routing = useRoutes(routes);

  return (
    <>
      <ScrollToTop />
      {routing}
    </>
  );
};

export default AppRoutes;
