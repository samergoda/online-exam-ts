import getAuthHeader from "../utils/getToken";

export default async function getAllExams() {
  const data = await fetch("https://exam.elevateegy.com/api/v1/exams", {
    method: "GET",
    headers: {
      ...(await getAuthHeader()),
    },
  });
  const res: ExamResponse = await data.json();
  return res;
}
