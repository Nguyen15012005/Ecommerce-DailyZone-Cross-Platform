import React from "react";
import { ArrowForward } from "@mui/icons-material";
import VendorCard from "./VendorCard";

const vendors = [
  {
    id: 1,
    name: "Apple Official Store",
    category: "Điện tử",
    banner:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&q=80",
    avatar:
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=300&q=80",
    rating: 4.9,
    followers: "35K",
    products: 1280,
    verified: true,
  },
  {
    id: 2,
    name: "Nike Vietnam",
    category: "Thời trang",
    banner:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=80",
    avatar:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80",
    rating: 4.8,
    followers: "28K",
    products: 860,
    verified: true,
  },
  {
    id: 3,
    name: "Luxury Home",
    category: "Nội thất",
    banner:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80",
    avatar:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=300&q=80",
    rating: 4.9,
    followers: "19K",
    products: 530,
    verified: true,
  },
  {
    id: 4,
    name: "Beauty House",
    category: "Làm đẹp",
    banner:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&q=80",
    avatar:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&q=80",
    rating: 4.7,
    followers: "15K",
    products: 620,
    verified: false,
  },
  {
    id: 5,
    name: "Modern Fashion",
    category: "Quần áo",
    banner:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
    avatar:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&q=80",
    rating: 4.9,
    followers: "42K",
    products: 1540,
    verified: true,
  },
  {
    id: 6,
    name: "Tech World",
    category: "Công nghệ",
    banner:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80",
    avatar:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&q=80",
    rating: 4.8,
    followers: "24K",
    products: 970,
    verified: true,
  },
  {
    id: 7,
    name: "Adidas Official",
    category: "Thời trang",
    banner:
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1200&q=80",
    avatar:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80",
    rating: 4.8,
    followers: "18K",
    products: 740,
    verified: true,
  },
  {
    id: 8,
    name: "Samsung Store",
    category: "Điện tử",
    banner:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&q=80",
    avatar:
      "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=300&q=80",
    rating: 4.9,
    followers: "30K",
    products: 980,
    verified: true,
  },
  {
    id: 9,
    name: "Samsung Store",
    category: "Điện tử",
    banner:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&q=80",
    avatar:
      "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=300&q=80",
    rating: 4.9,
    followers: "30K",
    products: 980,
    verified: true,
  },
  {
    id: 10,
    name: "Samsung Store",
    category: "Điện tử",
    banner:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&q=80",
    avatar:
      "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=300&q=80",
    rating: 4.9,
    followers: "30K",
    products: 980,
    verified: true,
  },
];

const TopVendors = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-8xl px-5">
        {/* Header */}
        <div className="mb-14 flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="px-10">
            <p className="uppercase tracking-[0.35em] text-[#C6A15B]">
              TOP VENDORS
            </p>

            <h2 className="mt-3 text-4xl font-bold text-[#2E2E2E]">
              Nhà bán hàng nổi bật
            </h2>

            <p className="mt-4 max-w-2xl text-gray-500">
              Khám phá những cửa hàng được khách hàng đánh giá cao với hàng
              nghìn sản phẩm chất lượng và dịch vụ chuyên nghiệp.
            </p>
          </div>

          <button className="group flex items-center gap-2 text-[#C6A15B] font-semibold">
            Xem tất cả
            <ArrowForward className="transition group-hover:translate-x-1" />
          </button>
        </div>

        {/* Vendors */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {vendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopVendors;
