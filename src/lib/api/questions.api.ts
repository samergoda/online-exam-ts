"use server";
import "server-only";
import getAuthHeader from "../utils/getToken";

// Fetch questions when starting the exam
export default async function getQuestionsById(id: string) {
  try {
    const response = await fetch(`https://exam.elevateegy.com/api/v1/questions?exam=${id}`, {
      method: "GET",
      headers: { ...(await getAuthHeader()) },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch questions");
    }

    const { questions } = await response.json();
    return questions;
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
}
