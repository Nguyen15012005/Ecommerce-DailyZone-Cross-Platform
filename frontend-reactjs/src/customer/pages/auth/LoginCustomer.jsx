import AuthOtpLogin from "../../../common/auth/AuthOtpLogin";
import { loginWithOtp, sendLoginOtp } from "../../../store/authSlice";

const LoginCustomer = () => {
  return (
    <AuthOtpLogin sendOtpAction={sendLoginOtp} loginAction={loginWithOtp} />
  );
};

export default LoginCustomer;
