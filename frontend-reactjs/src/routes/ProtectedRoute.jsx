import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  // Chưa đăng nhập
  if (!isAuthenticated) {
    if (allowedRoles.includes("ADMIN")) {
      return <Navigate to="/admin/login" replace />;
    }

    if (allowedRoles.includes("SELLER")) {
      return <Navigate to="/seller/login" replace />;
    }

    return <Navigate to="/login" replace />;
  }

  // Không đủ quyền
  if (!allowedRoles.includes(role)) {
    switch (role) {
      case "ADMIN":
        return <Navigate to="/admin" replace />;
      case "SELLER":
        return <Navigate to="/seller" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
