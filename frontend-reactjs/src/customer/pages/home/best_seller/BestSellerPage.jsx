import React from "react";
import BestSellerCard from "./BestSellerCard";

const products = [
  {
    id: 1,
    category: "Thời trang nam",
    name: "Áo Polo Premium Cotton",
    price: "599.000đ",
    oldPrice: "799.000đ",
    discount: 25,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
  },
  {
    id: 2,
    category: "Sneaker",
    name: "Sneaker Urban White",
    price: "1.299.000đ",
    oldPrice: "1.590.000đ",
    discount: 18,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
  },
  {
    id: 3,
    category: "Thời trang nữ",
    name: "Đầm Thanh Lịch Luxury",
    price: "899.000đ",
    oldPrice: "1.190.000đ",
    discount: 24,
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
  },
  {
    id: 4,
    category: "Túi xách",
    name: "Túi Da Cao Cấp",
    price: "1.599.000đ",
    oldPrice: "1.990.000đ",
    discount: 20,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
  },
  {
    id: 5,
    category: "Đồng hồ",
    name: "Đồng Hồ Thời Trang",
    price: "2.399.000đ",
    oldPrice: "2.990.000đ",
    discount: 20,
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80",
  },
  {
    id: 6,
    category: "Áo khoác",
    name: "Áo Khoác Street Style",
    price: "799.000đ",
    oldPrice: "999.000đ",
    discount: 20,
    image:
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=800&q=80",
  },
  {
    id: 7,
    category: "Phụ kiện",
    name: "Kính Mát Thời Trang",
    price: "499.000đ",
    oldPrice: "699.000đ",
    discount: 29,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
  },
  {
    id: 8,
    category: "Trang sức",
    name: "Vòng Cổ Luxury",
    price: "1.099.000đ",
    oldPrice: "1.399.000đ",
    discount: 21,
    image:
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&q=80",
  },
];

const BestSellerPage = () => {
  return (
    <section className="bg-[#fafafa] min-h-screen">
      {/* Banner */}
      <div className="relative flex h-[320px] items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80"
          alt="Best Seller"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-center text-white">
          <p className="mb-3 uppercase tracking-[0.45em] text-[#D8B36A]">
            BEST SELLERS
          </p>

          <h1 className="text-4xl font-light md:text-6xl">Sản phẩm bán chạy</h1>

          <p className="mt-4 text-sm text-white/80 md:text-base">
            Những sản phẩm được khách hàng yêu thích nhất.
          </p>
        </div>
      </div>

      {/* Products */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="uppercase tracking-[0.3em] text-[#B88E2F] text-sm">
              Collection
            </p>

            <h2 className="mt-2 text-3xl font-semibold text-gray-900">
              Top 8 sản phẩm nổi bật
            </h2>
          </div>

          <p className="hidden text-gray-500 md:block">
            {products.length} sản phẩm
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <BestSellerCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellerPage;
