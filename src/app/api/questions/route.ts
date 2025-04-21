import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ error: "Unauthorized route handler" }, { status: 401 });
  }

  try {
    const response = await fetch(process.env.API + `questions?exam=${req.nextUrl.searchParams.get("exam")}`, {
      headers: { Authorization: `Bearer ${token.token}` },
      cache: "no-store",
    });

    // Convert response to JSON before returning
    const data: APIResponse<ExamResponse> = await response.json();

    if ("error" in data) {
      throw new Error(data.error as string);
    }

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch cart data : " + error, { status: 500 });
  }
}
