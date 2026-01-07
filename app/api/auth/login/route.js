import { NextResponse } from "next/server";
import db from "@/lib/db";
import { sendOTPEmail } from "@/lib/mailer";

export async function POST(req) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: "Email required" }, { status: 400 });
        }

        const [users] = await db.query("SELECT id FROM users WHERE email = ?", [email]);

        if (users.length === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 min

        await db.query("UPDATE users SET otp = ?, otp_expires_at = ? WHERE email = ?", [otp, expiry, email]);

        await sendOTPEmail(email, otp);

        return NextResponse.json({ message: "OTP sent to email", });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
