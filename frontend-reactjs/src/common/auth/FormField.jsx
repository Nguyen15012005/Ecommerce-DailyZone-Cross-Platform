import React from "react";

/**
 * Input floating-label kiểu MUI TextField, dùng thuần Tailwind (kỹ thuật `peer`).
 * Nhận trực tiếp instance `formik` + `name` để tự lấy value/onChange/touched/error.
 *
 * Dùng: <FormField formik={formik} name="email" label="Email" type="email" />
 */
const FormField = ({
  formik,
  name,
  label,
  type = "text",
  autoComplete,
  autoFocus,
  serverError,
}) => {
  const error = formik.touched[name] && formik.errors[name];
  const hasError = Boolean(error) || Boolean(serverError);

  return (
    <div>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={type}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder=" "
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          className={`peer w-full rounded-lg border bg-[#FAFAF8] px-3.5 pb-2 pt-5 text-sm text-[#221A0F] outline-none transition-colors placeholder-transparent focus:bg-white focus:ring-2 focus:ring-[#C9A96E]/20 ${
            hasError
              ? "border-red-400 focus:border-red-400"
              : "border-[#E5DFCC] focus:border-[#C9A96E]"
          }`}
        />
        <label
          htmlFor={name}
          className="pointer-events-none absolute left-3.5 top-1.5 text-[11px] font-medium text-[#B88A44] transition-all duration-150 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-[#B8AC94] peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:font-medium peer-focus:text-[#B88A44]"
        >
          {label}
        </label>
      </div>

      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>
      )}
      {serverError && (
        <p className="mt-1.5 text-xs font-medium text-red-500">{serverError}</p>
      )}
    </div>
  );
};

export default FormField;
