import React, { useState } from "react";
import { CheckCircle } from "@mui/icons-material";

import SellerAccountForm from "./SellerAccountForm";
import SellerLoginForm from "./SellerLoginForm";
import { Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const RegisterSeller = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#FCFAF6]">
      <div className="mx-auto grid min-h-screen max-w-[2000px]">
        <section className="flex items-center justify-center px-6 py-2 md:px-12 lg:px-16">
          <div className="w-full max-w-4xl rounded-[36px] border border-[#EFE3CF] bg-white p-8 shadow-[0_15px_60px_rgba(0,0,0,.06)] lg:p-12">
            <div className="mb-8 text-center">
              <button>
                <div className="flex cursor-pointer items-center gap-2 lg:gap-3 mb-4">
                  <div className="flex flex-col leading-none">
                    <span className="font-serif text-[26px] text-[#C9A96E] lg:text-[40px]">
                      D
                    </span>

                    <span className="-mt-4 ml-2 font-serif text-[26px] text-[#C9A96E] lg:-mt-6 lg:ml-3 lg:text-[40px]">
                      Z
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <h1 className="mb-1 font-serif text-[14px] tracking-[2px] text-[#3B2B12] sm:text-[16px] lg:mb-2 lg:text-[20px] lg:tracking-[3px]">
                      DAILY ZONE
                    </h1>

                    <span className="hidden text-[8px] uppercase tracking-[5px] text-[#8B7355] sm:block lg:text-[9px]">
                      Style your life
                    </span>
                  </div>
                </div>
              </button>

              <h2 className="font-serif text-4xl text-[#C9A96E]">
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
          </div>
        </section>
      </div>
      <div className="fixed left-6 top-6 z-[9999]">
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

export default RegisterSeller;
