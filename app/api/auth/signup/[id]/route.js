import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req, { params }) {
    try {
        const { id } = await params;
        console.log(id)
        const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);

        return NextResponse.json(rows[0] || null);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
