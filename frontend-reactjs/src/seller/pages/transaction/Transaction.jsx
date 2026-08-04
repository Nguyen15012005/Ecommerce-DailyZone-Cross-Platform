import React from "react";
import TransactionTable from "./TransactionTable";
import { Button, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Download, DateRange } from "@mui/icons-material";

export default function Transaction() {
  const theme = useTheme();
  const [dateFrom, setDateFrom] = React.useState("");
  const [dateTo, setDateTo] = React.useState("");

  const handleExport = () => {
    console.log("Exporting data...");
    // Implement export logic
  };

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
            Lịch sử giao dịch
          </h1>
          <p style={{ color: theme.palette.text.secondary }}>
            Xem chi tiết tất cả giao dịch tài chính của bạn
          </p>
        </div>

        <Button
          variant="outlined"
          color="primary"
          startIcon={<Download />}
          onClick={handleExport}
          sx={{
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
            fontWeight: 700,
            padding: "10px 20px",
            borderRadius: "12px",
            "&:hover": {
              background: theme.palette.primary.main,
              color: "#fff",
            },
          }}
        >
          Xuất báo cáo
        </Button>
      </div>

      {/* FILTERS */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "24px",
          flexWrap: "wrap",
          alignItems: "center",
          padding: "16px",
          background: "#fff",
          borderRadius: "12px",
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <DateRange style={{ color: theme.palette.primary.main }} />

        <TextField
          label="Từ ngày"
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{
            width: "150px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              "& fieldset": {
                borderColor: theme.palette.divider,
              },
            },
          }}
        />

        <span style={{ color: theme.palette.text.secondary }}>đến</span>

        <TextField
          label="Đến ngày"
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{
            width: "150px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              "& fieldset": {
                borderColor: theme.palette.divider,
              },
            },
          }}
        />

        <select
          style={{
            padding: "10px 12px",
            borderRadius: "8px",
            border: `1px solid ${theme.palette.divider}`,
            background: "#fff",
            color: theme.palette.text.primary,
            cursor: "pointer",
            fontWeight: 500,
            fontSize: "14px",
          }}
        >
          <option>Tất cả loại giao dịch</option>
          <option>Nhập tiền</option>
          <option>Rút tiền</option>
          <option>Hoa hồng</option>
          <option>Hoàn tiền</option>
        </select>

        <select
          style={{
            padding: "10px 12px",
            borderRadius: "8px",
            border: `1px solid ${theme.palette.divider}`,
            background: "#fff",
            color: theme.palette.text.primary,
            cursor: "pointer",
            fontWeight: 500,
            fontSize: "14px",
          }}
        >
          <option>Tất cả trạng thái</option>
          <option>Thành công</option>
          <option>Chờ xác nhận</option>
          <option>Thất bại</option>
        </select>

        <Button
          variant="contained"
          color="primary"
          sx={{
            background: theme.palette.primary.main,
            color: "#fff",
            fontWeight: 700,
            marginLeft: "auto",
            borderRadius: "8px",
            "&:hover": {
              background: theme.palette.primary.dark,
            },
          }}
        >
          Tìm kiếm
        </Button>
      </div>

      {/* SUMMARY */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            padding: "16px",
            background: "#fff",
            borderRadius: "12px",
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <p
            style={{
              color: theme.palette.text.secondary,
              margin: "0 0 8px 0",
              fontSize: "12px",
            }}
          >
            Tổng nhập tiền
          </p>
          <h3 style={{ color: "#22C55E", margin: 0, fontSize: "20px" }}>
            +5.2M
          </h3>
        </div>

        <div
          style={{
            padding: "16px",
            background: "#fff",
            borderRadius: "12px",
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <p
            style={{
              color: theme.palette.text.secondary,
              margin: "0 0 8px 0",
              fontSize: "12px",
            }}
          >
            Tổng rút tiền
          </p>
          <h3 style={{ color: "#DC2626", margin: 0, fontSize: "20px" }}>
            -2.1M
          </h3>
        </div>

        <div
          style={{
            padding: "16px",
            background: "#fff",
            borderRadius: "12px",
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <p
            style={{
              color: theme.palette.text.secondary,
              margin: "0 0 8px 0",
              fontSize: "12px",
            }}
          >
            Tổng hoa hồng
          </p>
          <h3
            style={{
              color: theme.palette.primary.main,
              margin: 0,
              fontSize: "20px",
            }}
          >
            +456K
          </h3>
        </div>

        <div
          style={{
            padding: "16px",
            background: "#fff",
            borderRadius: "12px",
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <p
            style={{
              color: theme.palette.text.secondary,
              margin: "0 0 8px 0",
              fontSize: "12px",
            }}
          >
            Số dư
          </p>
          <h3
            style={{
              color: theme.palette.primary.main,
              margin: 0,
              fontSize: "20px",
            }}
          >
            3.1M
          </h3>
        </div>
      </div>

      {/* TABLE */}
      <TransactionTable />
    </div>
  );
}
