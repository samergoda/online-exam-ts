import { JSON_HEADER } from "../../constants/api.constanst";

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
    const response = await fetch("https://exam.elevateegy.com/api/v1/auth/resetPassword", {
      method: "POST",
      headers: { ...JSON_HEADER },
      body: JSON.stringify({ oldPassword, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || "Something went wrong" };
    }

    return { success: "Password changed successfully!" };
  } catch (err) {
    throw new Error((err as Error).message); // Rethrow the error;
  }
}
