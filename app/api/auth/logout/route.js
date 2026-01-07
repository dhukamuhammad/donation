import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function POST(req) {
  const user = verifyToken(req);

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // JWT stateless hai → server pe kuch delete nahi hota
  return NextResponse.json({
    message: "Logged out successfully",
  });
}
