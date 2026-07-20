import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Grid,
  MenuItem,
  CircularProgress,
} from "@mui/material";

const ContactSchema = Yup.object().shape({
  name: Yup.string().required("Họ tên là bắt buộc"),

  phone: Yup.string()
    .matches(/^(0|\+84)[0-9]{9}$/, "Số điện thoại không hợp lệ")
    .required("Số điện thoại là bắt buộc"),

  postalCode: Yup.string()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .matches(/^[0-9]{5,6}$/, {
      message: "Mã bưu chính không hợp lệ",
      excludeEmptyString: true,
    }),
  address: Yup.string().required("Địa chỉ là bắt buộc"),

  ward: Yup.string().required("Vui lòng chọn Phường/Xã"),

  district: Yup.string().required("Vui lòng chọn Quận/Huyện"),

  province: Yup.string().required("Vui lòng chọn Tỉnh/Thành phố"),
});

const AddressForm = ({ handleClose, onAddAddress }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [loadingProvince, setLoadingProvince] = useState(false);
  const [loadingDistrict, setLoadingDistrict] = useState(false);
  const [loadingWard, setLoadingWard] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      address: "",
      ward: "",
      district: "",
      province: "",
      postalCode: "",
    },
    validationSchema: ContactSchema,
    onSubmit: (values) => {
      onAddAddress(values);
      formik.resetForm();
      handleClose();
    },
  });

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

    formik.setFieldValue("province", value);
    formik.setFieldValue("district", "");
    formik.setFieldValue("ward", "");

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

    formik.setFieldValue("district", value);
    formik.setFieldValue("ward", "");

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
    <Box
      sx={{
        maxWidth: {
          xs: "100%",
          sm: 800,
          md: 1000,
          lg: 1400,
        },
        width: "100%",
        mx: "auto",
        p: {
          xs: 2,
          sm: 3,
          md: 4,
        },
        borderRadius: "20px",
        backgroundColor: "#fff",
      }}
      className="shadow-lg"
    >
      <p className="pb-6 text-center text-xl font-semibold text-gray-800">
        Thêm địa chỉ giao hàng
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
              name="phone"
              value={formik.values.phone}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              label="Số điện thoại"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="postalCode"
              value={formik.values.postalCode}
              error={
                formik.touched.postalCode && Boolean(formik.errors.postalCode)
              }
              helperText={formik.touched.postalCode && formik.errors.postalCode}
              label="Mã bưu điện"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
              name="province"
              label="Tỉnh / Thành phố"
              value={formik.values.province}
              onChange={handleProvinceChange}
              onBlur={() => formik.setFieldTouched("province", true)}
              error={formik.touched.province && Boolean(formik.errors.province)}
              helperText={formik.touched.province && formik.errors.province}
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
              name="district"
              label="Quận / Huyện"
              value={formik.values.district}
              onChange={handleDistrictChange}
              onBlur={() => formik.setFieldTouched("district", true)}
              disabled={!districts.length}
              error={formik.touched.district && Boolean(formik.errors.district)}
              helperText={formik.touched.district && formik.errors.district}
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
              name="ward"
              label="Phường / Xã"
              value={formik.values.ward}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={!wards.length}
              error={formik.touched.ward && Boolean(formik.errors.ward)}
              helperText={formik.touched.ward && formik.errors.ward}
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

          <Grid item xs={12}>
            <div className="flex gap-3">
              <Button
                onClick={handleClose}
                variant="outlined"
                fullWidth
                sx={{
                  py: "14px",
                  borderRadius: "10px",
                  fontWeight: 600,
                  textTransform: "none",
                }}
              >
                Hủy
              </Button>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  py: "14px",
                  borderRadius: "10px",
                  fontWeight: 600,
                  textTransform: "none",
                  background: "#C6A15B",
                  "&:hover": { background: "#a07830" },
                }}
              >
                Thêm địa chỉ
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddressForm;
