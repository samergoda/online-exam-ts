import { useQuery } from "@tanstack/react-query";
import { getSubjects } from "../lib/api/subject.api";

export default function useSubject() {
  const {
    isLoading,
    data: payload,
    error,
  } = useQuery({
    queryKey: ["subject"],
    queryFn: async () => {
      const res = await getSubjects();
      return res;
    },
    retry: false,
  });

  return { isLoading, payload, error };
}
