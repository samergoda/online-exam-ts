import { cookies } from "next/headers";

export default function getToken() {
  const token = cookies()?.get("session_token")?.value;
  if (!token) {
    throw new Error("Token not found in cookies");
  }
  return token;
}
