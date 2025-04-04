"use server";
import { cookies } from "next/headers";
import { SESSION_TOKEN } from "../constants/api.constanst";

export async function getSubjects() {
  // console.log("pageNumber", pageNumber);
  // const session = await getServerSession(AUTH_OPTIONS);
  const token = cookies().get(SESSION_TOKEN)?.value;
  // console.log("token token token token", token);
  if (!token) {
    throw new Error("Unauthorized: No session or token found");
  }

  try {
    const response = await fetch(`https://exam.elevateegy.com/api/v1/subjects?limit=6&page=1`, {
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
    console.log("result", result);
    return result;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}
