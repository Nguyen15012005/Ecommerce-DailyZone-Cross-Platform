import React from "react";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Add } from "@mui/icons-material";
import OrdersTable from './OrdersTable';

export default function Orders() {
  const theme = useTheme();

  return (
    <div>
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div>
          <h1
            style={{ color: theme.palette.text.primary, marginBottom: "8px" }}
          >
            Quản lý đơn hàng
          </h1>
          <p style={{ color: theme.palette.text.secondary }}>
            Theo dõi và quản lý tất cả đơn hàng của bạn
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
          Đơn hàng mới
        </Button>
      </div>

      {/* FILTERS */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "24px",
          flexWrap: "wrap",
        }}
      >
        <select
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: `1px solid ${theme.palette.divider}`,
            background: "#fff",
            color: theme.palette.text.primary,
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          <option>Tất cả trạng thái</option>
          <option>Hoàn thành</option>
          <option>Đang giao</option>
          <option>Chờ xác nhận</option>
        </select>

        <select
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: `1px solid ${theme.palette.divider}`,
            background: "#fff",
            color: theme.palette.text.primary,
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          <option>Tuần này</option>
          <option>Tháng này</option>
          <option>Quý này</option>
          <option>Năm này</option>
        </select>
      </div>

      {/* TABLE */}
      <OrdersTable />
    </div>
  );
}
