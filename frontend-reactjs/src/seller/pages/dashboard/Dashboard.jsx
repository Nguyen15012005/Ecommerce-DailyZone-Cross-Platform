import React from "react";
import DrawerList from "../../components/drawer/DrawerList";

const Dashboard = () => {
  const toggleDrawer = () => {};
  return (
    <div>
      <div className="flex h-[80px] items-center justify-between border-b border-black px-4 md:px-6 lg:px-10">
        <div className="flex items-center gap-3">
          <button onClick={""}>
            <div className="flex cursor-pointer items-center gap-2 lg:gap-3">
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

                <span className="hidden text-[8px] uppercase tracking-[4.8px] text-[#8B7355] sm:block lg:text-[9px]">
                  Style your life
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>
      <div className="lg:flex lg:h-[90vh]">
        <section className="hidden lg:block h-full">
          <DrawerList toggleDrawer={toggleDrawer} />
        </section>
        <section className="p-10 w-full lg:w-[80%] overflow-y-auto">
          Seller routes
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
