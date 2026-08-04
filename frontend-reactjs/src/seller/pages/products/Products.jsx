import React from "react";
import ProductsTable from "./ProductsTable";

import { Button, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Add, Search } from "@mui/icons-material";

export default function Products() {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = React.useState("");

  return (
    <div>
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <h1
            style={{ color: theme.palette.text.primary, marginBottom: "8px" }}
          >
            Quản lý sản phẩm
          </h1>
          <p style={{ color: theme.palette.text.secondary }}>
            Quản lý kho hàng và thông tin sản phẩm
          </p>
        </div>

        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          sx={{
            background: `linear-gradient(135deg, #D6B57A 0%, #C9A96E 50%, #B88A44 100%)`,
            color: "#fff",
            fontWeight: 700,
            padding: "12px 24px",
            borderRadius: "12px",
            "&:hover": {
              background: "#fff",
              color: "#B88A44",
              border: `1px solid ${theme.palette.primary.main}`,
              boxShadow: "0 10px 24px rgba(201,169,110,0.25)",
            },
          }}
        >
          Thêm sản phẩm
        </Button>
      </div>

      {/* SEARCH & FILTER */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "24px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div style={{ flex: 1, minWidth: "250px" }}>
          <TextField
            fullWidth
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <Search
                  style={{
                    marginRight: "8px",
                    color: theme.palette.primary.main,
                  }}
                />
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                background: "#fff",
                "& fieldset": {
                  borderColor: theme.palette.divider,
                },
                "&:hover fieldset": {
                  borderColor: theme.palette.primary.main,
                },
              },
            }}
          />
        </div>

        <select
          style={{
            padding: "12px 16px",
            borderRadius: "12px",
            border: `1px solid ${theme.palette.divider}`,
            background: "#fff",
            color: theme.palette.text.primary,
            cursor: "pointer",
            fontWeight: 500,
            fontSize: "14px",
          }}
        >
          <option>Tất cả loại hàng</option>
          <option>Áo</option>
          <option>Quần</option>
          <option>Giày</option>
          <option>Váy</option>
        </select>

        <select
          style={{
            padding: "12px 16px",
            borderRadius: "12px",
            border: `1px solid ${theme.palette.divider}`,
            background: "#fff",
            color: theme.palette.text.primary,
            cursor: "pointer",
            fontWeight: 500,
            fontSize: "14px",
          }}
        >
          <option>Tất cả trạng thái</option>
          <option>Còn hàng</option>
          <option>Sắp hết</option>
          <option>Hết hàng</option>
        </select>
      </div>

      {/* QUICK STATS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            padding: "20px",
            background: "#fff",
            borderRadius: "12px",
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <p
            style={{ color: theme.palette.text.secondary, margin: "0 0 8px 0" }}
          >
            Tổng sản phẩm
          </p>
          <h3 style={{ color: theme.palette.primary.main, margin: 0 }}>456</h3>
        </div>
        <div
          style={{
            padding: "20px",
            background: "#fff",
            borderRadius: "12px",
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <p
            style={{ color: theme.palette.text.secondary, margin: "0 0 8px 0" }}
          >
            Còn hàng
          </p>
          <h3 style={{ color: "#22C55E", margin: 0 }}>420</h3>
        </div>
        <div
          style={{
            padding: "20px",
            background: "#fff",
            borderRadius: "12px",
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <p
            style={{ color: theme.palette.text.secondary, margin: "0 0 8px 0" }}
          >
            Sắp hết hàng
          </p>
          <h3 style={{ color: "#F59E0B", margin: 0 }}>28</h3>
        </div>
        <div
          style={{
            padding: "20px",
            background: "#fff",
            borderRadius: "12px",
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <p
            style={{ color: theme.palette.text.secondary, margin: "0 0 8px 0" }}
          >
            Hết hàng
          </p>
          <h3 style={{ color: "#DC2626", margin: 0 }}>8</h3>
        </div>
      </div>

      {/* TABLE */}
      <ProductsTable />
    </div>
  );
}
