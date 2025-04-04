// import { useSession } from "next-auth/react";
import SideNav from "./SideNav";
import Search from "../common/Search";
import { getServerSession } from "next-auth";

export default async function SessionWrapper({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  return (
    <main className="flex gap-5 p-8 bg-[#FBF9F9]">
      {session && <SideNav />}
      <div className="w-full">
        {session && <Search />}
        {children}
      </div>
    </main>
  );
}
