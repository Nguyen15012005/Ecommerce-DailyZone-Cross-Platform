import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  sendRegisterOtp,
  registerUser,
  resetOtpState,
} from "../../../store/authSlice";
import OtpInput from "./OtpInput";
import { Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    registerOtpSent,
    sendRegisterOtpLoading,
    sendRegisterOtpError,
    registerLoading,
    registerError,
    isAuthenticated,
  } = useSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
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

  const validateStep1 = () => {
    const newErrors = {};
    if (!fullName.trim() || fullName.trim().length < 2)
      newErrors.fullName = "Vui lòng nhập họ tên (ít nhất 2 ký tự).";
    if (
      !phone.trim() ||
      !/^(0|\+84)[3|5|7|8|9][0-9]{8}$/.test(phone.replace(/\s+/g, ""))
    )
      newErrors.phone = "Vui lòng nhập số điện thoại hợp lệ.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Vui lòng nhập địa chỉ email hợp lệ.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!validateStep1()) return;
    dispatch(sendRegisterOtp({ email }));
    setCountdown(60);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (otp.length !== 6) return;
    dispatch(registerUser({ email, fullName, phone, otp }));
  };

  const handleResend = () => {
    if (countdown > 0) return;
    setOtp("");
    dispatch(sendRegisterOtp({ email }));
    setCountdown(60);
  };

  const handleBack = () => {
    dispatch(resetOtpState());
    setOtp("");
  };

  const step = registerOtpSent ? 2 : 1;

  const inputClass = (hasError) =>
    `w-full rounded-lg border bg-[#FAFAF8] px-3.5 py-2.5 text-sm text-[#221A0F] outline-none transition-colors placeholder:text-[#B8AC94] focus:border-[#C9A96E] focus:bg-white focus:ring-2 focus:ring-[#C9A96E]/20 ${
      hasError ? "border-red-400" : "border-[#E5DFCC]"
    }`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF8F3] px-4 py-10 font-sans">
      <div className="w-full max-w-[600px]">
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
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

        {/* Card */}
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

          {!registerOtpSent ? (
            <>
              <h1 className="mb-1 text-xl font-semibold text-[#221A0F]">
                Tạo tài khoản
              </h1>
              <p className="mb-6 text-sm text-[#8B7355]">
                Điền thông tin để bắt đầu.
              </p>

              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label
                    htmlFor="register-fullname"
                    className="mb-1.5 block text-sm font-medium text-[#221A0F]"
                  >
                    Họ và tên
                  </label>
                  <input
                    id="register-fullname"
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      setErrors((prev) => ({ ...prev, fullName: "" }));
                    }}
                    placeholder="Nguyễn Văn A"
                    className={inputClass(errors.fullName)}
                    autoComplete="name"
                    autoFocus
                  />
                  {errors.fullName && (
                    <p className="mt-1.5 text-xs font-medium text-red-500">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="register-phone"
                    className="mb-1.5 block text-sm font-medium text-[#221A0F]"
                  >
                    Số điện thoại
                  </label>
                  <input
                    id="register-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setErrors((prev) => ({ ...prev, phone: "" }));
                    }}
                    placeholder="0912345678"
                    className={inputClass(errors.phone)}
                    autoComplete="tel"
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-xs font-medium text-red-500">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="register-email"
                    className="mb-1.5 block text-sm font-medium text-[#221A0F]"
                  >
                    Email
                  </label>
                  <input
                    id="register-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors((prev) => ({ ...prev, email: "" }));
                    }}
                    placeholder="you@example.com"
                    className={inputClass(errors.email || sendRegisterOtpError)}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs font-medium text-red-500">
                      {errors.email}
                    </p>
                  )}
                  {sendRegisterOtpError && (
                    <p className="mt-1.5 text-xs font-medium text-red-500">
                      {sendRegisterOtpError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={
                    sendRegisterOtpLoading ||
                    !email.trim() ||
                    !fullName.trim() ||
                    !phone.trim()
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#221A0F] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3B2B12] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {sendRegisterOtpLoading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Đang gửi mã OTP...
                    </>
                  ) : (
                    "Gửi mã OTP"
                  )}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-[#8B7355]">
                Đã có tài khoản?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-[#B88A44] hover:text-[#8B6A2F]"
                >
                  Đăng nhập
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
                Xác minh email
              </h1>
              <p className="mb-4 text-sm text-[#8B7355]">
                Mã 6 số đã gửi tới{" "}
                <span className="font-medium text-[#221A0F]">{email}</span>
              </p>

              <div className="mb-5 flex items-center justify-between rounded-lg border border-[#E5DFCC] bg-[#FAFAF8] px-3.5 py-2.5">
                <span className="text-xs text-[#8B7355]">Đăng ký cho</span>
                <span className="text-sm font-semibold text-[#221A0F]">
                  {fullName}
                </span>
              </div>

              <form onSubmit={handleRegister}>
                <OtpInput value={otp} onChange={setOtp} />
                {registerError && (
                  <p className="mt-3 text-center text-xs font-medium text-red-500">
                    {registerError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={registerLoading || otp.length !== 6}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#221A0F] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3B2B12] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {registerLoading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Đang tạo tài khoản...
                    </>
                  ) : (
                    "Tạo tài khoản"
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

        <p className="mt-6 text-center text-xs leading-relaxed text-[#B8AC94]">
          Bằng cách đăng ký, bạn đồng ý với{" "}
          <a href="#" className="underline hover:text-[#8B7355]">
            Điều khoản
          </a>{" "}
          &amp;{" "}
          <a href="#" className="underline hover:text-[#8B7355]">
            Chính sách bảo mật
          </a>
          .
        </p>
      </div>
      <div className="absolute left-6 top-6 z-50">
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

export default RegisterPage;
