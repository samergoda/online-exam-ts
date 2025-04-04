"use client";

import { useSession } from "next-auth/react";
import SideNav from "./SideNav";
import { Search } from "lucide-react";

export default function SessionWrapper({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  return (
    <main className="flex gap-5 p-8 bg-[#FBF9F9]">
      {session?.user && <SideNav />}
      <div className="w-full">
        {session?.user && <Search />}
        <div className="">

        {children}
        </div>
      </div>
    </main>
  );
}
