import { Storefront } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const PosterSeller = () => {
  const navigate = useNavigate();
  return (
    <div>
      <section className="relative pt-10">
        <img
          className="h-full w-full object-cover"
          src="/assets/image/become_seller-new.png"
          alt=""
        />

        {/* BUTTON */}
        <div className="absolute bottom-14 left-2 lg:left-[4rem]">
          <Button
            onClick={() => navigate("/register-seller")}
            startIcon={<Storefront />}
            variant="contained"
            className="
              normal-case
              rounded-none
              border border-black
              bg-black
              px-8 py-3
              tracking-wider
              text-white
              shadow-none
              transition-all duration-300

              hover:border-[#C6A15B]
              hover:bg-transparent
              hover:text-[#C6A15B]
            "
          >
            Bắt đầu bán hàng
          </Button>
        </div>
      </section>
    </div>
  );
};

export default PosterSeller;
