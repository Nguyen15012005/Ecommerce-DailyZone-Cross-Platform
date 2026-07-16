import React, { useState } from "react";
import {
  Storefront,
  TrendingUp,
  LocalShipping,
  Dashboard,
  CheckCircle,
} from "@mui/icons-material";

import SellerAccountForm from "./SellerAccountForm";
import SellerLoginForm from "./SellerLoginForm";
import { Button, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: <Storefront sx={{ color: "#B88A44", fontSize: 32 }} />,
    title: "Đăng ký miễn phí",
    desc: "Tạo gian hàng chỉ trong vài phút và bắt đầu bán hàng ngay.",
  },
  {
    icon: <Dashboard sx={{ color: "#B88A44", fontSize: 32 }} />,
    title: "Quản lý thông minh",
    desc: "Theo dõi đơn hàng, doanh thu và tồn kho trên một giao diện.",
  },
  {
    icon: <TrendingUp sx={{ color: "#B88A44", fontSize: 32 }} />,
    title: "Tăng trưởng doanh thu",
    desc: "Tiếp cận hàng nghìn khách hàng mỗi ngày cùng Daily Zone.",
  },
];

const stats = [
  {
    number: "15K+",
    title: "Nhà bán hàng",
  },
  {
    number: "250K+",
    title: "Đơn hàng",
  },
  {
    number: "99%",
    title: "Hài lòng",
  },
];

const BecomeSeller = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#FCFAF6]">
      <div className="mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[1.2fr_0.8fr]">
        {/* LEFT */}
        <section className="hidden lg:flex flex-col justify-between px-16 py-14 bg-gradient-to-br from-[#FFFDF8] via-[#FCFAF6] to-[#F7F0E5] border-r border-[#EFE3CF]">
          <div className="mt-10">
            <span className="inline-flex items-center rounded-full border border-[#E8D8BE] bg-white px-4 py-2 text-sm font-medium text-[#B88A44]">
              <Storefront sx={{ fontSize: 18, mr: 1 }} />
              DAILY ZONE SELLER
            </span>

            {/* FEATURES */}
            <div className="mt-4 grid gap-5">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-5 rounded-3xl border border-[#EFE3CF] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF7E8]">
                    {item.icon}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-[#3B2B12]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-[#7C6A53]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* STATS */}
          <div className="mt-10 grid grid-cols-3 gap-6">
            {stats.map((item, index) => (
              <div
                key={index}
                className="rounded-3xl border border-[#EFE3CF] bg-white p-6 text-center"
              >
                <h2 className="text-3xl font-bold text-[#B88A44]">
                  {item.number}
                </h2>

                <p className="mt-2 text-sm text-[#7C6A53]">{item.title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* RIGHT */}
        <section className="flex items-center justify-center px-6 py-2 md:px-12 lg:px-16">
          <div className="w-full max-w-lg rounded-[36px] border border-[#EFE3CF] bg-white p-8 shadow-[0_15px_60px_rgba(0,0,0,.06)] lg:p-12">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#FFF7E8]">
                <Storefront
                  sx={{
                    color: "#B88A44",
                    fontSize: 42,
                  }}
                />
              </div>

              <h2 className="font-serif text-4xl text-[#3B2B12]">
                {isLogin ? "Chào mừng trở lại" : "Trở thành Nhà Bán Hàng"}
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#7C6A53]">
                {isLogin
                  ? "Đăng nhập để quản lý cửa hàng và đơn hàng của bạn."
                  : "Tạo tài khoản Seller miễn phí và bắt đầu kinh doanh ngay hôm nay."}
              </p>
            </div>

            {isLogin ? <SellerLoginForm /> : <SellerAccountForm />}

            <div className="mt-5 border-t border-[#EFE3CF] pt-8">
              <div className="mb-5 flex items-center justify-center gap-2 text-sm text-[#7C6A53]">
                <CheckCircle
                  sx={{
                    color: "#B88A44",
                    fontSize: 18,
                  }}
                />
                {isLogin ? "Chưa có tài khoản Seller?" : "Đã là Nhà Bán Hàng?"}
              </div>

              <Button
                fullWidth
                variant="outlined"
                onClick={() => setIsLogin(!isLogin)}
                sx={{
                  py: 1.6,
                  borderRadius: "14px",
                  borderColor: "#B88A44",
                  color: "#B88A44",
                  fontWeight: 600,
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "#A57A35",
                    backgroundColor: "#FFF7E8",
                  },
                }}
              >
                {isLogin ? "Tạo tài khoản mới" : "Đăng nhập Seller"}
              </Button>
            </div>

            {/* MOBILE BENEFITS */}
            <div className="mt-10 grid gap-4 lg:hidden">
              <div className="flex items-center gap-3 rounded-2xl bg-[#FFF7E8] p-4">
                <TrendingUp sx={{ color: "#B88A44" }} />
                <span className="text-sm text-[#3B2B12]">
                  Gia tăng doanh thu cùng Daily Zone
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-[#FFF7E8] p-4">
                <LocalShipping sx={{ color: "#B88A44" }} />
                <span className="text-sm text-[#3B2B12]">
                  Quản lý đơn hàng dễ dàng
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-[#FFF7E8] p-4">
                <Dashboard sx={{ color: "#B88A44" }} />
                <span className="text-sm text-[#3B2B12]">
                  Dashboard trực quan và thông minh
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="absolute left-6 top-6 z-50">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/")}
          sx={{
            bgcolor: "#fff",
            color: "#3B2B12",
            px: 2.5,
            py: 1.2,
            borderRadius: "14px",
            border: "1px solid #EFE3CF",
            textTransform: "none",
            fontWeight: 600,
            boxShadow: "0 8px 24px rgba(0,0,0,.06)",
            "&:hover": {
              bgcolor: "#FFF7E8",
              borderColor: "#B88A44",
            },
          }}
        >
          Quay lại
        </Button>
      </div>
    </div>
  );
};

export default BecomeSeller;
