import React from "react";
import Dashboard from "../seller/pages/dashboard/Dashboard";
import Products from "../seller/pages/products/Products";
import Payment from "../seller/pages/payment/Payment";
import AddProduct from "../seller/pages/products/AddProduct";
import Orders from "../seller/pages/orders/Orders";
import Profile from "../seller/pages/account/Profile";
import Transaction from "../seller/pages/transaction/Transaction";

export const sellerRoutes = [
  {
    path: "/seller/*",
    element: <Dashboard />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/add-product",
    element: <AddProduct />,
  },
  // {
  //   path: "/update-product/:productId",
  //   element: <UpdateProductForm />,
  // },
  {
    path: "/orders",
    element: <Orders />,
  },
  // {
  //   path: "/invetory",
  //   element: <Invetory />,
  // },
  {
    path: "/account",
    element: <Profile />,
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/transaction",
    element: <Transaction />,
  },
];
