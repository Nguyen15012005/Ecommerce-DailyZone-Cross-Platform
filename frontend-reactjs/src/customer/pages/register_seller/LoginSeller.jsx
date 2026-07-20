import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  loginWithOtp,
  resetOtpState,
  sendLoginOtp,
} from "../../../store/authSlice";
import { TextField } from "@mui/material";

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
  const navigate = useNavigate();

  const {
    otpSent,
    sendOtpLoading,
    sendOtpError,
    loginLoading,
    loginError,
    isAuthenticated,
  } = useSelector((s) => s.auth);

  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  useEffect(
    () => () => {
      dispatch(resetOtpState());
    },
    [dispatch],
  );

  // ── Formik bước 1: Email ──
  const emailForm = useFormik({
    initialValues: { email: "" },
    validationSchema: emailSchema,
    onSubmit: (values) => {
      dispatch(sendLoginOtp({ email: values.email }));
      setCountdown(60);
    },
  });

  // ── Formik bước 2: OTP ──
  const otpForm = useFormik({
    initialValues: { otp: "" },
    validationSchema: otpSchema,
    onSubmit: (values) => {
      dispatch(
        loginWithOtp({ email: emailForm.values.email, otp: values.otp }),
      );
    },
  });

  const handleResend = () => {
    if (countdown > 0) return;
    otpForm.resetForm();
    dispatch(sendLoginOtp({ email: emailForm.values.email }));
    setCountdown(60);
  };

  const handleBack = () => {
    dispatch(resetOtpState());
    otpForm.resetForm();
  };

  const step = otpSent ? 2 : 1;
  return (
    <div>
      <div className="rounded-2xl border border-[#EFE8D8] bg-white p-8 shadow-[0_2px_24px_rgba(0,0,0,0.04)]">
        {/* Progress bar bước */}
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
          <>
            <h1 className="mb-1 text-xl font-semibold text-[#221A0F]">
              Đăng nhập
            </h1>
            <p className="mb-6 text-sm text-[#8B7355]">
              Nhập email để nhận mã xác thực.
            </p>

            <form onSubmit={emailForm.handleSubmit}>
              <TextField
                formik={emailForm}
                name="email"
                label="Email"
                type="email"
                autoComplete="email"
                autoFocus
                serverError={sendOtpError}
              />

              <button
                type="submit"
                disabled={sendOtpLoading}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#221A0F] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3B2B12] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {sendOtpLoading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Đang gửi...
                  </>
                ) : (
                  "Gửi mã OTP"
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-[#8B7355]">
              Chưa có tài khoản?{" "}
              <Link
                to="/register"
                className="font-semibold text-[#B88A44] hover:text-[#8B6A2F]"
              >
                Đăng ký
              </Link>
            </p>
          </>
        ) : (
          <>
            <button
              onClick={handleBack}
              className="mb-4 text-sm font-medium text-[#8B7355] hover:text-[#221A0F]"
            >
              ← Quay lại
            </button>

            <h1 className="mb-1 text-xl font-semibold text-[#221A0F]">
              Nhập mã xác thực
            </h1>
            <p className="mb-6 text-sm text-[#8B7355]">
              Mã 6 số đã gửi tới{" "}
              <span className="font-medium text-[#221A0F]">
                {emailForm.values.email}
              </span>
            </p>

            <form onSubmit={otpForm.handleSubmit}>
              <OtpInput
                value={otpForm.values.otp}
                onChange={(val) => otpForm.setFieldValue("otp", val)}
              />
              {otpForm.touched.otp && otpForm.errors.otp && (
                <p className="mt-3 text-center text-xs font-medium text-red-500">
                  {otpForm.errors.otp}
                </p>
              )}
              {loginError && (
                <p className="mt-3 text-center text-xs font-medium text-red-500">
                  {loginError}
                </p>
              )}

              <button
                type="submit"
                disabled={loginLoading || otpForm.values.otp.length !== 6}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#221A0F] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3B2B12] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loginLoading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Đang xác minh...
                  </>
                ) : (
                  "Đăng nhập"
                )}
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-[#8B7355]">
              Không nhận được mã?{" "}
              <button
                onClick={handleResend}
                disabled={countdown > 0}
                className="font-semibold text-[#B88A44] hover:text-[#8B6A2F] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {countdown > 0 ? `Gửi lại (${countdown}s)` : "Gửi lại"}
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginSeller;
