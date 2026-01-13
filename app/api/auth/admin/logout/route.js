import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({
        success: true,
        message: "Logged out successfully",
    });

    // ❌ admin JWT cookie remove
    response.cookies.set("admin_token", "", {
        httpOnly: true,
        expires: new Date(0), // past date = delete
        path: "/",
    });

    return response;
}
