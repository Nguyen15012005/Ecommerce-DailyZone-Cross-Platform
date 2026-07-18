import React from "react";
import {
  Verified,
  Star,
  Storefront,
  Inventory2,
  Groups,
} from "@mui/icons-material";

const VendorCard = ({ vendor }) => {
  return (
    <div className="group overflow-hidden rounded-3xl border border-[#EFE3CF] bg-white transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* Banner */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={vendor.banner}
          alt={vendor.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Avatar */}
      <div className="relative">
        <img
          src={vendor.avatar}
          alt={vendor.name}
          className="absolute left-1/2 -top-10 h-20 w-20 -translate-x-1/2 rounded-full border-4 border-white object-cover shadow-lg transition group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="px-6 pb-8 pt-14 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-[#C6A15B]">
          {vendor.category}
        </p>

        <div className="mt-2 flex items-center justify-center gap-2">
          <h3 className="text-xl font-bold text-[#2E2E2E]">{vendor.name}</h3>

          {vendor.verified && (
            <Verified
              sx={{
                color: "#16a34a",
                fontSize: 20,
              }}
            />
          )}
        </div>

        {/* Rating */}
        <div className="mt-5 flex justify-center gap-1">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              sx={{
                fontSize: 18,
                color: "#F6B100",
              }}
            />
          ))}
        </div>

        <p className="mt-1 text-sm text-gray-500">{vendor.rating} / 5.0</p>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-[#FAFAFA] p-4">
            <Inventory2
              sx={{
                color: "#C6A15B",
                fontSize: 26,
              }}
            />

            <p className="mt-2 font-bold">{vendor.products}</p>

            <p className="text-xs text-gray-500">Products</p>
          </div>

          <div className="rounded-2xl bg-[#FAFAFA] p-4">
            <Groups
              sx={{
                color: "#C6A15B",
                fontSize: 26,
              }}
            />

            <p className="mt-2 font-bold">{vendor.followers}</p>

            <p className="text-xs text-gray-500">Followers</p>
          </div>
        </div>

        {/* Button */}
        <button
          className="
            mt-8
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-black
            py-3
            font-semibold
            text-white
            transition
            hover:bg-[#C6A15B]
          "
        >
          <Storefront fontSize="small" />
          Ghé cửa hàng
        </button>
      </div>
    </div>
  );
};

export default VendorCard;
