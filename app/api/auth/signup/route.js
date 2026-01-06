import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, email, phone } = body;

        // Basic validation
        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // Insert query
        const [result] = await db.query(`INSERT INTO users (name, email, phone, is_verified) VALUES (?, ?, ?, ?)`,
            [name, email, phone, 0]
        );

        return NextResponse.json({
            message: "User created successfully",
            user_id: result.insertId,
        }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
