import { NextResponse } from "next/server";
import db from "@/lib/db";
import jwt from "jsonwebtoken";

export async function POST(req) {
    try {
        const { email, otp } = await req.json();

        const [users] = await db.query(`SELECT id, otp, otp_expires_at FROM users WHERE email = ?`, [email]);

        if (users.length === 0) {
            return NextResponse.json({ error: "Invalid user" }, { status: 400 });
        }

        const user = users[0];

        if (user.otp !== otp) {
            return NextResponse.json({ error: "Invalid OTP" }, { status: 401 });
        }

        if (new Date(user.otp_expires_at) < new Date()) {
            return NextResponse.json({ error: "OTP expired" }, { status: 401 });
        }

        const token = jwt.sign(
            { userId: user.id, email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // clear otp
        await db.query("UPDATE users SET otp = NULL, otp_expires_at = NULL WHERE email = ?", [email]);

        return NextResponse.json({
            message: "Login successful",
            token,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
