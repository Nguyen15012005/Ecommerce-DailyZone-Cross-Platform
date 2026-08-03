import React from "react";
import SellerDashboard from "../seller/pages/SellerDashboard/SellerDashboard";

export const sellerRoutes = [
  {
    path: "/seller/*",
    element: <SellerDashboard />,
  },
];
