import { Box, TextField } from "@mui/material";
import React from "react";

const RegisterSellerStep1 = ({ formik }) => {
  return (
    <Box>
      <p className="text-2xl font-bold text-center pb-4 text-[#C9A96E] mt-4">
        Số điện thoại - Mã số thuế
      </p>

      <div className="space-y-4 mb-4">
        <TextField
          fullWidth
          name="phone"
          label="Số điện thoại"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />

        <TextField
          fullWidth
          name="mst"
          label="Mã số thuế"
          value={formik.values.mst}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.mst && Boolean(formik.errors.mst)}
          helperText={formik.touched.mst && formik.errors.mst}
        />
      </div>
    </Box>
  );
};

export default RegisterSellerStep1;
