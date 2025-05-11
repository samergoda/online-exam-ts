"use server";
import getToken from "../../utils/getToken";

// Submit answers
export default async function handleSubmitExam(answers: object) {
  // Prevent multiple submissions
  const token = getToken();

  try {
    const response = await fetch("https://exam.elevateegy.com/api/v1/questions/check", {
      method: "POST",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answers),
    });

    if (!response.ok) {
      throw new Error("Failed to submit answers");
    }

    const results = await response.json();
    return results;
  } catch (error) {
    console.error("Error submitting answers:", error);
  }
}
