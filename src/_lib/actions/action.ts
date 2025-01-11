"use server";

import { OPTIONS as AUTH_OPTIONS } from "@/src/app/api/auth/[...nextauth]/route";
import { NextAuthOptions } from "next-auth";

const OPTIONS: NextAuthOptions = AUTH_OPTIONS;
import { getServerSession } from "next-auth/next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Define types for form data entries
type SignupFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
};

type ResetPasswordFormData = {
  oldPassword: string;
  password: string;
  rePassword: string;
};

type ForgotPasswordFormData = {
  email: string;
};

type VerifyResetCodeFormData = {
  resetCode: string;
};

// Create session
export async function create() {
  const session = await getServerSession(OPTIONS);
  console.log(session);
  return session;
}

// Handle signup
export async function handleSignup(formData: FormData): Promise<void> {
  const { firstName, lastName, email, password, rePassword } =
    Object.fromEntries(formData.entries()) as SignupFormData;

  if (password !== rePassword) {
    throw new Error("Passwords do not match");
  }

  if (password.length < 6 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
    throw new Error(
      "Password must be at least 6 characters, include an uppercase letter, and a number."
    );
  }

  const payload = {
    username: firstName + lastName,
    firstName,
    lastName,
    email,
    password,
    rePassword,
    phone: "01094155711",
  };

  try {
    const response = await fetch(
      "https://exam.elevateegy.com/api/v1/auth/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to sign up.");
    }

    redirect("/auth/signin");
  } catch (error) {
    throw error;
  }
}

// Handle password reset
export async function handleResetPassword(
  formData: FormData
): Promise<{ success?: string; error?: string }> {
  const { oldPassword, password, rePassword } = Object.fromEntries(
    formData.entries()
  ) as ResetPasswordFormData;

  if (password.length < 6 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
    return {
      error:
        "Password must be at least 6 characters, include an uppercase letter, and a number.",
    };
  }

  if (password !== rePassword) {
    throw new Error("Passwords do not match");
  }

  try {
    const response = await fetch(
      "https://exam.elevateegy.com/api/v1/auth/changePassword",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, password }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || "Something went wrong" };
    }

    return { success: "Password changed successfully!" };
  } catch (err) {
    return { error: (err as Error).message };
  }
}

// Verify reset code
export async function verifyResetCodeAction(
  formData: FormData
): Promise<{ success?: string; error?: string }> {
  const { resetCode } = Object.fromEntries(
    formData.entries()
  ) as VerifyResetCodeFormData;

  try {
    const response = await fetch(
      "https://exam.elevateegy.com/api/v1/auth/verifyResetCode",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetCode }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || "Failed to verify the code" };
    }

    return { success: "Code verified successfully!" };
  } catch (err) {
    return { error: (err as Error).message };
  }
}

// Handle forgot password
export async function forgotPasswordAction(
  formData: FormData
): Promise<{ success?: string; error?: string }> {
  const { email } = Object.fromEntries(
    formData.entries()
  ) as ForgotPasswordFormData;

  try {
    const response = await fetch(
      "https://exam.elevateegy.com/api/v1/auth/forgotPassword",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || "Failed to send recovery email" };
    }

    return { success: "Recovery email sent successfully!" };
  } catch (err) {
    return { error: (err as Error).message };
  }
}

export async function getCategoriesServer(pageNumber: number): Promise<any> {
  // const session = await getServerSession(AUTH_OPTIONS);
  let token = cookies().get("session-token");
  // console.log('token token token token',token);
  if (!token) {
    throw new Error("Unauthorized: No session or token found");
  }

  try {
    const response = await fetch(
      `https://exam.elevateegy.com/api/v1/subjects?limit=3&page=${pageNumber}`,
      {
        method: "GET",
        headers: {
          token: token.value,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch categories");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}




export async function logoutServerAction(): Promise<{ success: boolean; message?: string }> {
  let token = cookies().get("session-token");
  // console.log('token token token token',token);
  if (!token) {

    throw new Error("Unauthorized: No session or token found");
  }

  try {
    const response = await fetch('https://exam.elevateegy.com/api/v1/auth/logout', {
      method: 'GET',
      headers: {
        token: token.value,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Logout failed.');
    }

    return { success: true };
  } catch (error: any) {
    console.error('Server action logout error:', error.message);
    return { success: false, message: error.message };
  }
}