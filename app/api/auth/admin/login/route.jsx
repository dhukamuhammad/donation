import db from "@/lib/db";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { username, password } = await req.json();

        if (!username || !password) {
            return NextResponse.json(
                { success: false, message: "Missing credentials" },
                { status: 400 }
            );
        }

        const [rows] = await db.query(
            "SELECT * FROM admin_login WHERE username = ? LIMIT 1",
            [username]
        );

        if (rows.length === 0) {
            return NextResponse.json(
                { success: false, message: "Invalid credentials" },
                { status: 401 }
            );
        }

        const admin = rows[0];

        // plain password check (as per your DB)
        if (admin.password !== password) {
            return NextResponse.json(
                { success: false, message: "Invalid credentials" },
                { status: 401 }
            );
        }

        // JWT generate
        const token = jwt.sign(
            {
                adminId: admin.id,
                username: admin.username,
                role: "admin",
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        const response = NextResponse.json({
            success: true,
            message: "Login successful",
        });

        // httpOnly cookie
        response.cookies.set("admin_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24,
        });

        return response;
    } catch (err) {
        console.error("Admin login error:", err);
        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}
