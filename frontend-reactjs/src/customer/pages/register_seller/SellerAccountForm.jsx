import { Button, Step, StepLabel, Stepper } from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import RegisterSellerStep1 from "./RegisterSellerStep1";
import RegisterSellerStep2 from "./RegisterSellerStep2";
const steps = [
  "SDT - MST",
  "Địa chỉ lấy hàng",
  "Thông tin ngân hàng",
  "Thông tin nhà cung cấp",
];
const SellerAccountForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const handleStep = (value) => () => {
    (activeStep < steps.length - 1 || (activeStep > 0 && value === -1)) &&
      setActiveStep(activeStep + value);
    activeStep === steps.length - 1 && handleCreateAccount();
  };

  const handleCreateAccount = () => {
    console.log("create account");
  };

  const formik = useFormik({
    initialValues: {
      phone: "",
      otp: "",
      mst: "",

      pickupAddress: {
        name: "",
        phone: "",
        address: "",
        ward: "",
        district: "",
        province: "",
        postalCode: "",
      },

      businessDetails: {
        businessName: "",
        businessAddress: "",
        businessPhone: "",
        businessEmail: "",
        logo: "",
        banner: "",
      },

      bankDetails: {
        accountNumber: "",
        accountHolderName: "",
        bankName: "",
        branch: "",
      },

      password: "",
    },

    onSubmit: (values) => {
      console.log(values, "formik submitted");
      console.log("active step ", activeStep);
    },
  });
  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <section className="space-y-10 mt-5">
        <div className="">
          {activeStep === 0 ? (
            <RegisterSellerStep1 formik={formik} />
          ) : activeStep === 1 ? (
            <RegisterSellerStep2 formik={formik} />
          ) : (
            ""
          )}
        </div>
      </section>

      <div className="flex items-center justify-between">
        <Button
          onClick={handleStep(-1)}
          variant="contained"
          disabled={activeStep === 0}
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
