import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: 700,
    fontSize: 14,
    borderBottom: `2px solid ${theme.palette.primary.dark}`,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: theme.palette.text.primary,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.background.default,
  },
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.background.paper,
  },
  "&:hover": {
    backgroundColor: theme.palette.secondary.light,
    transition: "background-color 0.3s ease",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 10px 40px rgba(201,169,110,0.10)",
  border: `1px solid ${theme.palette.divider}`,
  overflow: "auto",
}));

function createData(transactionId, type, amount, date, status, description) {
  return { transactionId, type, amount, date, status, description };
}

const rows = [
  createData(
    "TRX001",
    "Nhập tiền",
    "+500.000đ",
    "2024-01-15",
    "Thành công",
    "Nạp tiền khách hàng",
  ),
  createData(
    "TRX002",
    "Rút tiền",
    "-250.000đ",
    "2024-01-14",
    "Thành công",
    "Thanh toán cho nhà cung cấp",
  ),
  createData(
    "TRX003",
    "Hoa hồng",
    "+75.000đ",
    "2024-01-13",
    "Thành công",
    "Hoa hồng bán hàng",
  ),
  createData(
    "TRX004",
    "Hoàn tiền",
    "-100.000đ",
    "2024-01-12",
    "Thành công",
    "Hoàn tiền khách hủy đơn",
  ),
  createData(
    "TRX005",
    "Nhập tiền",
    "+1.200.000đ",
    "2024-01-11",
    "Chờ xác nhận",
    "Nạp tiền khách hàng",
  ),
];

const getTypeIcon = (type) => {
  if (type.includes("Nhập") || type.includes("Hoa hồng")) {
    return <ArrowDownward style={{ color: "#22C55E", fontSize: "20px" }} />;
  }
  return <ArrowUpward style={{ color: "#DC2626", fontSize: "20px" }} />;
};

const getTypeColor = (type) => {
  if (type.includes("Nhập") || type.includes("Hoa hồng")) {
    return "#22C55E";
  }
  return "#DC2626";
};

const getStatusBg = (status, theme) => {
  switch (status) {
    case "Thành công":
      return theme.palette.success.main;
    case "Chờ xác nhận":
      return "#F59E0B";
    case "Thất bại":
      return theme.palette.error.main;
    default:
      return theme.palette.text.secondary;
  }
};

export default function TransactionTable() {
  const theme = useTheme();

  return (
    <div>
      <h2 style={{ marginBottom: "20px", color: theme.palette.text.primary }}>
        Lịch sử giao dịch
      </h2>
      <StyledTableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="transactions table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Mã giao dịch</StyledTableCell>
              <StyledTableCell align="left">Loại giao dịch</StyledTableCell>
              <StyledTableCell align="right">Số tiền</StyledTableCell>
              <StyledTableCell align="center">Ngày</StyledTableCell>
              <StyledTableCell align="center">Trạng thái</StyledTableCell>
              <StyledTableCell align="left">Mô tả</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.transactionId}>
                <StyledTableCell component="th" scope="row">
                  <strong>{row.transactionId}</strong>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    {getTypeIcon(row.type)}
                    <span>{row.type}</span>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <strong
                    style={{ color: getTypeColor(row.type), fontSize: "15px" }}
                  >
                    {row.amount}
                  </strong>
                </StyledTableCell>
                <StyledTableCell align="center">{row.date}</StyledTableCell>
                <StyledTableCell align="center">
                  <span
                    style={{
                      display: "inline-block",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      backgroundColor: getStatusBg(row.status, theme),
                      color: "#FFFFFF",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    {row.status}
                  </span>
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.description}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </div>
  );
}
