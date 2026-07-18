import React from "react";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div
      className="
        group
        rounded-2xl
        border
        border-[#EFE3CF]
        bg-white
        p-6
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[#C6A15B]
        hover:shadow-xl
      "
    >
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF8EA] text-[#C6A15B] transition group-hover:bg-[#C6A15B] group-hover:text-white">
        {icon}
      </div>

      <h3 className="mb-2 text-lg font-semibold text-[#2E2E2E]">{title}</h3>

      <p className="text-sm leading-6 text-gray-500">{description}</p>
    </div>
  );
};

export default FeatureCard;
