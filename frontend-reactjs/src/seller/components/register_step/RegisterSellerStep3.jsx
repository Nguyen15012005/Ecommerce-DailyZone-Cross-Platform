import React from "react";
import { Box, Grid, TextField } from "@mui/material";

const RegisterSellerStep3 = ({ formik }) => {
  return (
    <Box className="mb-5">
      <p className="text-2xl font-bold text-center pb-4 text-[#C9A96E] mt-4">
        Thông Tin Ngân Hàng
      </p>

      <Grid container spacing={2.5}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="bankDetails.accountHolderName"
            label="Chủ tài khoản"
            value={formik.values.bankDetails.accountHolderName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.bankDetails?.accountHolderName &&
              Boolean(formik.errors.bankDetails?.accountHolderName)
            }
            helperText={
              formik.touched.bankDetails?.accountHolderName &&
              formik.errors.bankDetails?.accountHolderName
            }
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            name="bankDetails.accountNumber"
            label="Số tài khoản"
            value={formik.values.bankDetails.accountNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.bankDetails?.accountNumber &&
              Boolean(formik.errors.bankDetails?.accountNumber)
            }
            helperText={
              formik.touched.bankDetails?.accountNumber &&
              formik.errors.bankDetails?.accountNumber
            }
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            name="bankDetails.bankName"
            label="Tên ngân hàng"
            value={formik.values.bankDetails.bankName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.bankDetails?.bankName &&
              Boolean(formik.errors.bankDetails?.bankName)
            }
            helperText={
              formik.touched.bankDetails?.bankName &&
              formik.errors.bankDetails?.bankName
            }
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            name="bankDetails.branch"
            label="Chi nhánh"
            value={formik.values.bankDetails.branch}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.bankDetails?.branch &&
              Boolean(formik.errors.bankDetails?.branch)
            }
            helperText={
              formik.touched.bankDetails?.branch &&
              formik.errors.bankDetails?.branch
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegisterSellerStep3;
