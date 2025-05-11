"use client";

import React, { useState, forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ type = "text", placeholder, className, ...props }, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const isPasswordField = type === "password";

  return (
    <div className="relative w-full md:w-[410px]">
      <input
        ref={ref}
        {...props}
        className={`w-full border-2 p-[15px] block rounded-[10px] shadow-[0_10px_20px_0_#4461F20D] ${className || ""}`}
        type={isPasswordField && isPasswordVisible ? "text" : type}
        placeholder={placeholder}
      />
      {isPasswordField && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-xl"
          aria-label="Toggle password visibility">
          {isPasswordVisible ? "🙈" : "👁️"}
        </button>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
