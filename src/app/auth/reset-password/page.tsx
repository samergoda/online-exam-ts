"use client";
import { handleResetPassword } from "@/src/_lib/actions/action";
import Input from "@/src/components/common/Input";
import Button from "@/src/components/common/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";

// import { experimental_useFormStatus as useFormStatus } from 'react';

type Inputs = {
  oldPassword: string;
  password: string;
  repassword: string;
};

function ResetPasswordPage() {
  const [error, setError] = useState<String>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  return (
    <div>
      <h2 className="font-bold text-[25px] mb-[31px]">Reset Password</h2>
      <form onSubmit={handleSubmit(handleResetPassword)} method="post" className="flex flex-col gap-4">
        <Input
          type="password"
          {...register("oldPassword", {
            required: {
              value: true,
              message: "Please enter a Password",
            },
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          placeholder="Old Password"
        />

        <Input
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "Please enter a Password",
            },
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          placeholder="New Password"
        />

        <Input
          type="password"
          {...register("repassword", {
            required: {
              value: true,
              message: "Please enter a Password",
            },
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          placeholder="New re-Password"
        />

        <Button>Reset Password</Button>

        {/* Display error or success message */}
        {error && <p className="text-red-500 text-sm max-w-[400px]">{error}</p>}
      </form>
      <div className="text-end">
        <a href="/auth/forgetPassword">Recover Password</a>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
