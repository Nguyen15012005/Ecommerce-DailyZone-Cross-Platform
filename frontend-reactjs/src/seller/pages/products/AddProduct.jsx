import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  CircularProgress,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Box,
  Typography,
  Chip,
  Divider,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { menLevelTwo } from "../../../data/category/level_two/menLevelTwo";
import { womenLevelTwo } from "../../../data/category/level_two/womenLevelTwo";
import { furnitureLevelTwo } from "../../../data/category/level_two/furnitureLevelTwo";
import { electronicsLevelTwo } from "../../../data/category/level_two/electronicsLevelTwo";
import { menLevelThree } from "../../../data/category/level_three/menLevelThree";
import { womenLevelThree } from "../../../data/category/level_three/womenLevelThree";
import { furnitureLevelThree } from "../../../data/category/level_three/furnitureLevelThree";
import { electronicsLevelThree } from "../../../data/category/level_three/electronicsLevelThree";
import { mainCategory } from "./../../../data/MainCategory";
import Grid2 from "@mui/material/Unstable_Grid2";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { toast } from "react-toastify";
import { uploadToCloudinary } from "../../../util/uploadToCloudinary";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#3F3AC9", dark: "#2E2A9C" },
    success: { main: "#1F8A5F" },
    background: { default: "#F7F7F4", paper: "#FFFFFF" },
    text: { primary: "#1B1B1F", secondary: "#6B6B76" },
    divider: "#E5E4E0",
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: '"Inter", "Space Grotesk", sans-serif',
  },
  components: {
    MuiTextField: {
      defaultProps: { size: "small" },
      styleOverrides: {
        root: { "& .MuiOutlinedInput-root": { borderRadius: 10 } },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: { root: { borderRadius: 10 } },
    },
  },
});

