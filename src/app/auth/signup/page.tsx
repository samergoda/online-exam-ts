"use client";

import Link from "next/link";
import Input from "@/src/components/common/Input";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "@/src/components/common/Button";
import { handleSignup } from "@/src/_lib/actions/action";

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repassword: string;
};

function SignupPage() {
  const [error, setError] = useState<String>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (formData: Inputs) => {
    if (formData.password !== formData.repassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await handleSignup(formData);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2 className="font-bold text-2xl mb-8">Sign up</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* First Name */}
        <Input
          type="text"
          {...register("firstName", {
            required: {
              value: true,
              message: "Please enter your First Name",
            },
            maxLength: {
              value: 20,
              message: "First Name cannot exceed 20 characters",
            },
            minLength: {
              value: 2,
              message: "First Name must be at least 2 characters",
            },
            pattern: {
              value: /^[a-zA-Z]+$/,
              message: "First Name should contain only alphabets",
            },
          })}
          placeholder="First Name"
        />
        <p className="text-red-400 text-sm">{errors.firstName?.message}</p>

        {/* Last Name */}
        <Input
          type="text"
          {...register("lastName", {
            required: {
              value: true,
              message: "Please enter your Last Name",
            },
            maxLength: {
              value: 20,
              message: "Last Name cannot exceed 20 characters",
            },
            minLength: {
              value: 2,
              message: "Last Name must be at least 2 characters",
            },
            pattern: {
              value: /^[a-zA-Z]+$/,
              message: "Last Name should contain only alphabets",
            },
          })}
          placeholder="Last Name"
        />
        <p className="text-red-400 text-sm">{errors.lastName?.message}</p>

        {/* Email */}
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

        {/* Password */}
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
          placeholder="Password"
        />
        <p className="text-red-400 text-sm">{errors.password?.message}</p>

        {/* Confirm Password */}
        <Input
          type="password"
          {...register("repassword", {
            required: {
              value: true,
              message: "Please confirm your Password",
            },
          })}
          placeholder="Confirm Password"
        />
        <p className="text-red-400 text-sm">{errors.repassword?.message}</p>

        <div className="text-center">
          <Link href="/auth/signin" className="text-[#122D9C]">
            Already have an account?
          </Link>
        </div>
        <Button>Sign Up</Button>
      </form>
    </div>
  );
}

export default SignupPage;
