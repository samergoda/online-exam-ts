"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

function Page() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setErrorMessage(result.error);
      setLoading(false);
    } else {
      // router.push("/");
      window.location.href = "/";
    }
  };

  return (
    <div>
      <h2 className="font-bold text-[25px] mb-[31px]">Sign in</h2>
      <div className="flex flex-col gap-4">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <Link className="text-end text-[#122D9C]" href="/auth/forget-password">
            Recover password
          </Link>

          <Button>{loading ? "Loading..." : "Sign in"}</Button>
        </form>
      </div>
    </div>
  );
}

export default Page;