const colors = [
  { name: "Black", hex: "#111111" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Red", hex: "#D64545" },
  { name: "Blue", hex: "#3457D5" },
  { name: "Green", hex: "#2E8B57" },
  { name: "Yellow", hex: "#E8C547" },
  { name: "Gray", hex: "#9AA0A6" },
];

const sizeOptions = ["FREE", "S", "M", "L", "XL"];

const categoryTwo = {
  men: menLevelTwo,
  women: womenLevelTwo,
  kids: [],
  home_furniture: furnitureLevelTwo,
  beauty: [],
  electronics: electronicsLevelTwo,
};

const categoryThree = {
  men: menLevelThree,
  women: womenLevelThree,
  kids: [],
  home_furniture: furnitureLevelThree,
  beauty: [],
  electronics: electronicsLevelThree,
};

const validationSchema = Yup.object({
  title: Yup.string()
    .min(5, "Title should be at least 5 characters long")
    .required("Title is required"),
  description: Yup.string()
    .min(10, "Description should be at least 10 characters long")
    .required("Description is required"),
  mrpPrice: Yup.number()
    .positive("MRP Price should be greater than zero")
    .required("MRP Price is required"),
  sellingPrice: Yup.number()
    .positive("Selling Price should be greater than zero")
    .max(Yup.ref("mrpPrice"), "Giá bán phải nhỏ hơn hoặc bằng giá niêm yết")
    .required("Selling Price is required"),
  quantity: Yup.number()
    .positive("Quantity should be greater than zero")
    .required("Quantity is required"),
  color: Yup.string().required("Color is required"),
  category: Yup.string().required("Category is required"),
  sizes: Yup.string().required("Sizes are required"),
});

const MAX_THUMBNAILS = 4;

// Small layout primitive so every section reads the same way:
// an eyebrow label, a title, then its fields.
const SectionCard = ({ eyebrow, title, children }) => (
  <Paper
    elevation={0}
    sx={{
      p: { xs: 2.5, sm: 3.5 },
      border: "1px solid",
      borderColor: "divider",
      borderRadius: 2,
    }}
  >
    <Typography
      variant="overline"
      sx={{ color: "text.secondary", fontWeight: 700, letterSpacing: 1.1 }}
    >
      {eyebrow}
    </Typography>
    <Typography
      variant="h6"
      sx={{
        fontFamily: '"Space Grotesk", sans-serif',
        fontWeight: 600,
        mb: 2.5,
        mt: 0.25,
      }}
    >
      {title}
    </Typography>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
      {children}
    </Box>
  </Paper>
);

const AddProduct = () => {
  const [uploadImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      mrpPrice: "",
      sellingPrice: "",
      quantity: "",
      color: "",
      images: [],
      category: "",
      category2: "",
      category3: "",
      sizes: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setSubmitting(true);
        // await dispatch(createProduct({ request: values, jwt: localStorage.getItem("jwt") }));
        console.log(values);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const MAX_IMAGES = 7;

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Giới hạn tối đa 5 ảnh
    if (formik.values.images.length >= MAX_IMAGES) {
      toast.warning("Bạn chỉ được thêm tối đa 7 ảnh.");
      event.target.value = "";
      return;
    }

    setUploadingImage(true);

    try {
      const image = await uploadToCloudinary(file);

      formik.setFieldValue("images", [...formik.values.images, image]);
    } catch (err) {
      console.error("Image upload failed:", err);
    } finally {
      setUploadingImage(false);
      event.target.value = "";
    }
  };

  const handleRemoveImage = (index) => {
    const updated = [...formik.values.images];
    updated.splice(index, 1);
    formik.setFieldValue("images", updated);
    setSelectedImageIndex((prev) => {
      if (updated.length === 0) return 0;
      return prev >= updated.length ? updated.length - 1 : prev;
    });
  };

  const childCategory = (category, parentCategoryId) => {
    if (!category) return [];
    return category.filter((c) => c.parentCategoryId === parentCategoryId);
  };

  // Derived preview data — kept out of formik state since it's display-only.
  const mrp = parseFloat(formik.values.mrpPrice) || 0;
  const selling = parseFloat(formik.values.sellingPrice) || 0;
  const discountPercent =
    mrp > 0 && selling > 0 && selling < mrp
      ? Math.round(((mrp - selling) / mrp) * 100)
      : 0;

  const selectedC1 = mainCategory.find(
    (c) => c.categoryId === formik.values.category,
  );
  const selectedC2 = categoryTwo[formik.values.category]?.find(
    (c) => c.categoryId === formik.values.category2,
  );
  const selectedC3 = childCategory(
    categoryThree[formik.values.category],
    formik.values.category2,
  ).find((c) => c.categoryId === formik.values.category3);

  const previewImages = formik.values.images;
  const thumbnailImages = previewImages.slice(0, MAX_THUMBNAILS);
  const extraImageCount = Math.max(0, previewImages.length - MAX_THUMBNAILS);

  return (
    <ThemeProvider theme={theme}>
      {/* Remove this if you already load Space Grotesk / Inter globally */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap"
      />
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <Grid2 container spacing={3}>
            {/* LEFT: form sections */}
            <Grid2 size={{ xs: 12, md: 8 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <SectionCard title="Hình ảnh sản phẩm">
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "nowrap",
                      gap: 1.5,
                      overflowX: "auto",
                      pb: 0.75,
                      maxWidth: 750,
                      "&::-webkit-scrollbar": { height: 6 },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#D8D7D2",
                        borderRadius: 4,
                      },
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      id="fileInput"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                    {formik.values.images.length < 7 && (
                      <label htmlFor="fileInput" style={{ flex: "0 0 auto" }}>
                        <Box
                          sx={{
                            width: 96,
                            height: 96,
                            borderRadius: 1,
                            border: "1.5px dashed",
                            borderColor: "divider",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 0.5,
                            cursor: "pointer",
                            position: "relative",
                            transition:
                              "border-color .15s ease, background-color .15s ease",
                            "&:hover": {
                              borderColor: "primary.main",
                              backgroundColor: "rgba(63,58,201,0.04)",
                            },
                          }}
                        >
                          {uploadImage ? (
                            <CircularProgress size={22} />
                          ) : (
                            <>
                              <AddPhotoAlternateIcon
                                sx={{ color: "text.secondary" }}
                              />
                              <Typography
                                variant="caption"
                                sx={{ color: "text.secondary" }}
                              >
                                Tải ảnh
                              </Typography>
                            </>
                          )}
                        </Box>
                      </label>
                    )}

                    {formik.values.images.map((image, index) => (
                      <Box
                        key={index}
                        sx={{ position: "relative", flex: "0 0 auto" }}
                      >
                        <Box
                          component="img"
                          src={image}
                          alt={`Product ${index + 1}`}
                          onClick={() => setSelectedImageIndex(index)}
                          sx={{
                            width: 96,
                            height: 96,
                            objectFit: "cover",
                            borderRadius: 1,
                            border: "1px solid",
                            borderColor:
                              index === selectedImageIndex
                                ? "primary.main"
                                : "divider",
                            cursor: "pointer",
                          }}
                        />
                        <IconButton
                          onClick={() => handleRemoveImage(index)}
                          size="small"
                          sx={{
                            position: "absolute",
                            top: -8,
                            right: -8,
                            backgroundColor: "#fff",
                            boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
                            width: 22,
                            height: 22,
                            "&:hover": { backgroundColor: "#fff" },
                          }}
                        >
                          <CloseIcon sx={{ fontSize: "0.9rem" }} />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                </SectionCard>

                <SectionCard title="Thông tin sản phẩm">
                  <TextField
                    fullWidth
                    id="title"
                    name="title"
                    label="Tên sản phẩm"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                    required
                  />
                  <TextField
                    multiline
                    rows={4}
                    fullWidth
                    id="description"
                    name="description"
                    label="Mô tả sản phảm"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                    required
                  />
                </SectionCard>

                <SectionCard title="Giá bán - Tồn kho">
                  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    <TextField
                      sx={{ flex: "1 1 200px" }}
                      id="mrpPrice"
                      name="mrpPrice"
                      label="Giá niêm yết"
                      type="number"
                      inputProps={{ min: 0, step: "1000" }}
                      onWheel={(e) => e.target.blur()}
                      value={formik.values.mrpPrice}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.mrpPrice &&
                        Boolean(formik.errors.mrpPrice)
                      }
                      helperText={
                        formik.touched.mrpPrice && formik.errors.mrpPrice
                      }
                      required
                    />
                    <TextField
                      sx={{ flex: "1 1 200px" }}
                      id="sellingPrice"
                      name="sellingPrice"
                      label="Giá bán"
                      type="number"
                      inputProps={{ min: 0, step: "1000" }}
                      onWheel={(e) => e.target.blur()}
                      value={formik.values.sellingPrice}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.sellingPrice &&
                        Boolean(formik.errors.sellingPrice)
                      }
                      helperText={
                        formik.touched.sellingPrice &&
                        formik.errors.sellingPrice
                      }
                      required
                    />
                    <TextField
                      sx={{ flex: "1 1 200px" }}
                      id="quantity"
                      name="quantity"
                      label="Số lượng sản phẩm"
                      type="number"
                      inputProps={{ min: 0, step: "1" }}
                      onWheel={(e) => e.target.blur()}
                      value={formik.values.quantity}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.quantity &&
                        Boolean(formik.errors.quantity)
                      }
                      helperText={
                        formik.touched.quantity && formik.errors.quantity
                      }
                      required
                    />
                  </Box>
                </SectionCard>

                <SectionCard title="Màu sắc - Kích cỡ">
                  <div className="flex justify-between">
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ mb: 1, fontWeight: 500 }}
                      >
                        Màu sắc
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                        {colors.map((c) => {
                          const selected = formik.values.color === c.name;
                          return (
                            <Box
                              key={c.name}
                              onClick={() =>
                                formik.setFieldValue("color", c.name)
                              }
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 0.5,
                                cursor: "pointer",
                              }}
                            >
                              <Box
                                sx={{
                                  width: 34,
                                  height: 34,
                                  borderRadius: "50%",
                                  backgroundColor: c.hex,
                                  border:
                                    c.name === "White"
                                      ? "1px solid #DDD"
                                      : "none",
                                  outline: selected
                                    ? "2px solid"
                                    : "2px solid transparent",
                                  outlineColor: selected
                                    ? "primary.main"
                                    : "transparent",
                                  outlineOffset: "3px",
                                  transition: "outline-color .15s ease",
                                }}
                              />
                              <Typography
                                variant="caption"
                                sx={{
                                  color: selected
                                    ? "primary.main"
                                    : "text.secondary",
                                  fontWeight: selected ? 600 : 400,
                                }}
                              >
                                {c.name}
                              </Typography>
                            </Box>
                          );
                        })}
                      </Box>
                      {formik.touched.color && formik.errors.color && (
                        <Typography
                          variant="caption"
                          sx={{ color: "error.main", display: "block", mt: 1 }}
                        >
                          {formik.errors.color}
                        </Typography>
                      )}
                    </Box>

                    <Divider />

                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ mb: 1, fontWeight: 500 }}
                      >
                        Kích cỡ
                      </Typography>
                      <ToggleButtonGroup
                        exclusive
                        value={formik.values.sizes}
                        onChange={(e, val) =>
                          val && formik.setFieldValue("sizes", val)
                        }
                        sx={{ flexWrap: "wrap", gap: 1 }}
                      >
                        {sizeOptions.map((s) => (
                          <ToggleButton
                            key={s}
                            value={s}
                            sx={{
                              borderRadius: "10px !important",
                              border: "1px solid !important",
                              borderColor: "divider",
                              minWidth: 56,
                              textTransform: "none",
                              "&.Mui-selected": {
                                backgroundColor: "primary.main",
                                color: "#fff",
                                borderColor: "primary.main",
                                "&:hover": { backgroundColor: "primary.dark" },
                              },
                            }}
                          >
                            {s}
                          </ToggleButton>
                        ))}
                      </ToggleButtonGroup>
                      {formik.touched.sizes && formik.errors.sizes && (
                        <Typography
                          variant="caption"
                          sx={{ color: "error.main", display: "block", mt: 1 }}
                        >
                          {formik.errors.sizes}
                        </Typography>
                      )}
                    </Box>
                  </div>
                </SectionCard>

                <SectionCard title="Danh mục">
                  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    <FormControl
                      size="small"
                      sx={{ flex: "1 1 220px" }}
                      error={
                        formik.touched.category &&
                        Boolean(formik.errors.category)
                      }
                      required
                    >
                      <InputLabel id="category-label">Danh mục 1</InputLabel>
                      <Select
                        labelId="category-label"
                        id="category"
                        name="category"
                        value={formik.values.category}
                        label="Danh mục 1"
                        onChange={(e) => {
                          formik.setFieldValue("category", e.target.value);
                          formik.setFieldValue("category2", "");
                          formik.setFieldValue("category3", "");
                        }}
                        onBlur={formik.handleBlur}
                      >
                        {mainCategory.map((item) => (
                          <MenuItem
                            value={item.categoryId}
                            key={item.categoryId}
                          >
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {formik.touched.category && formik.errors.category && (
                        <FormHelperText>
                          {formik.errors.category}
                        </FormHelperText>
                      )}
                    </FormControl>

                    <FormControl size="small" sx={{ flex: "1 1 220px" }}>
                      <InputLabel id="category2-label">Danh mục 2</InputLabel>
                      <Select
                        labelId="category2-label"
                        id="category2"
                        name="category2"
                        value={formik.values.category2}
                        label="Danh mục 2"
                        onChange={(e) => {
                          formik.setFieldValue("category2", e.target.value);
                          formik.setFieldValue("category3", "");
                        }}
                        onBlur={formik.handleBlur}
                      >
                        {formik.values.category &&
                          categoryTwo[formik.values.category]?.map((item) => (
                            <MenuItem
                              value={item.categoryId}
                              key={item.categoryId}
                            >
                              {item.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>

                    <FormControl size="small" sx={{ flex: "1 1 220px" }}>
                      <InputLabel id="category3-label">Danh mục 3</InputLabel>
                      <Select
                        labelId="category3-label"
                        id="category3"
                        name="category3"
                        value={formik.values.category3}
                        label="Danh mục 3"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <MenuItem value="">
                          <em>Không</em>
                        </MenuItem>
                        {formik.values.category2 &&
                          childCategory(
                            categoryThree[formik.values.category],
                            formik.values.category2,
                          ).map((item) => (
                            <MenuItem
                              value={item.categoryId}
                              key={item.categoryId}
                            >
                              {item.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Box>
                </SectionCard>
              </Box>
            </Grid2>

            {/* RIGHT: sticky live preview */}
            <Grid2 size={{ xs: 12, md: 4 }}>
              <div className="text-center">
                <Typography
                  variant="overline"
                  sx={{
                    color: "text.secondary",
                    fontWeight: 700,
                    letterSpacing: 1,
                    textAlign: "center",
                  }}
                >
                  Xem trước
                </Typography>
              </div>
              <Box
                sx={{
                  width: "100%",
                  position: { xs: "static", md: "sticky" },
                  top: { md: 0 },
                  alignSelf: "flex-start",
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  {/* Gallery: main image + up to 4 thumbnails */}
                  <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
                    <Box
                      sx={{
                        width: 250,
                        height: 250,
                        maxWidth: "100%",
                        backgroundColor: "#F1F0EC",
                        borderRadius: 1.5,
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                      }}
                    >
                      {previewImages.length > 0 ? (
                        <Box
                          component="img"
                          src={
                            previewImages[selectedImageIndex] ||
                            previewImages[0]
                          }
                          alt="Ảnh chính sản phẩm"
                          sx={{
                            width: 250,
                            height: 250,
                            maxWidth: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      ) : (
                        <Inventory2OutlinedIcon
                          sx={{ fontSize: 48, color: "#C7C6C0" }}
                        />
                      )}
                    </Box>

                    {previewImages.length > 1 && (
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          mt: 1.25,
                          width: 250,
                          maxWidth: "100%",
                          mx: "auto",
                          overflowX: "auto",
                          pb: 0.5,
                          "&::-webkit-scrollbar": { height: 4 },
                          "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "#D8D7D2",
                            borderRadius: 4,
                          },
                        }}
                      >
                        {thumbnailImages.map((image, index) => {
                          const isActive = index === selectedImageIndex;
                          return (
                            <Box
                              key={index}
                              component="img"
                              src={image}
                              alt={`Ảnh phụ ${index + 1}`}
                              onClick={() => setSelectedImageIndex(index)}
                              sx={{
                                flex: "0 0 auto",
                                width: { xs: 52, sm: 60, md: 56, lg: 60 },
                                height: { xs: 52, sm: 60, md: 56, lg: 60 },
                                objectFit: "cover",
                                borderRadius: 1,
                                cursor: "pointer",
                                border: "2px solid",
                                borderColor: isActive
                                  ? "primary.main"
                                  : "divider",
                                opacity: isActive ? 1 : 0.85,
                                transition:
                                  "border-color .15s ease, opacity .15s ease",
                                "&:hover": { opacity: 1 },
                              }}
                            />
                          );
                        })}

                        {extraImageCount > 0 && (
                          <Box
                            sx={{
                              flex: "0 0 auto",
                              width: { xs: 52, sm: 60, md: 56, lg: 60 },
                              height: { xs: 52, sm: 60, md: 56, lg: 60 },
                              borderRadius: 1,
                              border: "1px solid",
                              borderColor: "divider",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: "#F1F0EC",
                              color: "text.secondary",
                              fontSize: "0.8rem",
                              fontWeight: 600,
                            }}
                          >
                            +{extraImageCount}
                          </Box>
                        )}
                      </Box>
                    )}
                  </Box>

                  <Box sx={{ px: { xs: 2, sm: 2.5 }, pb: { xs: 2, sm: 2.5 } }}>
                    <Typography
                      sx={{
                        fontFamily: '"Space Grotesk", sans-serif',
                        fontWeight: 600,
                        fontSize: "1.05rem",
                        mt: 0.25,
                        mb: 1,
                      }}
                      noWrap
                    >
                      {formik.values.title || "Untitled product"}
                    </Typography>

                    <Typography
                      variant="overline"
                      sx={{
                        color: "text.secondary",
                        fontWeight: 600,
                        fontSize: "0.7rem",
                        letterSpacing: 1,
                      }}
                    >
                      {formik.values.description || "Untitled product"}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 1,
                        flexWrap: "wrap",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: '"Space Grotesk", sans-serif',
                          fontWeight: 700,
                          fontSize: "1.4rem",
                        }}
                      >
                        {selling > 0 ? `₫${selling.toLocaleString()}` : "—"}
                      </Typography>
                      {mrp > 0 && selling > 0 && selling < mrp && (
                        <Typography
                          sx={{
                            color: "text.secondary",
                            textDecoration: "line-through",
                            fontSize: "0.9rem",
                          }}
                        >
                          ₫{mrp.toLocaleString()}
                        </Typography>
                      )}
                      {discountPercent > 0 && (
                        <Chip
                          label={`-${discountPercent}%`}
                          size="small"
                          sx={{
                            backgroundColor: "rgba(31,138,95,0.12)",
                            color: "success.main",
                            fontWeight: 600,
                          }}
                        />
                      )}
                    </Box>

                    {(selectedC1 || selectedC2 || selectedC3) && (
                      <Typography
                        variant="caption"
                        sx={{
                          color: "text.secondary",
                          display: "block",
                          mt: 1.5,
                        }}
                      >
                        {[selectedC1?.name, selectedC2?.name, selectedC3?.name]
                          .filter(Boolean)
                          .join(" / ")}
                      </Typography>
                    )}

                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        mt: 1.5,
                        flexWrap: "wrap",
                      }}
                    >
                      {formik.values.color && (
                        <Chip
                          label={formik.values.color}
                          size="small"
                          variant="outlined"
                        />
                      )}
                      {formik.values.sizes && (
                        <Chip
                          label={formik.values.sizes}
                          size="small"
                          variant="outlined"
                        />
                      )}
                      {formik.values.quantity && (
                        <Chip
                          label={`${formik.values.quantity} in stock`}
                          size="small"
                          variant="outlined"
                        />
                      )}
                    </Box>

                    <Button
                      sx={{
                        mt: 2.5,
                        py: 1.3,
                        borderRadius: 1,
                        textTransform: "none",
                        fontSize: "1rem",
                      }}
                      color="primary"
                      variant="contained"
                      fullWidth
                      type="submit"
                      onClick={formik.handleSubmit}
                      disabled={submitting}
                    >
                      {submitting ? (
                        <CircularProgress size={22} sx={{ color: "#fff" }} />
                      ) : (
                        "Add Product"
                      )}
                    </Button>
                  </Box>
                </Paper>
              </Box>
            </Grid2>
          </Grid2>
        </form>
      </Box>
    </ThemeProvider>
  );
};

export default AddProduct;
