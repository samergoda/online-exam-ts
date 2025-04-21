import { useQuery } from "@tanstack/react-query";

export function useQuestions() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["questions"],
    queryFn: async () => {
      // Make a regular client-side fetch to your API route
      const response = await fetch("/api/questions");
      if (!response.ok) {
        throw new Error("Failed to fetch cart");
      }
      return response.json();
    },
  });

  return { data, error, isLoading };
}
