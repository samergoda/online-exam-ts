import getToken from "../utils/getToken";

export default async function getAllExams() {
  const token = await getToken();
  const data = await fetch("https://exam.elevateegy.com/api/v1/exams", {
    method: "GET",
    headers: token ? { token: token } : undefined,
  });
  const res: ExamResponse = await data.json();
  return res;
}
