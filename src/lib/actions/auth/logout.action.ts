"use server";
import { SESSION_TOKEN } from "@/lib/constants/api.constanst";
import { cookies } from "next/headers";

export async function logoutServerAction() {
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
  } catch (error) {
    console.error("Server action logout error:", error);
    // return { success: false, message: error.message };
  }
}
