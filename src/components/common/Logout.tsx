"use client";

import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

// Import the server-side logout handler
import { logoutServerAction } from "@/_lib/actions/action";

export default function Logout() {
  const { status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (status === "unauthenticated") {
    router.push("/auth/login");
    return null;
  }

  async function handleLogout(): Promise<void> {
    setIsLoading(true);
    setError(null);

    try {
      const result = await logoutServerAction(); // Call the server-side action

      if (!result.success) {
        throw new Error(result.message || "Logout failed.");
      }

      await signOut({ callbackUrl: "/auth/login" });
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      console.error("Logout error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <button onClick={handleLogout} disabled={isLoading}>
        {isLoading ? "Logging out..." : "Logout"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
