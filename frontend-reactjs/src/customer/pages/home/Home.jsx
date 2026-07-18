import React from "react";
import CategoryGrid from "./category_grid/CategoryGrid";
import Deal from "./deal/Deal";
import ElectricCategory from "./electric_category/ElectricCategory";
import ShopByCategory from "./shop_by_category/ShopByCategory";
import { Storefront } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import BestSellerPage from "./best_seller/BestSellerPage";
import Hero from "./hero/Hero";
import ServiceFeatures from "./service_features/ServiceFeatures";
import PosterSeller from "./poster_register/PosterSeller";
import TopVendors from "./top_vendor/TopVendors";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* CATEGORY QUICK */}
      <section>{/* <ElectricCategory /> */}</section>
      <section>
        <Hero />
      </section>
      {/* TREND GRID */}
      <section>
        <CategoryGrid />
      </section>
      {/* DEAL */}
      <section>
        <Deal />
      </section>
      <section>
        <BestSellerPage />
      </section>
      <section>
        <TopVendors />
      </section>

      {/* SHOP BY CATEGORY */}
      <section>
        <ShopByCategory />
      </section>

      <section>
        <PosterSeller />
      </section>
      <section>
        <ServiceFeatures />
      </section>
    </div>
  );
};

export default Home;
