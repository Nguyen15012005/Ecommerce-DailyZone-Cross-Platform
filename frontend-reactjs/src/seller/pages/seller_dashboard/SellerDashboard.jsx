import React from "react";
import SellerDrawerList from "../../components/seller_drawerlist/SellerDrawerList";

const SellerDashboard = () => {
  return (
    <div>
      <div className="lg:flex lg:h-[90vh]">
        <section className="hidden lg:block h-full">
          <SellerDrawerList />
        </section>
        <section className="p-10 w-full lg:w-[80%] overflow-y-auto">
          Seller routes
        </section>
      </div>
    </div>
  );
};

export default SellerDashboard;
