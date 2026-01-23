import { NextResponse } from "next/server";
import db from "@/lib/db";

// GET Category
export async function GET(req, { params }) {
    const { id } = await params;
    try {
        const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
        return NextResponse.json(rows[0]);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}