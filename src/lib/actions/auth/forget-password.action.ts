import { JSON_HEADER } from "../../constants/api.constanst";

export async function forgotPasswordAction(formData: FormData): Promise<{ success?: string; error?: string }> {
  const { email } = Object.fromEntries(formData.entries()) as ForgotPasswordFormData;

  try {
    const response = await fetch("https://exam.elevateegy.com/api/v1/auth/forgotPassword", {
      method: "POST",
      headers: { ...JSON_HEADER },
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
