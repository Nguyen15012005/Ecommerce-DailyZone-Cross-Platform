import { loginWithOtp, sendLoginOtp } from "../../../store/authSlice";
import AuthOtpLogin from "./AuthOtpLogin";

const LoginPage = () => {
  return (
    <AuthOtpLogin sendOtpAction={sendLoginOtp} loginAction={loginWithOtp} />
  );
};

export default LoginPage;
