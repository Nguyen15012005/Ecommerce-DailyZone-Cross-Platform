import { Card, Divider } from "@mui/material";
import React from "react";

const Payment = () => {
  return (
    <div>
      <h1 className="">
        <Card className="rounded-md space-y-4 p-5">
          <h1 className="text-gray-600 font-medium">Tổng thu nhập</h1>
          <h1 className="font-bold text-xl pb-1">9876</h1>
          <Divider />
          <p className="text-gray-600 font-medium pt-1">
            Phương thức thanh toán gần nhất: <strong>0đ</strong>
          </p>
        </Card>
      </h1>
    </div>
  );
};

export default Payment;
