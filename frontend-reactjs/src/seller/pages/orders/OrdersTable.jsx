import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main, // #C9A96E
    color: theme.palette.primary.contrastText, // #FFFFFF
    fontWeight: 700,
    fontSize: 14,
    borderBottom: `2px solid ${theme.palette.primary.dark}`,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: theme.palette.text.primary, // #3B2B12
    borderBottom: `1px solid ${theme.palette.divider}`, // #EEE4D2
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.background.default, // #FAF8F3
  },
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.background.paper, // #FFFFFF
  },
  "&:hover": {
    backgroundColor: theme.palette.secondary.light, // #FFF8ED
    transition: "background-color 0.3s ease",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 10px 40px rgba(201,169,110,0.10)",
  border: `1px solid ${theme.palette.divider}`, // #EEE4D2
  overflow: "auto",

  "&::-webkit-scrollbar": {
    width: "8px",
    height: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: theme.palette.primary.main,
    borderRadius: "20px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: theme.palette.primary.dark,
  },
}));

// Mock data
function createData(orderId, customer, status, date, total, action) {
  return { orderId, customer, status, date, total, action };
}

const rows = [
  createData(
    "ORD001",
    "Nguyễn Văn A",
    "Hoàn thành",
    "2024-01-15",
    "500.000đ",
    "Xem chi tiết",
  ),
  createData(
    "ORD002",
    "Trần Thị B",
    "Đang giao",
    "2024-01-14",
    "750.000đ",
    "Xem chi tiết",
  ),
  createData(
    "ORD003",
    "Lê Văn C",
    "Chờ xác nhận",
    "2024-01-13",
    "1.200.000đ",
    "Xem chi tiết",
  ),
  createData(
    "ORD004",
    "Phạm Thị D",
    "Đã hủy",
    "2024-01-12",
    "300.000đ",
    "Xem chi tiết",
  ),
  createData(
    "ORD005",
    "Hoàng Văn E",
    "Hoàn thành",
    "2024-01-11",
    "890.000đ",
    "Xem chi tiết",
  ),
];

// Status color mapping
const getStatusColor = (status, theme) => {
  switch (status) {
    case "Hoàn thành":
      return theme.palette.success.main; // Green
    case "Đang giao":
      return theme.palette.primary.main; // Gold
    case "Chờ xác nhận":
      return "#F59E0B"; // Amber
    case "Đã hủy":
      return theme.palette.error.main; // Red
    default:
      return theme.palette.text.secondary;
  }
};

export default function OrdersTable() {
  const theme = useTheme();

  return (
    <div>
      <h2 style={{ marginBottom: "20px", color: theme.palette.text.primary }}>
        Danh sách đơn hàng
      </h2>
      <StyledTableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="orders table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Mã đơn hàng</StyledTableCell>
              <StyledTableCell align="left">Sản phẩm</StyledTableCell>
              <StyledTableCell align="center">
                Địa chỉ giao hàng
              </StyledTableCell>
              <StyledTableCell align="center">
                Trạng thái đơn hàng
              </StyledTableCell>
              <StyledTableCell align="center">Tổng tiền</StyledTableCell>
              <StyledTableCell align="center">Hành động</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.orderId}>
                <StyledTableCell component="th" scope="row">
                  <strong>{row.orderId}</strong>
                </StyledTableCell>
                <StyledTableCell align="left">Sản phẩm</StyledTableCell>
                <StyledTableCell align="center">
                  Địa chỉ giao hàng
                </StyledTableCell>
                <StyledTableCell align="center">
                  <span
                    style={{
                      display: "inline-block",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      backgroundColor: getStatusColor(row.status, theme),
                      color: "#FFFFFF",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    {row.status}
                  </span>
                </StyledTableCell>
                <StyledTableCell align="center">{row.date}</StyledTableCell>

                <StyledTableCell align="center">
                  <button
                    style={{
                      padding: "6px 12px",
                      borderRadius: "12px",
                      border: `1px solid ${theme.palette.primary.main}`,
                      background: "transparent",
                      color: theme.palette.primary.main,
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: 600,
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = theme.palette.primary.main;
                      e.target.style.color = "#FFFFFF";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "transparent";
                      e.target.style.color = theme.palette.primary.main;
                    }}
                  >
                    {row.action}
                  </button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </div>
  );
}
