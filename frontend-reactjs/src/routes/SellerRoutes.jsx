import React from "react";
import SellerDashboard from "../seller/pages/seller_dashboard/SellerDashboard";

export const sellerRoutes = [
  {
    path: "/seller/*",
    element: <SellerDashboard />,
  },
];
