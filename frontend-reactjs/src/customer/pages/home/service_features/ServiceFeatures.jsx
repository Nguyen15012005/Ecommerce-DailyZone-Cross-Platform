import React from "react";
import FeatureCard from "./FeatureCard";

import {
  LocalShipping,
  Security,
  Autorenew,
  SupportAgent,
} from "@mui/icons-material";

const features = [
  {
    icon: <LocalShipping fontSize="medium" />,
    title: "Miễn phí vận chuyển",
    description: "Áp dụng cho đơn hàng từ 500.000đ trên toàn quốc.",
  },
  {
    icon: <Security fontSize="medium" />,
    title: "Thanh toán an toàn",
    description: "Bảo mật thông tin với nhiều phương thức thanh toán.",
  },
  {
    icon: <Autorenew fontSize="medium" />,
    title: "Đổi trả 7 ngày",
    description: "Đổi hoặc hoàn tiền nhanh chóng nếu có lỗi.",
  },
  {
    icon: <SupportAgent fontSize="medium" />,
    title: "Hỗ trợ 24/7",
    description: "Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ.",
  },
];

const ServiceFeatures = () => {
  return (
    <section className="bg-[#FAFAFA] py-16">
      <div className="mx-auto max-w-7xl px-5">
        {/* Heading */}
        <div className="mb-12 text-center">
          <p className="uppercase tracking-[0.35em] text-[#C6A15B]">
            DAILY ZONE
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[#2E2E2E]">
            Mua sắm an tâm
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-gray-500">
            Chúng tôi mang đến trải nghiệm mua sắm an toàn, nhanh chóng và đáng
            tin cậy cho mọi khách hàng.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((item, index) => (
            <FeatureCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceFeatures;
