import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import { Delete, Edit } from "@mui/icons-material";

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

function createData(productId, name, category, price, stock, status, action) {
  return { productId, name, category, price, stock, status, action };
}

const rows = [
  createData("PRO001", "Áo thun nam", "Áo", "250.000đ", 45, "Còn hàng", "Edit"),
  createData("PRO002", "Quần jean", "Quần", "500.000đ", 12, "Sắp hết", "Edit"),
  createData(
    "PRO003",
    "Giày thể thao",
    "Giày",
    "800.000đ",
    0,
    "Hết hàng",
    "Edit",
  ),
  createData("PRO004", "Váy nữ", "Váy", "350.000đ", 28, "Còn hàng", "Edit"),
  createData(
    "PRO005",
    "Tất nam",
    "Phụ kiện",
    "50.000đ",
    120,
    "Còn hàng",
    "Edit",
  ),
];

const getStockColor = (status, theme) => {
  switch (status) {
    case "Còn hàng":
      return theme.palette.success.main;
    case "Sắp hết":
      return "#F59E0B";
    case "Hết hàng":
      return theme.palette.error.main;
    default:
      return theme.palette.text.secondary;
  }
};

export default function ProductsTable() {
  const theme = useTheme();

  return (
    <div>
      <h2 style={{ marginBottom: "20px", color: theme.palette.text.primary }}>
        Danh sách sản phẩm
      </h2>
      <StyledTableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="products table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Mã sản phẩm</StyledTableCell>
              <StyledTableCell align="left">Tên sản phẩm</StyledTableCell>
              <StyledTableCell align="center">Ảnh sản phẩm</StyledTableCell>
              <StyledTableCell align="center">màu sắc</StyledTableCell>
              <StyledTableCell align="center">Giá sản phẩm</StyledTableCell>
              <StyledTableCell align="center">Kho</StyledTableCell>
              <StyledTableCell align="center">
                Trạng thái sản phẩm
              </StyledTableCell>
              <StyledTableCell align="center">Hành động</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.productId}>
                <StyledTableCell component="th" scope="row">
                  <strong>{row.productId}</strong>
                </StyledTableCell>
                <StyledTableCell align="left">{row.name}</StyledTableCell>
                <StyledTableCell align="center">Ảnh sản phẩm</StyledTableCell>
                <StyledTableCell align="center">{row.category}</StyledTableCell>
                <StyledTableCell align="center">
                  <strong style={{ color: theme.palette.primary.main }}>
                    {row.price}
                  </strong>
                </StyledTableCell>

                <StyledTableCell align="center">{row.stock}</StyledTableCell>
                <StyledTableCell align="center">
                  <span
                    style={{
                      display: "inline-block",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      backgroundColor: getStockColor(row.status, theme),
                      color: "#FFFFFF",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    {row.status}
                  </span>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      style={{
                        padding: "6px 8px",
                        borderRadius: "8px",
                        border: "none",
                        background: theme.palette.primary.main,
                        color: "#FFFFFF",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "12px",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = theme.palette.primary.dark;
                        e.target.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = theme.palette.primary.main;
                        e.target.style.transform = "scale(1)";
                      }}
                    >
                      <Edit fontSize="small" /> Sửa
                    </button>
                    <button
                      style={{
                        padding: "6px 8px",
                        borderRadius: "8px",
                        border: "none",
                        background: "#DC2626",
                        color: "#FFFFFF",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "12px",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "#B91C1C";
                        e.target.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "#DC2626";
                        e.target.style.transform = "scale(1)";
                      }}
                    >
                      <Delete fontSize="small" /> Xóa
                    </button>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </div>
  );
}
