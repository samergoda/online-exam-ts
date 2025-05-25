"use server";

import getAuthHeader from "../utils/getToken";

export async function getSubjects() {
  // console.log("pageNumber", pageNumber);
  // const session = await getServerSession(AUTH_OPTIONS);
  console.log(
    "getAuthHeader() getAuthHeader() getAuthHeader() getAuthHeader()  getAuthHeader() getAuthHeader() getAuthHeader()",
    await getAuthHeader()
  );
  try {
    const response = await fetch(`https://exam.elevateegy.com/api/v1/subjects?limit=6&page=1`, {
      method: "GET",
      headers: {
        ...(await getAuthHeader()),
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch categories");
    }
    const result = await response.json();
    // console.log("result", result);
    return result;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}
