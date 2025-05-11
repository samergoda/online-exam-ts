import handleSubmitExam from "@/lib/actions/exams/submit-exam";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useQuestions(examId: string, enabled: boolean) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["questions", examId],
    queryFn: async () => {
      // Make a regular client-side fetch to your API route
      const response: APIResponse<QuestionsResponse> = await fetch("/api/questions?exam=" + examId);

      const data: APIResponse<QuestionsResponse> = await response.json();
      if ("error" in (await response)) {
        throw new Error("Failed to fetch cart");
      }

      return data;
    },
    enabled,
  });

  return { data, error, isLoading };
}

export function useSubmitExam() {
  const submitExam = useMutation({
    mutationFn: async (selectedAnswers: object) => handleSubmitExam(selectedAnswers),
  });
  return { submitExam };
}
