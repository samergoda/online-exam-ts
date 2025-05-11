// ... existing code ...

import Input from "@/components/common/Input";
// import Button from "@/components/common/Button";
import { verifyResetCodeAction } from "@/lib/actions/auth/verify-code.action";
import { useFormStatus } from "react-dom";

function VerifyCodePage() {
  const { pending } = useFormStatus();

  const handleSubmit = async (formData: FormData) => {
    const result = await verifyResetCodeAction(formData);
    if (result.error) {
      throw new Error("error VerifyCodePage ");
    }
    // Handle the result here, e.g., show a toast or redirect
  };

  return (
    <div>
      <h2 className="font-bold text-[25px] mb-[31px]">Verify Code</h2>
      <form action={handleSubmit} className="flex flex-col gap-4">
        <Input type="text" name="resetCode" placeholder="Enter code" required />
        {/* {error && <p className="text-red-500">{error}</p>} */}
        <button type="submit" disabled={pending}>
          {pending ? "Verifying..." : "Verify Code"}
        </button>
      </form>
      <div className="text-end mt-4">
        <a href="/auth/forgetPassword" className="text-blue-500 hover:underline">
          Recover password
        </a>
      </div>
    </div>
  );
}

export default VerifyCodePage;
