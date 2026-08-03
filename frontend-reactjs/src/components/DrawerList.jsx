import React from "react";
import { NavLink } from "react-router-dom";

const DrawerItem = ({ item, toggleDrawer }) => {
  return (
    <NavLink
      to={item.path}
      end={item.path === "/seller"}
      onClick={toggleDrawer}
      className={({ isActive }) => `
    group flex items-center gap-4 rounded-2xl px-4 py-3
    transition-all duration-300
    ${
      isActive
        ? "bg-gradient-to-r from-[#D6B57A] via-[#C9A96E] to-[#B88A44] shadow-md"
        : "hover:bg-[#F5EFE4]"
    }
  `}
    >
      {({ isActive }) => (
        <>
          {isActive ? item.activeIcon : item.icon}

          <span
            className={`
              font-medium transition-all

              ${isActive ? "text-[#3B2B12] font-semibold" : "text-[#8B7355]"}
            `}
          >
            {item.name}
          </span>
        </>
      )}
    </NavLink>
  );
};

const DrawerList = ({ menu, menu2, toggleDrawer }) => {
  return (
    <div className="h-full">
      <div
        className="
        flex h-full w-[300px]
        flex-col justify-between
        border-r border-[#EEE4D2]
        bg-[#FFFDF8]
        py-5
        "
      >
        {/* MAIN MENU */}
        <div className="space-y-2 px-4">
          {menu.map((item) => (
            <DrawerItem
              key={item.name}
              item={item}
              toggleDrawer={toggleDrawer}
            />
          ))}
        </div>

        {/* BOTTOM MENU */}
        <div className="space-y-2 px-4">
          {menu2.map((item) => (
            <DrawerItem
              key={item.name}
              item={item}
              toggleDrawer={toggleDrawer}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrawerList;
