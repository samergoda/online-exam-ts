"use server";

import { SESSION_TOKEN } from "@/lib/constants/api.constanst";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Handle signup
export async function handleSignup(formData: FormData): Promise<void> {
  const { firstName, lastName, email, password, rePassword } = Object.fromEntries(formData.entries()) as SignupFormData;

  if (password !== rePassword) {
    throw new Error("Passwords do not match");
  }

  if (password.length < 6 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
    throw new Error("Password must be at least 6 characters, include an uppercase letter, and a number.");
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
    const response = await fetch("https://exam.elevateegy.com/api/v1/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

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
export async function handleResetPassword(formData: FormData): Promise<{ success?: string; error?: string }> {
  const { oldPassword, password, rePassword } = Object.fromEntries(formData.entries()) as ResetPasswordFormData;

  if (password.length < 6 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
    return {
      error: "Password must be at least 6 characters, include an uppercase letter, and a number.",
    };
  }

  if (password !== rePassword) {
    throw new Error("Passwords do not match");
  }

  try {
    const response = await fetch("https://exam.elevateegy.com/api/v1/auth/changePassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldPassword, password }),
    });

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
export async function verifyResetCodeAction(formData: FormData): Promise<{ success?: string; error?: string }> {
  const { resetCode } = Object.fromEntries(formData.entries()) as VerifyResetCodeFormData;

  try {
    const response = await fetch("https://exam.elevateegy.com/api/v1/auth/verifyResetCode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resetCode }),
    });

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
export async function forgotPasswordAction(formData: FormData): Promise<{ success?: string; error?: string }> {
  const { email } = Object.fromEntries(formData.entries()) as ForgotPasswordFormData;

  try {
    const response = await fetch("https://exam.elevateegy.com/api/v1/auth/forgotPassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || "Failed to send recovery email" };
    }

    return { success: "Recovery email sent successfully!" };
  } catch (err) {
    return { error: (err as Error).message };
  }
}

export async function getCategoriesServer(pageNumber: number): Promise<SubjectResponse> {
  // const session = await getServerSession(AUTH_OPTIONS);
  const token = cookies().get(SESSION_TOKEN)?.value;
  // console.log("token token token token", token);
  if (!token) {
    throw new Error("Unauthorized: No session or token found");
  }

  try {
    const response = await fetch(`https://exam.elevateegy.com/api/v1/subjects?limit=3&page=${pageNumber}`, {
      method: "GET",
      headers: {
        token,
      },
    });

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
  const token = cookies().get(SESSION_TOKEN)?.value;

  // console.log('token token token token',token);
  if (!token) {
    throw new Error("Unauthorized: No session or token found");
  }

  try {
    const response = await fetch("https://exam.elevateegy.com/api/v1/auth/logout", {
      method: "GET",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Logout failed.");
    }

    return { success: true };
  } catch (err: ErrorMessage) {
    console.error("Server action logout error:", error.message);
    // return { success: false, message: error.message };
  }
}
