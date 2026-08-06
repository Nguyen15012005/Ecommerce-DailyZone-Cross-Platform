import React from "react";
import AdminHome from "../admin/pages/home/AdminHome";
import Dashboard from "../admin/pages/dashboard";

export const adminRoutes = [
  {
    path: "/admin",
    element: <AdminHome />,
    children: [
      {
        index: true, // Route mặc định cho /seller
        element: <Dashboard />,
      },
    ],
  },
];
