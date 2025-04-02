// import { registerAction } from "@/lib/actions/auth/register.action";
// import { RegisterFields } from "@/lib/types/auth";
import { handleSignup } from "@/src/_lib/actions/action";
import { useMutation } from "@tanstack/react-query";

export default function useRegister() {
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: FormData) => {
      const payload = await handleSignup(fields);

      // if ("error" in payload) throw new Error(payload.error || "Something went wrong");

      return payload;
    },
    onSuccess: () => {
      // toast.success(t("success toast"));
    },
    onError: (error) => {
      console.log(error);
      // toast.error(error.message);
    },
    retry: false,
  });

  return { isPending, error, register: mutate };
}
