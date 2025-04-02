import NextAuth from "next-auth";
import { OPTIONS } from "@/src/auth";

const handler = NextAuth(OPTIONS);
export { handler as GET, handler as POST };
