import AuthOtpLogin from "../../../common/auth/AuthOtpLogin";
import { loginWithOtp, sendAdminLoginOtp } from "../../../store/authSlice";

export default function AdminLogin() {
  return (
    <AuthOtpLogin
    // sendOtpAction={sendAdminLoginOtp}
    // loginAction={loginWithOtp}
    // title="Đăng Nhập Quản Trị Hệ Thống"
    // submitLabel="Đăng nhập"
    />
  );
}
