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
import DrawerItem from "./DrawerItem";

const menu = [
  {
    name: "Tổng quan",
    path: "/seller",
    icon: <Dashboard className="text-[#C9A96E]" />,
    activeIcon: <Dashboard className="text-white" />,
  },
  {
    name: "Đơn hàng",
    path: "/seller/orders",
    icon: <ShoppingBag className="text-[#C9A96E]" />,
    activeIcon: <ShoppingBag className="text-white" />,
  },
  {
    name: "Sản phẩm",
    path: "/seller/products",
    icon: <Inventory className="text-[#C9A96E]" />,
    activeIcon: <Inventory className="text-white" />,
  },
  {
    name: "Thêm sản phẩm",
    path: "/seller/add-product",
    icon: <Add className="text-[#C9A96E]" />,
    activeIcon: <Add className="text-white" />,
  },
  {
    name: "Thanh toán",
    path: "/seller/payment",
    icon: <AccountBalanceWallet className="text-[#C9A96E]" />,
    activeIcon: <AccountBalanceWallet className="text-white" />,
  },
  {
    name: "Giao dịch",
    path: "/seller/transaction",
    icon: <Receipt className="text-[#C9A96E]" />,
    activeIcon: <Receipt className="text-white" />,
  },
];

const menu2 = [
  {
    name: "Tài khoản",
    path: "/seller/account",
    icon: <AccountBox className="text-[#C9A96E]" />,
    activeIcon: <AccountBox className="text-white" />,
  },
  {
    name: "Đăng xuất",
    path: "/",
    icon: <Logout className="text-[#C9A96E]" />,
    activeIcon: <Logout className="text-white" />,
  },
];

const DrawerList = ({ toggleDrawer }) => {
  return <DrawerItem menu={menu} menu2={menu2} toggleDrawer={toggleDrawer} />;
};

export default DrawerList;
