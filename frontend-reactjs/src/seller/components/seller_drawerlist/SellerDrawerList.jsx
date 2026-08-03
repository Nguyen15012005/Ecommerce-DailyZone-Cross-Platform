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
    name: "Dashboard",
    path: "/seller",
    icon: <Dashboard className="text-[#C9A96E]" />,
    activeIcon: <Dashboard className="text-[#3B2B12]" />,
  },
  {
    name: "Orders",
    path: "/seller/orders",
    icon: <ShoppingBag className="text-[#C9A96E]" />,
    activeIcon: <ShoppingBag className="text-[#3B2B12]" />,
  },
  {
    name: "Products",
    path: "/seller/products",
    icon: <Inventory className="text-[#C9A96E]" />,
    activeIcon: <Inventory className="text-[#3B2B12]" />,
  },
  {
    name: "Add Product",
    path: "/seller/add-product",
    icon: <Add className="text-[#C9A96E]" />,
    activeIcon: <Add className="text-[#3B2B12]" />,
  },
  {
    name: "Payment",
    path: "/seller/payment",
    icon: <AccountBalanceWallet className="text-[#C9A96E]" />,
    activeIcon: <AccountBalanceWallet className="text-[#3B2B12]" />,
  },
  {
    name: "Transaction",
    path: "/seller/transaction",
    icon: <Receipt className="text-[#C9A96E]" />,
    activeIcon: <Receipt className="text-[#3B2B12]" />,
  },
];

const menu2 = [
  {
    name: "Account",
    path: "/seller/account",
    icon: <AccountBox className="text-[#C9A96E]" />,
    activeIcon: <AccountBox className="text-[#3B2B12]" />,
  },
  {
    name: "Logout",
    path: "/",
    icon: <Logout className="text-[#C9A96E]" />,
    activeIcon: <Logout className="text-[#3B2B12]" />,
  },
];

const SellerDrawerList = ({ toggleDrawer }) => {
  return <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer} />;
};

export default SellerDrawerList;
