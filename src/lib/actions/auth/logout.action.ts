"use server";
import { SESSION_TOKEN } from "@/lib/constants/api.constanst";
// import { SESSION_TOKEN } from "@/lib/constants/api.constanst";
import getAuthHeader from "@/lib/utils/getToken";
import { cookies } from "next/headers";
// import { cookies } from "next/headers";

export async function logoutServerAction() {
  try {
    const response = await fetch("https://exam.elevateegy.com/api/v1/auth/logout", {
      method: "GET",
      headers: {
        ...(await getAuthHeader()),
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Logout failed.");
    }
    cookies().delete(SESSION_TOKEN);
    return { success: true };
  } catch (error) {
    console.error("Server action logout error:", error);
    // return { success: false, message: error.message };
  }
}
