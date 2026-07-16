import { Box, TextField } from "@mui/material";
import React from "react";

const BecomeSellerStep1 = ({ formik }) => {
  return (
    <div>
      <Box>
        <p className="text-xl font-bold text-center pb-4">Thông tin liên hệ</p>
        <div className="space-y-4 mb-4">
          <TextField
            fullWidth
            name="mobile"
            label="mobile"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            helperText={formik.touched.mobile && formik.errors.mobile}
          />
          <TextField
            fullWidth
            name="MST"
            label="MST"
            value={formik.values.MST}
            onChange={formik.handleChange}
            error={formik.touched.MST && Boolean(formik.errors.MST)}
            helperText={formik.touched.MST && formik.errors.MST}
          />
        </div>
      </Box>
    </div>
  );
};

export default BecomeSellerStep1;
