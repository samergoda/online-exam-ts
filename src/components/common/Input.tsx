"use client";

import React, { useState, forwardRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
    <div className="relative w-96  md:w-full">
      <input
        ref={ref}
        {...props}
        className={`w-full border-2 p-4 block rounded-lg shadow-md ${className || ""}`}
        type={isPasswordField && isPasswordVisible ? "text" : type}
        placeholder={placeholder}
      />
      {isPasswordField && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-xl"
          aria-label="Toggle password visibility">
          {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
