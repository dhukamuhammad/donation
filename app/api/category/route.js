import { NextResponse } from "next/server";
import db from "@/lib/db";

// GET Category
export async function GET() {
    try {
        const [rows] = await db.query("SELECT * FROM donation_cat");
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function POST(req) {
    try {
        const body = await req.json();
        const { title } = body;

        if (!title) {
            return NextResponse.json({ error: "title is required" }, { status: 400 });
        }

        const [result] = await db.query("INSERT INTO donation_cat (title) VALUES (?)", [title]);
        console.log(result)

        return NextResponse.json({ id: result.insertId, title }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
