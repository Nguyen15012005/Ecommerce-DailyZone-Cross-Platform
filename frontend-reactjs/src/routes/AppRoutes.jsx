import React from "react";
import { useRoutes } from "react-router-dom";
import { customerRoutes } from "./CustomerRoutes";
import { sellerRoutes } from "./SellerRoutes";
import ScrollToTop from "./ScrollToTop";
import { adminRoutes } from "./AdminRoutes";

const AppRoutes = () => {
  const routes = [...customerRoutes, ...sellerRoutes, ...adminRoutes];
  const routing = useRoutes(routes);

  return (
    <>
      <ScrollToTop />
      {routing}
    </>
  );
};

export default AppRoutes;
