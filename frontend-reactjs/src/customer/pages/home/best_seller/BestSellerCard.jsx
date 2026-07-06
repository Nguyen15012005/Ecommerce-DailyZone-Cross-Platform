import React from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BestSellerCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product-detail/${product.id}`)}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[#f7f7f7]">
        <img
          src={product.image}
          alt={product.name}
          className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Discount */}
        {product.discount > 0 && (
          <span className="absolute left-4 top-4 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
            -{product.discount}%
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 opacity-0 shadow transition-all duration-300 group-hover:opacity-100 hover:bg-white"
        >
          <Heart size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="space-y-3 p-5">
        <p className="text-xs uppercase tracking-[0.3em] text-[#B88E2F]">
          {product.category}
        </p>

        <h3 className="line-clamp-2 min-h-[56px] text-lg font-semibold text-gray-900">
          {product.name}
        </h3>

        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-black">{product.price}</span>

          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              {product.oldPrice}
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            console.log("Add to cart");
          }}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-3 text-sm font-semibold text-white transition hover:bg-[#B88E2F]"
        >
          <ShoppingBag size={18} />
          Mua ngay
        </button>
      </div>
    </div>
  );
};

export default BestSellerCard;
