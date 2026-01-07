import { NextResponse } from "next/server";
import db from "@/lib/db";
import { sendOTPEmail } from "@/lib/mailer";

export async function POST(req) {
  try {
    const { email, phone } = await req.json();

    if (!email || !phone) {
      return NextResponse.json(
        { error: "Email and phone are required" },
        { status: 400 }
      );
    }

    const [users] = await db.query(
      "SELECT id FROM users WHERE email = ? AND phone = ?",
      [email, phone]
    );

    if (users.length === 0) {
      return NextResponse.json(
        { error: "Email and phone do not match" },
        { status: 404 }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 5 * 60 * 1000);

    await db.query(
      "UPDATE users SET otp = ?, otp_expires_at = ? WHERE email = ? AND phone = ?",
      [otp, expiry, email, phone]
    );

    await sendOTPEmail(email, otp);

    return NextResponse.json({
      message: "OTP sent to email",
      userId: users[0].id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
