import { useQuery, useMutation } from "@tanstack/react-query";
import getQuestionsById from "../lib/api/questions.api";
import handleSubmitExam from "../lib/actions/exams/submit-exam";

export function useExams(id: string) {
  const getQuestions = useQuery({
    queryKey: ["questions", id],
    queryFn: async () => await getQuestionsById(id),
  });

  const submitQuestions = useMutation({
    mutationFn: async (data: object) => {
      const res = await handleSubmitExam(data);
      return res;
    },
  });
  return { getQuestions, submitQuestions };
}
