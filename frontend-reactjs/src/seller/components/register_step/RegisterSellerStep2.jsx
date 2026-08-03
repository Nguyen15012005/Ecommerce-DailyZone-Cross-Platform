import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Grid,
  MenuItem,
  CircularProgress,
} from "@mui/material";

// Lưu ý: giả định component cha (flow đăng ký nhiều bước) đã bọc <form> chung
// cho toàn bộ các step, nên component này KHÔNG tự render thẻ <form> riêng
// để tránh lỗi form lồng trong form (invalid HTML, có thể gây submit nhầm).
const RegisterSellerStep2 = ({ formik }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [loadingProvince, setLoadingProvince] = useState(false);
  const [loadingDistrict, setLoadingDistrict] = useState(false);
  const [loadingWard, setLoadingWard] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchProvinces = async () => {
      setLoadingProvince(true);

      try {
        const res = await axios.get("https://provinces.open-api.vn/api/p/");
        if (isMounted) setProvinces(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoadingProvince(false);
      }
    };

    fetchProvinces();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleProvinceChange = async (e) => {
    const value = e.target.value;

    formik.setFieldValue("pickupAddress.province", value);
    formik.setFieldValue("pickupAddress.district", "");
    formik.setFieldValue("pickupAddress.ward", "");

    setDistricts([]);
    setWards([]);

    const province = provinces.find((p) => p.name === value);

    if (province) {
      setLoadingDistrict(true);

      try {
        const res = await axios.get(
          `https://provinces.open-api.vn/api/p/${province.code}?depth=2`,
        );
        setDistricts(res.data.districts || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingDistrict(false);
      }
    }
  };

  const handleDistrictChange = async (e) => {
    const value = e.target.value;

    formik.setFieldValue("pickupAddress.district", value);
    formik.setFieldValue("pickupAddress.ward", "");

    setWards([]);

    const district = districts.find((d) => d.name === value);

    if (district) {
      setLoadingWard(true);

      try {
        const res = await axios.get(
          `https://provinces.open-api.vn/api/d/${district.code}?depth=2`,
        );
        setWards(res.data.wards || []);
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
        Địa Chỉ Lấy Hàng
      </p>

      <Grid container spacing={2.5}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="pickupAddress.name"
            label="Họ và tên"
            value={formik.values.pickupAddress.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.pickupAddress?.name &&
              Boolean(formik.errors.pickupAddress?.name)
            }
            helperText={
              formik.touched.pickupAddress?.name &&
              formik.errors.pickupAddress?.name
            }
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="pickupAddress.phone"
            value={formik.values.pickupAddress.phone}
            label="Số điện thoại"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.pickupAddress?.phone &&
              Boolean(formik.errors.pickupAddress?.phone)
            }
            helperText={
              formik.touched.pickupAddress?.phone &&
              formik.errors.pickupAddress?.phone
            }
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="pickupAddress.postalCode"
            value={formik.values.pickupAddress.postalCode}
            label="Mã bưu điện"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.pickupAddress?.postalCode &&
              Boolean(formik.errors.pickupAddress?.postalCode)
            }
            helperText={
              formik.touched.pickupAddress?.postalCode &&
              formik.errors.pickupAddress?.postalCode
            }
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            name="pickupAddress.address"
            value={formik.values.pickupAddress.address}
            label="Địa chỉ cụ thể"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.pickupAddress?.address &&
              Boolean(formik.errors.pickupAddress?.address)
            }
            helperText={
              formik.touched.pickupAddress?.address &&
              formik.errors.pickupAddress?.address
            }
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            name="pickupAddress.province"
            label="Tỉnh / Thành phố"
            value={formik.values.pickupAddress.province}
            onChange={handleProvinceChange}
            onBlur={() =>
              formik.setFieldTouched("pickupAddress.province", true)
            }
            error={
              formik.touched.pickupAddress?.province &&
              Boolean(formik.errors.pickupAddress?.province)
            }
            helperText={
              formik.touched.pickupAddress?.province &&
              formik.errors.pickupAddress?.province
            }
          >
            {loadingProvince ? (
              <MenuItem value="" disabled>
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
            name="pickupAddress.district"
            label="Quận / Huyện"
            value={formik.values.pickupAddress.district}
            onChange={handleDistrictChange}
            onBlur={() =>
              formik.setFieldTouched("pickupAddress.district", true)
            }
            disabled={!districts.length}
            error={
              formik.touched.pickupAddress?.district &&
              Boolean(formik.errors.pickupAddress?.district)
            }
            helperText={
              formik.touched.pickupAddress?.district &&
              formik.errors.pickupAddress?.district
            }
          >
            {loadingDistrict ? (
              <MenuItem value="" disabled>
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
            name="pickupAddress.ward"
            label="Phường / Xã"
            value={formik.values.pickupAddress.ward}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={!wards.length}
            error={
              formik.touched.pickupAddress?.ward &&
              Boolean(formik.errors.pickupAddress?.ward)
            }
            helperText={
              formik.touched.pickupAddress?.ward &&
              formik.errors.pickupAddress?.ward
            }
          >
            {loadingWard ? (
              <MenuItem value="" disabled>
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
    </Box>
  );
};

export default RegisterSellerStep2;
