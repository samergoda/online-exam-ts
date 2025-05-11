import { useQuery } from "@tanstack/react-query";

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

      console.log("response", data); // ✅ Now logs the actual JSON data

      return data;
    },
    enabled,
  });

  return { data, error, isLoading };
}
