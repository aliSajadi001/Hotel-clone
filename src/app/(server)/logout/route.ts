import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  let token = request.cookies.get("session-token")?.value;
  if (!token) {
    return NextResponse.json({
      success: false,
      message: "You are out",
    });
  }
  await (await cookies()).delete("session-token");
  console.log(token);
  return NextResponse.json({ success: true, message: "logout successfully" });
}
