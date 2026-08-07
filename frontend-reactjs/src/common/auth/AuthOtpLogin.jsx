/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { resetOtpState } from "../../store/authSlice";
import FormField from "./FormField";
import OtpInput from "./OtpInput";

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

const LogoButton = ({ onClick }) => (
  <div className="flex-col">
    <button
      type="button"
      onClick={onClick}
      className="mx-auto mb-8 flex items-center justify-center gap-2"
    >
      <div className="flex cursor-pointer items-center gap-2 lg:gap-3">
        <div className="flex flex-col leading-none">
          <span className="font-serif text-[26px] text-[#C9A96E] lg:text-[40px]">
            D
          </span>
          <span className="-mt-4 ml-2 font-serif text-[26px] text-[#C9A96E] lg:-mt-6 lg:ml-3 lg:text-[40px]">
            Z
          </span>
        </div>

        <div className="flex flex-col">
          <h1 className="mb-1 font-serif text-[14px] tracking-[2px] text-[#3B2B12] sm:text-[16px] lg:mb-2 lg:text-[20px] lg:tracking-[3px]">
            DAILY ZONE
          </h1>
          <span className="hidden text-[8px] uppercase tracking-[5px] text-[#8B7355] sm:block lg:text-[9px]">
            Style your life
          </span>
        </div>
      </div>
    </button>
  </div>
);

const AuthOtpLogin = ({
  sendOtpAction,
  loginAction,
  sendOtpPayload = (email) => ({ email }),
  loginPayload = (email, otp) => ({ email, otp }),
  redirectTo = "/",
  title = "Đăng nhập",
  subtitle = "Nhập email để nhận mã xác thực.",
  otpTitle = "Nhập mã xác thực",
  submitLabel = "Đăng nhập",
  loadingSubmitLabel = "Đang xác minh...",
  registerPrompt = "Chưa có tài khoản?",
  registerLabel = "Đăng ký",
  registerTo = "/register",
  termsPrefix = "Bằng cách tiếp tục, bạn đồng ý với",
  variant = "page",
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    otpSent,
    sendOtpLoading,
    sendOtpError,
    loginLoading,
    loginError,
    isAuthenticated,
    role,
  } = useSelector((s) => s.auth);

  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) return;

    if (role === "ADMIN") {
      navigate("/admin", { replace: true });
    } else if (role === "SELLER") {
      navigate("/seller", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, role, navigate]);

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
      dispatch(sendOtpAction(sendOtpPayload(values.email)));
      setCountdown(60);
    },
  });

  const otpForm = useFormik({
    initialValues: { otp: "" },
    validationSchema: otpSchema,
    onSubmit: (values) => {
      dispatch(loginAction(loginPayload(emailForm.values.email, values.otp)));
    },
  });

  const handleResend = () => {
    if (countdown > 0) return;
    otpForm.resetForm();
    dispatch(sendOtpAction(sendOtpPayload(emailForm.values.email)));
    setCountdown(60);
  };

  const handleBack = () => {
    dispatch(resetOtpState());
    otpForm.resetForm();
  };

  const step = otpSent ? 2 : 1;

  const card = (
    <>
      <div className="rounded-2xl border border-[#EFE8D8] bg-white p-8 shadow-[0_2px_24px_rgba(0,0,0,0.04)]">
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
            <h1 className="mb-1 text-2xl font-semibold text-[#6f5530]">
              {title}
            </h1>
            <p className="mb-6 text-sm text-[#8B7355]">{subtitle}</p>

            <form onSubmit={emailForm.handleSubmit}>
              <FormField
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
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#a37d49] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#503f24] disabled:cursor-not-allowed disabled:opacity-40"
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

            {/* {location.pathname !== "/admin/login" && registerTo && (
              <p className="mt-6 text-center text-sm text-[#8B7355]">
                {registerPrompt}{" "}
                <Link
                  to={registerTo}
                  className="font-semibold text-[#B88A44] hover:text-[#8B6A2F]"
                >
                  {registerLabel}
                </Link>
              </p>
            )} */}
            <div className="mt-2 flex justify-center items-center">
              <button
                onClick={() => {
                  if (location.pathname === "/admin/login") {
                    navigate("/login");
                  } else {
                    navigate("/admin/login");
                  }
                }}
                className="mt-4 justify-center text-sm text-[#8B7355] underline hover:text-[#1a0f02]"
              >
                {location.pathname === "/admin/login"
                  ? "Quay lại trang đăng nhập của khách hàng"
                  : "Quản trị hệ thống đăng nhập tại đây"}
              </button>
            </div>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={handleBack}
              className="mb-4 text-sm font-medium text-[#8B7355] hover:text-[#221A0F]"
            >
              ← Quay lại
            </button>

            <h1 className="mb-1 text-xl font-semibold text-[#221A0F]">
              {otpTitle}
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
                onChange={(value) => otpForm.setFieldValue("otp", value)}
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
                    {loadingSubmitLabel}
                  </>
                ) : (
                  submitLabel
                )}
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-[#8B7355]">
              Không nhận được mã?{" "}
              <button
                type="button"
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

      <p className="mt-6 text-center text-xs leading-relaxed text-[#B8AC94]">
        {termsPrefix}{" "}
        <a href="#" className="underline hover:text-[#8B7355]">
          Điều khoản
        </a>{" "}
        &amp;{" "}
        <a href="#" className="underline hover:text-[#8B7355]">
          Chính sách bảo mật
        </a>
        .
      </p>
    </>
  );

  if (variant === "embedded") {
    return <div className="mx-auto w-full max-w-[600px]">{card}</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF8F3] px-4 py-10 font-sans">
      <div className="w-full max-w-[600px]">
        <LogoButton onClick={() => navigate("/")} />
        {card}
      </div>
      <div className="fixed left-6 top-6 z-[9999]">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/")}
          sx={{
            bgcolor: "#fff",
            color: "#3B2B12",
            px: 2.5,
            py: 1.2,
            borderRadius: "14px",
            border: "1px solid #EFE3CF",
            textTransform: "none",
            fontWeight: 600,
            boxShadow: "0 8px 24px rgba(0,0,0,.06)",
            "&:hover": {
              bgcolor: "#FFF7E8",
              borderColor: "#B88A44",
            },
          }}
        >
          Quay lại
        </Button>
      </div>
    </div>
  );
};

export default AuthOtpLogin;
