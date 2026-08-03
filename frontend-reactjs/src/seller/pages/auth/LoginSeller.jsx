import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@mui/material";
import {
  loginSellerWithOtp,
  resetOtpState,
  sendSellerLoginOtp,
} from "../../../store/authSlice";
import FormField from "../../../common/auth/FormField";
import OtpInput from "../../../common/auth/OtpInput";

const emailSchema = Yup.object({
  email: Yup.string()
    .email("Vui lòng nhập địa chỉ email hợp lệ.")
    .required("Vui lòng nhập email."),
});

const otpSchema = Yup.object({
  otp: Yup.string()
    .length(6, "Mã OTP phải gồm 6 số.")
    .required("Vui lòng nhập mã OTP."),
});

const LoginSeller = () => {
  const dispatch = useDispatch();
  const { otpSent, sendOtpLoading, sendOtpError, loginLoading, loginError } =
    useSelector((s) => s.auth);

  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown <= 0) return undefined;
    const timer = setTimeout(
      () => setCountdown((current) => current - 1),
      1000,
    );
    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(
    () => () => {
      dispatch(resetOtpState());
    },
    [dispatch],
  );

  const emailForm = useFormik({
    initialValues: { email: "" },
    validationSchema: emailSchema,
    onSubmit: (values) => {
      dispatch(
        sendSellerLoginOtp({
          email: values.email,
          isLogin: true,
        }),
      );
      setCountdown(60);
    },
  });

  const otpForm = useFormik({
    initialValues: { otp: "" },
    validationSchema: otpSchema,
    onSubmit: (values) => {
      dispatch(
        loginSellerWithOtp({
          email: emailForm.values.email,
          otp: values.otp,
        }),
      );
    },
  });

  const handleResend = () => {
    if (countdown > 0) return;
    otpForm.resetForm();
    dispatch(
      sendSellerLoginOtp({
        email: emailForm.values.email,
        isLogin: true,
      }),
    );
    setCountdown(60);
  };

  const handleBack = () => {
    dispatch(resetOtpState());
    otpForm.resetForm();
    emailForm.resetForm();
  };

  const step = otpSent ? 2 : 1;

  return (
    <>
      {/* Progress Bar */}
      <div className="mb-7 flex gap-1.5">
        <div
          className={`h-1 flex-1 rounded-full ${
            step >= 1 ? "bg-[#C9A96E]" : "bg-[#F0EBDD]"
          }`}
        />
        <div
          className={`h-1 flex-1 rounded-full ${
            step >= 2 ? "bg-[#C9A96E]" : "bg-[#F0EBDD]"
          }`}
        />
      </div>

      {!otpSent ? (
        <form onSubmit={emailForm.handleSubmit}>
          <FormField
            formik={emailForm}
            name="email"
            label="Email Seller"
            type="email"
            autoComplete="email"
            serverError={sendOtpError}
          />

          <Button
            type="submit"
            fullWidth
            disabled={sendOtpLoading}
            sx={{
              mt: 3,
              py: 1.6,
              borderRadius: "14px",
              backgroundColor: "#221A0F",
              color: "white",
              fontWeight: 600,
              textTransform: "none",
              fontSize: "16px",
              "&:hover": {
                backgroundColor: "#3B2B12",
              },
              "&:disabled": {
                opacity: 0.4,
                cursor: "not-allowed",
              },
            }}
          >
            {sendOtpLoading ? "Đang gửi..." : "Gửi mã OTP"}
          </Button>
        </form>
      ) : (
        <>
          <form onSubmit={otpForm.handleSubmit}>
            <div className="mb-4 text-center">
              <label className="mb-2 block text-sm font-medium text-[#3B2B12]">
                Mã xác thực
              </label>
              <p className="mb-4 text-sm text-[#7C6A53]">
                Mã 6 số đã gửi tới{" "}
                <span className="font-medium text-[#3B2B12]">
                  {emailForm.values.email}
                </span>
              </p>
              <OtpInput
                value={otpForm.values.otp}
                onChange={(value) => otpForm.setFieldValue("otp", value)}
              />
              {otpForm.touched.otp && otpForm.errors.otp && (
                <p className="mt-2 text-sm font-medium text-red-500">
                  {otpForm.errors.otp}
                </p>
              )}
              {loginError && (
                <p className="mt-2 text-sm font-medium text-red-500">
                  {loginError}
                </p>
              )}
            </div>

            <Button
              type="submit"
              fullWidth
              disabled={loginLoading || otpForm.values.otp.length !== 6}
              sx={{
                py: 1.6,
                borderRadius: "14px",
                backgroundColor: "#221A0F",
                color: "white",
                fontWeight: 600,
                textTransform: "none",
                fontSize: "16px",
                "&:hover": {
                  backgroundColor: "#3B2B12",
                },
                "&:disabled": {
                  opacity: 0.4,
                  cursor: "not-allowed",
                },
              }}
            >
              {loginLoading ? "Đang xác minh..." : "Đăng nhập"}
            </Button>

            <div className="mt-4 text-center text-sm text-[#7C6A53]">
              Không nhận được mã?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={countdown > 0}
                className="font-medium text-[#B88A44] hover:text-[#8B6A2F] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {countdown > 0 ? `Gửi lại (${countdown}s)` : "Gửi lại"}
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default LoginSeller;
