"use client";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { handleResetPassword } from "@/lib/actions/auth/reset-password.action";
import { useState } from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  oldPassword: string;
  password: string;
  repassword: string;
};

function ResetPasswordPage() {
  const [error] = useState("");

  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm<Inputs>();

  // Create an intermediate function to convert form data
  const onSubmit = async (data: Inputs) => {
    // Convert the form data to FormData
    const formData = new FormData();
    formData.append("oldPassword", data.oldPassword);
    formData.append("password", data.password);
    formData.append("repassword", data.repassword);

    // Call the server action with FormData
    return handleResetPassword(formData);
  };

  return (
    <div>
      <h2 className="font-bold text-[25px] mb-[31px]">Reset Password</h2>
      <form onSubmit={handleSubmit(onSubmit)} method="post" className="flex flex-col gap-4">
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

        <Button disabled={false}>Reset Password</Button>

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
