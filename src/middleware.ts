import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  let token = request.cookies.get("session-token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/signup", request.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/profile/:id*"],
};
