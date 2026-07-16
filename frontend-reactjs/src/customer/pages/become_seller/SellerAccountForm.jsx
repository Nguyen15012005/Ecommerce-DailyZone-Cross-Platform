import { Button, Step, StepLabel, Stepper } from "@mui/material";
import React, { useState } from "react";
const steps = [
  "Thông tin thuế & Số điện thoại",
  "Địa chỉ lấy hàng",
  "Thông tin ngân hàng",
  "Thông tin nhà cung cấp",
];
const SellerAccountForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const handleStep = (value) => () => {
    ((activeStep < steps.length - 1) || (activeStep > 0 && value === -1)) &&
      setActiveStep(activeStep + value);
    activeStep === steps.length - 1 && handleCreateAccount();
  };

  const handleCreateAccount = () => {
    console.log("create account");
  };
  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <section></section>

      <div className="flex items-center justify-between">
        <Button
          onClick={handleStep(-1)}
          variant="contained"
          disabled={activeStep == 0}
        >
          Quay lại
        </Button>
        <Button
          onClick={handleStep(1)}
          variant="contained"
          disabled={activeStep == steps.length - 1}
        >
          Tiếp tục
        </Button>
      </div>
    </div>
  );
};

export default SellerAccountForm;
