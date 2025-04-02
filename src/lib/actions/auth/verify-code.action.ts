import { JSON_HEADER } from "../../constants/api.constanst";

export async function verifyResetCodeAction(formData: FormData): Promise<{ success?: string; error?: string }> {
  const { resetCode } = Object.fromEntries(formData.entries()) as VerifyResetCodeFormData;

  try {
    const response = await fetch("https://exam.elevateegy.com/api/v1/auth/verifyResetCode", {
      method: "POST",
      headers: { ...JSON_HEADER },
      body: JSON.stringify({ resetCode }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || "Failed to verify the code" };
    }

    return { success: "Code verified successfully!" };
  } catch (err) {
    throw new Error((err as Error).message); // Rethrow the error;
  }
}
