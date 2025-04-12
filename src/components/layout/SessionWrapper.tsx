"use client";

import { useSession } from "next-auth/react";
import SideNav from "./SideNav";
import Search from "../common/Search";

export default function SessionWrapper({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  // const router = useRouter();

  // Optional: redirect if unauthenticated
  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/login");
  //   }
  // }, [status, router]);

  if (status === "loading") {
    return <div className="p-8">Loading...</div>; // or null, or a spinner
  }

  return (
    <main className="flex gap-5 p-8 bg-[#FBF9F9]">
      {session?.user && <SideNav />}
      <div className="w-full">
        {session?.user && <Search />}
        {children}
      </div>
    </main>
  );
}
