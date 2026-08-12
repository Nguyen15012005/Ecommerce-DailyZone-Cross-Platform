// import React from "react";
// import { NavLink } from "react-router-dom";

// const Drawer = ({ item, toggleDrawer }) => {
//   return (
//     <NavLink
//       to={item.path}
//       end={item.path === "/seller"}
//       onClick={toggleDrawer}
//       className={({ isActive }) => `
//     group flex items-center gap-4 rounded-2xl px-4 py-3
//     transition-all duration-300
//     ${
//       isActive
//         ? "bg-gradient-to-r from-[#D6B57A] via-[#C9A96E] to-[#B88A44] shadow-md"
//         : "hover:bg-[#fef4e4]"
//     }
//   `}
//     >
//       {({ isActive }) => (
//         <>
//           {isActive ? item.activeIcon : item.icon}

//           <span
//             className={`
//               font-medium transition-all

//               ${isActive ? "text-white font-semibold" : "text-[#8B7355]"}
//             `}
//           >
//             {item.name}
//           </span>
//         </>
//       )}
//     </NavLink>
//   );
// };

// const DrawerItem = ({ menu, menu2, toggleDrawer }) => {
//   return (
//     <div className="h-full">
//       <div
//         className="
//         flex h-full w-[300px]
//         flex-col justify-between
//         border-r border-[#EEE4D2]
//         bg-[#fbf7ee]
//         py-5
//         "
//       >
//         {/* MAIN MENU */}
//         <div className="space-y-2 px-4">
//           {menu.map((item) => (
//             <Drawer key={item.name} item={item} toggleDrawer={toggleDrawer} />
//           ))}
//         </div>

//         {/* BOTTOM MENU */}
//         <div className="space-y-2 px-4">
//           {menu2.map((item) => (
//             <Drawer key={item.name} item={item} toggleDrawer={toggleDrawer} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DrawerItem;
