import React from "react";
import {
  AccountBalanceWallet,
  AccountBox,
  Add,
  Category,
  Dashboard,
  Inventory,
  Inventory2,
  LocalOffer,
  Logout,
  People,
  RateReview,
  Receipt,
  ShoppingBag,
} from "@mui/icons-material";
import DrawerItem from "./DrawerItem";
import { ShoppingCart, Store } from "lucide-react";

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

const menu1 = [
  {
    name: "Tổng quan",
    path: "/admin",
    icon: <Dashboard className="text-[#C9A96E]" />,
    activeIcon: <Dashboard className="text-white" />,
  },
  {
    name: "Quản lý sản phẩm",
    path: "/admin/products",
    icon: <Inventory2 className="text-[#C9A96E]" />,
    activeIcon: <Inventory2 className="text-white" />,
  },
  {
    name: "Quản lý danh mục",
    path: "/admin/categories",
    icon: <Category className="text-[#C9A96E]" />,
    activeIcon: <Category className="text-white" />,
  },
  {
    name: "Quản lý đơn hàng",
    path: "/admin/orders",
    icon: <ShoppingCart className="text-[#C9A96E]" />,
    activeIcon: <ShoppingCart className="text-white" />,
  },
  {
    name: "Quản lý người dùng",
    path: "/admin/users",
    icon: <People className="text-[#C9A96E]" />,
    activeIcon: <People className="text-white" />,
  },
  {
    name: "Quản lý cửa hàng",
    path: "/admin/stores",
    icon: <Store className="text-[#C9A96E]" />,
    activeIcon: <Store className="text-white" />,
  },
  {
    name: "Quản lý khuyến mãi",
    path: "/admin/promotions",
    icon: <LocalOffer className="text-[#C9A96E]" />,
    activeIcon: <LocalOffer className="text-white" />,
  },
  {
    name: "Quản lý đánh giá",
    path: "/admin/reviews",
    icon: <RateReview className="text-[#C9A96E]" />,
    activeIcon: <RateReview className="text-white" />,
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

export const DrawerList1 = ({ toggleDrawer }) => {
  return <DrawerItem menu={menu1} menu2={menu2} toggleDrawer={toggleDrawer} />;
};
