import React from "react";
import { Box, Grid, TextField } from "@mui/material";

const RegisterSellerStep4 = ({ formik }) => {
  return (
    <Box className="mb-5">
      <p className="text-2xl font-bold text-center pb-4 text-[#C9A96E] mt-4">
        Thông Tin Nhà Bán Hàng
      </p>

      <Grid container spacing={2.5}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="businessDetails.businessName"
            label="Tên doanh nghiệp"
            value={formik.values.businessDetails.businessName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.businessDetails?.businessName &&
              Boolean(formik.errors.businessDetails?.businessName)
            }
            helperText={
              formik.touched.businessDetails?.businessName &&
              formik.errors.businessDetails?.businessName
            }
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            name="businessDetails.businessAddress"
            label="Địa chỉ doanh nghiệp"
            value={formik.values.businessDetails.businessAddress}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.businessDetails?.businessAddress &&
              Boolean(formik.errors.businessDetails?.businessAddress)
            }
            helperText={
              formik.touched.businessDetails?.businessAddress &&
              formik.errors.businessDetails?.businessAddress
            }
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="businessDetails.businessPhone"
            label="Số điện thoại doanh nghiệp"
            value={formik.values.businessDetails.businessPhone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.businessDetails?.businessPhone &&
              Boolean(formik.errors.businessDetails?.businessPhone)
            }
            helperText={
              formik.touched.businessDetails?.businessPhone &&
              formik.errors.businessDetails?.businessPhone
            }
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="businessDetails.businessEmail"
            label="Email doanh nghiệp"
            value={formik.values.businessDetails.businessEmail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.businessDetails?.businessEmail &&
              Boolean(formik.errors.businessDetails?.businessEmail)
            }
            helperText={
              formik.touched.businessDetails?.businessEmail &&
              formik.errors.businessDetails?.businessEmail
            }
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            name="businessDetails.logo"
            label="Logo (URL)"
            value={formik.values.businessDetails.logo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.businessDetails?.logo &&
              Boolean(formik.errors.businessDetails?.logo)
            }
            helperText={
              formik.touched.businessDetails?.logo &&
              formik.errors.businessDetails?.logo
            }
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            name="businessDetails.banner"
            label="Banner (URL)"
            value={formik.values.businessDetails.banner}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.businessDetails?.banner &&
              Boolean(formik.errors.businessDetails?.banner)
            }
            helperText={
              formik.touched.businessDetails?.banner &&
              formik.errors.businessDetails?.banner
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegisterSellerStep4;
