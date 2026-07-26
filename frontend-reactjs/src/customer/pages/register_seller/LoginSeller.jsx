import { Box, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";

const LoginSeller = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    onSubmit: () => {
      console.log("form data" + values);
    },
  });
  return (
    <Box>
      <p className="text-2xl font-bold text-center pb-4 text-[#C9A96E] mt-4">
        Đăng Nhập Cho Nhà Bán Hàng
      </p>

      <div className="space-y-4 mb-4">
        <TextField
          fullWidth
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      </div>

      {true && (
        <div className="space-y-4 mb-4">
          <TextField
            fullWidth
            name="otp"
            label="OTP"
            value={formik.values.otp}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.otp && Boolean(formik.errors.otp)}
            helperText={formik.touched.otp && formik.errors.otp}
          />
        </div>
      )}
    </Box>
  );
};

export default LoginSeller;
