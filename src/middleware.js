import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export default async function middleware(request) {
  const response = NextResponse.next();
  const sessionId = request.cookies.get("session_id")?.value;

  // If no session_id cookie, generate and set one
  if (!sessionId) {
    const newSessionId = uuidv4();
    response.cookies.set("session_id", newSessionId, {
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
