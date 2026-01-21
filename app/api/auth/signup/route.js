import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone } = body;

    // Basic validation
    if (!email || !phone) {
      return NextResponse.json(
        { error: "Email and phone are required" },
        { status: 400 }
      );
    }

    // 🔍 Check if user already exists
    const [existingUser] = await db.query(
      "SELECT id FROM users WHERE email = ? OR phone = ?",
      [email, phone]
    );

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "User already created" },
        { status: 409 } // Conflict
      );
    }

    // ✅ Create new user
    const [result] = await db.query(
      "INSERT INTO users (name, email, phone, is_verified) VALUES (?, ?, ?, ?)",
      [name, email, phone, 0]
    );

    return NextResponse.json(
      {
        message: "User created successfully",
        user_id: result.insertId,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
