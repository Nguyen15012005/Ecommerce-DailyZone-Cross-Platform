import React from "react";
import Products from "../seller/pages/products/Products";
import AddProduct from "../seller/pages/products/AddProduct";
import Orders from "../seller/pages/orders/Orders";
import Profile from "../seller/pages/account/Profile";
import Payment from "../seller/pages/payment/Payment";
import Transaction from "../seller/pages/transaction/Transaction";
import Dashboard from "./../seller/pages/dashboard/Dashboard";
import SellerHome from "../seller/pages/home/SellerHome";
import ProtectedRoute from "./ProtectedRoute";

export const sellerRoutes = [
  {
    path: "/seller",
    element: (
      <ProtectedRoute allowedRoles={["SELLER"]}>
        <SellerHome />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "account",
        element: <Profile />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "transaction",
        element: <Transaction />,
      },
    ],
  },
];
