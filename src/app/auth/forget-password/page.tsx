"use client";

import { forgotPasswordAction } from "@/app/_lib/action";
import Input from "@/src/components/common/Input";
import Button from "@/app/_components/Button";
import Link from "next/link";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
type Inputs = {
  email: string;
};
function ForgotPasswordPage() {
  const [error, setError] = useState<String>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  return (
    <div>
      <h2 className="font-bold text-[25px] mb-[31px]">Forgot your password?</h2>
      <form onSubmit={handleSubmit(forgotPasswordAction)} method="post" className="flex flex-col gap-4">
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
