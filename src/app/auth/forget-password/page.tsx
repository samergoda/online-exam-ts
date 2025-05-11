"use client";

import Link from "next/link";
import { useState } from "react";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useForm } from "react-hook-form";
import { forgotPasswordAction } from "@/lib/actions/auth/forget-password.action";

type Inputs = {
  email: string;
};

function ForgotPasswordPage() {
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  // Create an intermediate function to convert form data
  const onSubmit = async (data: Inputs) => {
    // Convert the form data to FormData
    const formData = new FormData();
    formData.append("email", data.email);

    try {
      const result = await forgotPasswordAction(formData);
      if (result.error) {
        setError(result.error);
      }
      // Handle success case if needed
    } catch (err) {
      void err;
      setError("An unexpected error occurred");
    }
  };

  return (
    <div>
      <h2 className="font-bold text-[25px] mb-[31px]">Forgot your password?</h2>
      <form onSubmit={handleSubmit(onSubmit)} method="post" className="flex flex-col gap-4">
        <Input
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "Please enter your Email",
            },
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address",
            },
          })}
          placeholder="Email"
        />
        <p className="text-red-400 text-sm">{errors.email?.message}</p>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <Button>Recover Password</Button>
      </form>
      <div className="text-end mt-4">
        <Link href="/auth/signin" className="text-blue-500 hover:underline">
          Back to Sign In
        </Link>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
