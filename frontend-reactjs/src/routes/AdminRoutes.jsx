import AdminHome from "../admin/pages/home/AdminHome";
import ProtectedRoute from "./ProtectedRoute";
import AdminLogin from "../admin/pages/auth/LoginAdmin";
import Dashboard from "../admin/pages/dashboard/Dashboard";
import Coupon from "./../admin/pages/coupon/Coupon";

export const adminRoutes = [
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },

  {
    path: "/admin",
    element: (
      // <ProtectedRoute allowedRoles={["ADMIN"]}>
      <AdminHome />
      // </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "",
        element: <Coupon />,
      },
      {
        path: "",
        element: <Dashboard />,
      },
    ],
  },
];
