import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Box,
  TextField,
  Grid,
  MenuItem,
  CircularProgress,
} from "@mui/material";

const RegisterSellerStep2 = ({ handleClose, onAddAddress, formik }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [loadingProvince, setLoadingProvince] = useState(false);
  const [loadingDistrict, setLoadingDistrict] = useState(false);
  const [loadingWard, setLoadingWard] = useState(false);

  useEffect(() => {
    const fetchProvinces = async () => {
      setLoadingProvince(true);

      try {
        const res = await axios.get("https://provinces.open-api.vn/api/p/");
        setProvinces(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingProvince(false);
      }
    };

    fetchProvinces();
  }, []);

  const handleProvinceChange = async (e) => {
    const value = e.target.value;

    formik.setFieldValue("state", value);
    formik.setFieldValue("city", "");
    formik.setFieldValue("locality", "");

    setDistricts([]);
    setWards([]);

    const province = provinces.find((p) => p.name === value);

    if (province) {
      setLoadingDistrict(true);

      try {
        const res = await axios.get(
          `https://provinces.open-api.vn/api/p/${province.code}?depth=2`,
        );
        setDistricts(res.data.districts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingDistrict(false);
      }
    }
  };

  const handleDistrictChange = async (e) => {
    const value = e.target.value;

    formik.setFieldValue("city", value);
    formik.setFieldValue("locality", "");

    setWards([]);

    const district = districts.find((d) => d.name === value);

    if (district) {
      setLoadingWard(true);

      try {
        const res = await axios.get(
          `https://provinces.open-api.vn/api/d/${district.code}?depth=2`,
        );
        setWards(res.data.wards);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingWard(false);
      }
    }
  };

  return (
    <Box className="mb-5">
      <p className="text-2xl font-bold text-center pb-4 text-[#C9A96E] mt-4">
        Địa chỉ lấy hàng
      </p>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2.5}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="name"
              label="Họ và tên"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="mobile"
              label="Số điện thoại"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="pinCode"
              label="Mã bưu điện"
              value={formik.values.pinCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
              helperText={formik.touched.pinCode && formik.errors.pinCode}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              name="address"
              label="Địa chỉ cụ thể"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Tỉnh / Thành phố"
              value={formik.values.state}
              onChange={handleProvinceChange}
              onBlur={() => formik.setFieldTouched("state", true)}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
            >
              {loadingProvince ? (
                <MenuItem>
                  <CircularProgress size={20} />
                </MenuItem>
              ) : (
                provinces.map((p) => (
                  <MenuItem key={p.code} value={p.name}>
                    {p.name}
                  </MenuItem>
                ))
              )}
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Quận / Huyện"
              value={formik.values.city}
              onChange={handleDistrictChange}
              onBlur={() => formik.setFieldTouched("city", true)}
              disabled={!districts.length}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            >
              {loadingDistrict ? (
                <MenuItem>
                  <CircularProgress size={20} />
                </MenuItem>
              ) : (
                districts.map((d) => (
                  <MenuItem key={d.code} value={d.name}>
                    {d.name}
                  </MenuItem>
                ))
              )}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              name="locality"
              label="Phường / Xã"
              value={formik.values.locality}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={!wards.length}
              error={formik.touched.locality && Boolean(formik.errors.locality)}
              helperText={formik.touched.locality && formik.errors.locality}
            >
              {loadingWard ? (
                <MenuItem>
                  <CircularProgress size={20} />
                </MenuItem>
              ) : (
                wards.map((w) => (
                  <MenuItem key={w.code} value={w.name}>
                    {w.name}
                  </MenuItem>
                ))
              )}
            </TextField>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default RegisterSellerStep2;
