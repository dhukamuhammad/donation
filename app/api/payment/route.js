import { NextResponse } from "next/server";
import db from "@/lib/db";

// GET Category
export async function GET() {
    try {
        const [rows] = await db.query("SELECT * FROM donation_info");
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}