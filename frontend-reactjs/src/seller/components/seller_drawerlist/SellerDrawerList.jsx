import React from "react";
import {
  AccountBalanceWallet,
  AccountBox,
  Add,
  Dashboard,
  Inventory,
  Logout,
  Receipt,
  ShoppingBag,
} from "@mui/icons-material";
import DrawerList from "../../../components/DrawerList";

const menu = [
  {
    name: "Tổng quan",
    path: "/seller",
  },
  {
    name: "Đơn hàng",
    path: "/seller/orders",
  },
  {
    name: "Sản phẩm",
    path: "/seller/products",
  },
  {
    name: "Thêm sản phẩm",
    path: "/seller/add-product",
  },
  {
    name: "Thanh toán",
    path: "/seller/payment",
  },
  {
    name: "Giao dịch",
    path: "/seller/transaction",
  },
];

const menu2 = [
  {
    name: "Tài khoản",
    path: "/seller/account",
    icon: <AccountBox className="text-[#C9A96E]" />,
    activeIcon: <AccountBox className="text-[#3B2B12]" />,
  },
  {
    name: "Đăng xuất",
    path: "/",
    icon: <Logout className="text-[#C9A96E]" />,
    activeIcon: <Logout className="text-[#3B2B12]" />,
  },
];

const SellerDrawerList = ({ toggleDrawer }) => {
  return <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer} />;
};

export default SellerDrawerList;
